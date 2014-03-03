/**
 * server.js
 * 
 * Main file for Znieh game.
 *
 * @author alfo
 * @version 0.1.2
 */

"use strict";

var serverLoadStart = new Date();

var os = require('os');
var util = require('util');
//var process = require('process');


console.log('Server is starting...');
console.log('Load start is at: ' + serverLoadStart.toString())
console.log('Available memory: ' + Math.round(os.freemem()/1048576) + 'M, total memory: ' + Math.round(os.totalmem()/1048576) + 'M');
console.log('Used memory: ' + (process.memoryUsage().rss/1048576).toFixed(2) + "M");

/*
 * Loading dependencies
 */
var logger = require('./util/logger');
var config = require('./util/config');
var db = require('./util/db');
var httpserver = require('./network/httpserver');
var socketio = require('./network/socketio');
var world = require('./model/world');
var skillHandler = require('./model/handlers/skills');

/*
 * Instances loading
 */
logger.init();
config.init();
db.init();
db.initTables();
db.testConnection();
httpserver.init();
socketio.init();
world.init();
skillHandler.loadSpells();
skillHandler.loadSkills();


var mainController = require('./controllers/mainController');
mainController.init();

console.log('Server loaded in: ' + Math.abs(new Date() - serverLoadStart) + 'ms');
console.log('Used memory: ' + (process.memoryUsage().rss/1048576).toFixed(2) + "M");




var battle = require('./battle');

