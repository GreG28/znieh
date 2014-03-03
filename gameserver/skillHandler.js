var SkillHandler = {};
module.exports = SkillHandler;

SkillHandler.Skill = function(name, damages, ratio, attribute, time, cooldown, description) {
	this.name = name;
	this.damages = damages;
	this.ratio = ratio;
	this.attribute = attribute;
	this.time = time;
	this.cooldown = cooldown;
	this.description = description;
}

SkillHandler.Spell = function(name, damages, ratio, attribute, time, cooldown, description) {
	this.name = name;
	this.damages = damages;
	this.ratio = ratio;
	this.attribute = attribute;
	this.time = time;
	this.cooldown = cooldown;
	this.description = description;
}

var spellList = new Array();
var skillList = new Array();

SkillHandler.loadSpells = function(){
	var data = require('./json/spells.json');
	for(var spell in data){
	    spellList.push(new SkillHandler.Spell (data[spell].name, data[spell].damages, data[spell].ratio, data[spell].attribute, data[spell].time, data[spell].cooldown, data[spell].description))
	}
	console.log("Spells loaded.")
	return spellList;
}

SkillHandler.loadSkills = function (){
	var data = require('./json/skills.json');
	for(var skill in data){
	    skillList.push(new SkillHandler.Spell (data[skill].name, data[skill].damages, data[skill].ratio, data[skill].attribute, data[skill].time, data[skill].cooldown, data[skill].description))
	}
	console.log("Skills loaded.")
	return skillList;
}
