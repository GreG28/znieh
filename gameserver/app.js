/**
 * server.js
 * 
 * Main file for Znieh gameserver.
 *
 * @author alfo
 * @version 0.1.2
 */

"use strict";

var serverLoadStart = new Date();

var os = require('os');
var util = require('util');

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
var pools = require('./model/pools');
var map = require('./model/map');
var battle = require('./model/battle');
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
pools.init();
map.init();
battle.init();
skillHandler.loadSpells();
skillHandler.loadSkills();

/*
 * Main controller initialization
 */
var mainController = require('./controllers/mainController');
mainController.init();

/*
 * Server is loaded
 */
console.log('Server loaded in: ' + Math.abs(new Date() - serverLoadStart) + 'ms');
console.log('Used memory: ' + (process.memoryUsage().rss/1048576).toFixed(2) + "M");
