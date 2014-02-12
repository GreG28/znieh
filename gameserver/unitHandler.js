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

UnitHandler.Weapon = function (name, type, damages, attribute, range, stats){
	this.name = name;
	this.type = type;
	this.damages = damages;
	this.attribute = attribute;
	this.range = range;
	this.stats = stats;
}

UnitHandler.Armor = function (name, type, damages, range, stats){
	this.name = name;
	this.type = type;
	this.range = range;
	this.stats = stats;
}

UnitHandler.Unit = function(name, sign, stats, weapon, armor){
	this.name = name;
	this.sign = sign;
	this.stats = stats;
	this.weapon = weapon;
	this.armor = armor;
}