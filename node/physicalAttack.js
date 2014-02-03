var dodged = false;
var parried = false;
var criticalHit = 0;
var baseDamage = 0;
var finalDamage = 0;
var nonParriedDamage = 0.85;

//Unit stat:
var precisionScore = 50;
var dodgeScore = 30;
var parryScore = 50;
var enemyDefenseScore = 36;

console.log(physicalHit());
//get weapon final damage with ratio
function getDamages() {
	return 50;
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
function physicalHit(){
	dodged = isDodged();
	if(!dodged){
		parried =isParried();
		criticalHit = isCriticalHit();
		setParriedDamages();
		finalDamage = (getDamages() +  criticalHit * getDamages()) * getStrengthWeakness() * getArmorReduction() * nonParriedDamage + getMagicDamage();
	}
	return finalDamage;
}