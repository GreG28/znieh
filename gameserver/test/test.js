console.log("Beginning of test phase");-
console.log("Spells and skills loading");
var skHandler = require('../skillHandler.js');
var spells = skHandler.loadSpells();
var skills = skHandler.loadSkills();
console.log("_________________________________________");
console.log("Spells :");
for(i in spells){
	console.log(spells[i].name);
}
console.log("_________________________________________");
console.log("Skills :");
for(i in skills){
	console.log(skills[i].name);
}
console.log("\n");

console.log("Team loading from a JSON");
var teamHandler = require('../unitHandler');
var team = new Array();
team = teamHandler.loadUnit();
console.log(team);
console.log("\n");

console.log("Physical hit between two units");
team[0].stats.agility = 50;
team[0].stats.defense = 20;
team[1].stats.strength = 50;
team[1].stats.defense = 50;
console.log("Unit 1 :");
console.log(team[0]);
console.log("Unit 2 : ");
console.log(team[1]);
console.log("_________________________________________");
var hit = require('../physicalAttack.js');
var result = hit.physicalHit(team[0],team[1]);
console.log("\nDamages taken : " + result);