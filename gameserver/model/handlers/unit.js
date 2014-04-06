var UnitHandler = {};
module.exports = UnitHandler;
	var http = require('http');
var url = require('url');

UnitHandler.StatSet = function (life, penetration, precision, evade, parry, defense, armor, strength, agility, intelligence, magicDamage, evilScience, magicSupport){
	this.life = life;
	this.maxLife = life;
	this.penetration = penetration;
	this.precision = precision;
	this.evade = evade;
	this.parry = parry;
	this.defense = defense;
	this.armor = armor;
	this.strength = strength;
	this.agility = agility;
	this.intelligence = intelligence;
	this.magicDamage = magicDamage;
	this.evilScience = evilScience;
	this.magicSupport = magicSupport;
}


UnitHandler.Weapon = function (name, type, damages, attribute, range, stats, ratio){
	this.name = name;
	this.type = type;
	this.damages = damages;
	this.attribute = attribute;
	this.range = range;
	this.stats = stats;
	this.ratio = ratio;
}

UnitHandler.Armor = function (name, type, stats){
	this.name = name;
	this.type = type;
	this.stats = stats;
}

UnitHandler.Unit = function(name, sign, sprite, size, weight, statut, stats, weapon, armor, skills,  values, tags){
	this.name = name;
	this.sign = sign;
	this.sprite = sprite;
	this.size = size;
	this.weight = weight;
	this.statut = statut;
	this.stats = stats;
	this.weapon = weapon;
	this.armor = armor;
	this.values = values;
	this.tags = tags;
	this.skills = skills;
}

//A value is either a Strength or a Weakness, can be bad or good(yin will tell you if it's positive or negative effect)
//Value is the key number, can be a ratio or flat number. stat will be the eventually modified stat.
 UnitHandler.Value = function(type, yin, value, stat){
 	this.type = type;
 	this.yin = yin;
 	this.value = value;
 	this.stat = stat;
 }

var unitList = new Array();
var team = new Array();

UnitHandler.connect = function(id, finalCall){
	function request(address, callback) {
	    http.get({ host: address, path: '/znieh/web/app.php/api/users/'+ id + '/team.json'}, function(response) {
	        var data = '';
	        if (response.statusCode === 302) {
	            var newLocation = url.parse(response.headers.location).host;
	            //console.log('We have to make new request ' + newLocation);
	            request(newLocation);
	        }
	        else if(response.statusCode === 404 || response.statusCode === 500) {
	        	console.log("Response: %d for id -> %d Error !! Not Found", response.statusCode, id);
	        }
	        else {
	            //console.log("Response: %d", response.statusCode);
	            response.on('data', function(chunk) {
	            	data += chunk;
	            });
	            response.on('end', function() {
	            	//console.log(JSON.stringify(data));
	 	          	//team = UnitHandler.loadUnit(JSON.parse(data));
	 	          	console.log(JSON.stringify(data));
	 	          	callback(JSON.parse(data), finalCall);
	            });
	        }
	    }).on('error', function(err) {
	        console.log('Error %s', err.message);
	        request('localhost');
    	});
	}

	request('localhost', UnitHandler.loadUnit);
}

UnitHandler.loadUnit = function(data, callback){
	unitList = new Array();

	var unitName;
	var sign;
	var size;
	var weight;
	var statut;

	var weaponName;
	var armorName;
	var weaponType;
	var weaponDamages;
	var weaponRange;

//stats
	var cLife;
	var cPenetration;
	var cPrecision;
	var cEvade;
	var cParry;
	var cDefense;
	var cArmor;
	var cStrength;
	var cAgility;
	var cIntelligence;
	var cMagicDamage;
	var cEvilScience;
	var cMagicSupport;

	var wLife;
	var wPenetration;
	var wPrecision;
	var wEvade;
	var wParry;
	var wDefense;
	var wArmor;
	var wStrength;
	var wAgility;
	var wIntelligence;
	var wMagicDamage;
	var wEvilScience;
	var wMagicSupport;

	var aLife;
	var aPenetration;
	var aPrecision;
	var aEvade;
	var aParry;
	var aDefense;
	var aArmor;
	var aStrength;
	var aAgility;
	var aIntelligence;
	var aMagicDamage;
	var aEvilScience;
	var aMagicSupport;

	//add runes
	for(var unit in data.team[0].units){
		unitName = data.team[0].units[unit].name;
		sign = data.team[0].units[unit].sign.name;
		size = data.team[0].units[unit].size.name;
		weight = data.team[0].units[unit].weight.name;
		weaponType = data.team[0].units[unit].weapon.type.name;
		//weaponName = data.team[0].units[unit].weapon.name.name;
		for( var i in data.team[0].units[unit].weapon.parts){
			if( data.team[0].units[unit].weapon.parts[i].effects.damage != undefined)
			weaponDamages = data.team[0].units[unit].weapon.parts[i].effects.damage;
		}
		weaponAttribute = '';//data.team[0].units[unit].weapon.attribute.name;
		weaponRange = '';//data.team[0].units[unit].weapon.range.number
		weaponRatio = 0.1;

		armorType = data.team[0].units[unit].armor.type.name;
		//armorName = data.team[0].units[unit].armor.name.name;

		unitList.push(new UnitHandler.Unit(unitName, sign,"",size, weight, -1,new UnitHandler.StatSet(cLife,cPenetration,cPrecision,cEvade,cParry,cDefense,cArmor,cStrength,cAgility,cIntelligence,cMagicDamage,cEvilScience,cMagicSupport),
			new UnitHandler.Weapon(weaponType, weaponType, weaponDamages, weaponAttribute, weaponRange, new UnitHandler.StatSet(wLife,wPenetration,wPrecision,wEvade,wParry,wDefense,wArmor,wStrength,wAgility,wIntelligence,wMagicDamage,wEvilScience,wMagicSupport), weaponRatio),
			new UnitHandler.Armor(armorName, armorType, new UnitHandler.StatSet(aLife,aPenetration,aPrecision,aEvade,aParry,aDefense,aArmor,aStrength,aAgility,aIntelligence,aMagicDamage,aEvilScience,aMagicSupport))))
	}
	callback(unitList);
}
