var UnitHandler = {};
module.exports = UnitHandler;

UnitHandler.StatSet = function (life, penetration, precision, evade, parry, defense, armor, strength, agility, intelligence, magicDamage, evilScience, magicSupport){
	this.life = life;
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

UnitHandler.Unit = function(name, sign, stats, weapon, armor, skills,  values, tags){
	this.name = name;
	this.sign = sign;
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

UnitHandler.loadUnit = function(){
	var data = require('./json/unitex.json');
	var unitName;
	var sign;
	//add stats here
	var weaponName;
	var armorName;
	var weaponType;
	var damages;
	var range;
	//add runes
	for(var unit in data[0].units){
		unitName = data[0].units[unit].name;
		sign = data[0].units[unit].sign.name;

		weaponType = data[0].units[unit].weapon.type.name;
		weaponName = data[0].units[unit].weapon.name.name;
		weaponDamages = data[0].units[unit].weapon.damages.number;
		weaponAttribute = data[0].units[unit].weapon.attribute.name;
		weaponRange = data[0].units[unit].weapon.range.number;
		weaponRatio = data[0].units[unit].weapon.ratio.number;

		armorType = data[0].units[unit].armor.type.name;
		armorName = data[0].units[unit].armor.name.name;

		unitList.push(new UnitHandler.Unit(unitName, sign, new UnitHandler.StatSet(50,30,30,30,30,30,30,30,30,30,30,30,30), new UnitHandler.Weapon(weaponName, weaponType, weaponDamages, weaponAttribute, weaponRange, "", weaponRatio), new UnitHandler.Armor(armorName, armorType, "")))
	}

	return unitList;
}
