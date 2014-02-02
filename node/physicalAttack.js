var isDodged = false;
var isParried = false;
var isCriticalHit = 0;
var baseDamage = 0;
var finalDamage = 0;
var nonParriedDamage = 0.85;
//get weapon final damage with ratio
function getDamages() {

}

//get superiority bonusses like buff or specific weapon, skill or spell
function getStrengthWeakness() {

}

//check if the hit is critical
function isCriticalHit() {

}

//check if the hit is dodged
function isDodged() {

}

//check if the hit is parried
function isParried() {

}

//check if there will be any bonus magic damage give
function getMagicDamage() {

}

//main function
function physicalHit(){
	isDodged();
	if(!isDodged){
		isParried();
		isCriticalHit();
		finalDamage = (getDamages() +  isCriticalHit * getDamages()) * getStrengthWeakness() * nonParriedDamage + getMagicDamage();
	}
}