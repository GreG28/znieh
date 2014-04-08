/**
 * fightController.js
 *
 * Fight controller of the gameserver: pool list, join, ...
 *
 * @author alfo
 */

var socketio = require('../network/socketio');
var logger = require('../util/logger');
var map = require('../model/map');
var world = require('../model/world');
var hit = require('../model/physicalAttack');
var unit = require('../model/handlers/unit.js');
var turnCont = require('./turnController');
var coord = require('../model/coord');
var turnController = new turnCont();
var unitCount = new Array();
var teams = new Array();
var coordTeam1 = new Array();
var coordTeam2 = new Array();
var team1 = new Array();
var team2 = new Array();
var first = false;
var second = false;
var tab = new Array();


module.exports = function(player) {
	"use strict";
	player.socket.on("next-turn", function(data) {
		if(player.status != "fighting") return -1;

		if(player.battle === undefined) return -2;

		if(player.battle.player1.name == player.name ^ player.battle.turn == 1) {
			player.socket.emit('service', { msg: 'Next turn!'});

			// Turn = !(Turn-1)+1
			player.battle.turn = (!(player.battle.turn - 1) + 1);
		} else {
			player.socket.emit('service', { msg: 'You are not allowed to change turn!'});
		}
	});

	player.socket.on('select-map', function(data, callback) {
		if(player.battle === undefined) {
			callback(false);
			player.socket.emit('service', { msg: 'No battle found.'});
			return -1;
		}

		if(player.battle.map !== undefined) {
			player.battle.map = map.getRandomMap();
		}
		callback('map_new.json');
		player.socket.emit('service', { msg: 'Map selected: map_new.json'});

	});

	player.socket.on('get-units', function(data, callback) {
		//unit.connect();
		console.log("GET UNIT");
		console.log(first + " LOOOOOOOOL " + second);
		if(first){
			if(second){
				console.log("return teams for first and second !");
				callback(teams);
			}
		}
		else{
			unit.connect(player.battle.player1.id, function(team){
				teams[0] = team;
				first = true;
				if(second){
					for(var i in teams[0]){
						unitCount[parseInt(i)] = parseInt(i);
					}
					for(i in teams[1]){
						unitCount[parseInt(10) + parseInt(i)] = parseInt(10) + parseInt(i);
					}
					console.log("return teams for first !");
					callback(teams);
				}
			});
		}
		if(second){
			if(first){
				console.log("return teams for second and first !");
				callback(teams);
			}
		}
		else{
			unit.connect(player.battle.player2.id, function(team){
				teams[1] = team;
				second = true;
				if(first){
					for(var i in teams[0]){
						unitCount[parseInt(i)] = parseInt(i);
					}
					for(i in teams[1]){
						unitCount[parseInt(10) + parseInt(i)] = parseInt(10) + parseInt(i);
					}
					console.log("return teams for second !");
					callback(teams);
				}
			});
		}

		turnController.newTurn(unitCount);
		//callback(teams);
	});

	player.socket.on('get-side', function(data, callback) {
		if(player.battle === undefined) {
			callback(false);
			player.socket.emit('service', { msg: 'No battle found.'});
			return -1;
		}

		if(player.name === player.battle.player1.name)
			callback(player.battle.player1side);
		else callback(player.battle.player2side);

	});

	player.socket.on("place-unit", function(data, callback) {

		/*if(player.battle.mapSelected === false) {
			callback(false);
			player.socket.emit('service', { msg: 'Map is not selected.'});
			return -1;
		}*/

		/*if(player.status != "placement-started") {
			callback(false);
			player.socket.emit('service', { msg: 'Placement has not started yet.'});
			return -2;
		}

		if(player.battle == undefined) {
			callback(false);
			player.socket.emit('service', { msg: 'No battle found'});
			return -3;
		}

		if(player.battle.finishedUnitPlacement) {
			callback(false);
			player.socket.emit('service', { msg: 'Unit placement is over.'});
			return -4;
		}*/

		if(player.battle.player1.name == player.name) {
			coordTeam1[data.unit] = new coord(data.x, data.y);
		}
		else {
			coordTeam2[data.unit] = new coord(data.x, data.y);
		}

		callback(true);


	});


	// TODO
	player.socket.on("unit-move", function(data, callback) {
		//console.log("data unit move -> " + data.x +"  "+ data.y + "   " + data.unit );
		if(turnController.hasMoved(data.unit))
			callback(false);
		else{

			if(player.battle.player1.name == player.name) {
				coordTeam1[data.unit] = new coord(data.x, data.y);
				player.battle.player2.socket.emit("ennemy-move", coordTeam1);
				turnController.setHasMoved(data.unit);
			}
			else {
				coordTeam2[data.unit] = new coord(data.x, data.y);
				player.battle.player1.socket.emit("ennemy-move", coordTeam2);
				turnController.setHasMoved(parseInt(data.unit)+10);
			}
			callback(true);
		}
	});

	// TODO
	player.socket.on("placement-finished", function(data, callback) {
		player.status = "placement-finished";
		// TODO CHANGE FOR VERIFICATION
		if(player.battle.player1.status === "placement-finished" && player.battle.player2.status === "placement-finished"){
			player.battle.player1.socket.emit("ennemy-placement", coordTeam2);
			player.battle.player2.socket.emit("ennemy-placement", coordTeam1);
		}
	});

	player.socket.on("attack", function(data, callback){
		//check if unit setHasPlayed
		var damages;
		if(player.battle.player1.name == player.name) {
			if(turnController.hasAttacked(data.att)){
				callback(false);
			}
			else{
				damages = teams[1][data.def].stats.life;
				console.log("Before attack: " + damages);
				hit.physicalHit(teams[0][data.att], teams[1][data.def]);
				tab[0] = teams[0][data.att];
				tab[1] = teams[1][data.def];
				damages = damages - teams[1][data.def].stats.life;
				console.log("After attack: " + teams[1][data.def].stats.life);
			}
		}
		else{
			if(turnController.hasAttacked(parseInt(data.att + 10))){
				callback(false);
			}
			else{
				damages = teams[0][data.def].stats.life;
				console.log("Before attack: " + damages);
				hit.physicalHit(teams[1][data.att], teams[0][data.def]);
				tab[0] = teams[1][data.att];
				tab[1] = teams[0][data.def];
				damages = damages - teams[0][data.def].stats.life;
				console.log("After attack: " + teams[0][data.def].stats.life);

			}
		}
			tab.damages = damages;
			if(tab[1].stats.life <= 0){
				delete tab[1];
			}

			callback(tab);
		
	});


	player.socket.on("accept-player", function(data) {


		if(player.battle.player1.name == player.name) {
			player.battle.player1accepted = data;
		}
		else {
			player.battle.player2accepted = data;
		}

		// If both player have answered
		if(player.battle.player1accepted !== undefined && player.battle.player2accepted !== undefined) {
			// If at least one player have denied the battle
			if(player.battle.player1accepted === false || player.battle.player2accepted === false) {
				player.battle.player1.status = 'ready';
				player.battle.player2.status = 'ready';

				player.battle.player1.socket.emit("search-restarted", null);
				player.battle.player2.socket.emit("search-restarted", null);

				return;

			} else {
				player.battle.player1.status = 'placing-units';
				player.battle.player2.status = 'placing-units';

				//TODO
				player.battle.status = 'placement-started';

				player.battle.player1.socket.emit("placement-started", null);
				player.battle.player2.socket.emit("placement-started", null);

				return;
			}
		}
	});
};
