/**
 * map.js
 *
 * Maps instances
 *
 * @author alfo
 */

var config = require('../util/config');
var logger = require('../util/logger');

var availableMaps = [];

module.exports.init = function() {
	var map = [];
	var jsonMap = require('../map.json');
	var jsonMapData = jsonMap['layers'][0]['data'];
	var tilesets = jsonMap['tilesets'][0]['tileproperties'];
	var blockingTiles = [];

	for(item in tilesets) {
		if(tilesets[item]['block']) blockingTiles.push(item);
	}

	map['width'] = jsonMap['width'];
	map['height'] = jsonMap['height'];
	map['name']	= 'Carte 1';
	map['layers'] = [];

	map['layers']['blocking'] = [];
	for(item in jsonMapData) {
		var containsItem = false;
		for(var i = 0; i <= blockingTiles.length; i++) 
			if(blockingTiles[i] == jsonMapData[item]) containsItem = true;

		if(containsItem) map['layers']['blocking'].push(true);
		else map['layers']['blocking'].push(false);
	}

	availableMaps.push(map);


	module.exports.maps = availableMaps;

	logger.info('Maps loaded.');
}


module.exports.getRandomMap = function() {
	return clone(availableMaps[0]);
}