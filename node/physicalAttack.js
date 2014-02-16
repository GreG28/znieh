var dodged = false;
var parried = false;
var criticalHit = 0;
var baseDamage = 0;
var finalDamage = 0;
var nonParriedDamage = 0.85;

//Unit stat:

var precisionScore;
var dodgeScore;
var parryScore;
var enemyDefenseScore;

var attackingUnit;
var attackedUnit;


//for testing purpose
//console.log(physicalHit());


//get weapon final damage with ratio
function getDamages() {
	switch(attackingUnit.weapon.attribute)
	{
	case "agility":
	  return attackingUnit.weapon.damages + attackingUnit.stats.agility * attackingUnit.weapon.ratio;
	  break;
	case "strength":
	  return attackingUnit.weapon.damages + attackingUnit.stats.strength * attackingUnit.weapon.ratio;
	  break;
	case "intelligence":
	  return attackingUnit.weapon.damages + attackingUnit.stats.intelligence * attackingUnit.weapon.ratio;
	  break;
	}
}

//get superiority bonusses like buff or specific weapon, skill or spell
function getStrengthWeakness() {
	return 1;
}

//check if the hit is critical
function isCriticalHit() {
	if((Math.floor((Math.random()*100)+1)) <= precisionScore * 0.4) 
		return 1;
	else
		return 0;
}

//check if the hit is dodged
function isDodged() {
	if((Math.floor((Math.random()*100)+1)) <= dodgeScore * 0.15)
		return true;
	else
		return false;
}

//check if the hit is parried
function isParried() {
	if((Math.floor((Math.random()*100)+1)) <= parryScore * 0.5)
		return true;
	else
		return false;
}

//check if there will be any bonus magic damage give
function getMagicDamage() {
	return 0;
}

//get the armor reduction combined with penetration
function getArmorReduction() {
	if(enemyDefenseScore < 40)
		return (1 - (enemyDefenseScore * 0.66) / 100).toFixed(2);
	else
		return (1 - (150 / (enemyDefenseScore + 130))).toFixed(2);
}

//setParriedDamage
function setParriedDamages() {
	if(parried)
		nonParriedDamage = 0.75;
	else
		nonParriedDamage = 1;
}
//main function
function physicalHit(attackUnit, defenseUnit){
	attackingUnit = attackunit;
	attackedUnit = defenseUnit;
	precisionScore = 50;
	dodgeScore = 30;
	parryScore = 50;
	enemyDefenseScore = 36;

	dodged = isDodged();
	if(!dodged){
		parried =isParried();
		criticalHit = isCriticalHit();
		setParriedDamages();
		finalDamage = (getDamages() +  criticalHit * getDamages()) * getStrengthWeakness() * getArmorReduction() * nonParriedDamage + getMagicDamage();
	}
	return finalDamage;
}