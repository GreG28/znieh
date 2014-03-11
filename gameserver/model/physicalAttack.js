var physicalAttack = {};
module.exports = physicalAttack;

physicalAttack.utility = function(){
	var dodged = false;
	var parried = false;
	var criticalHit = 0;
	var baseDamage = 0;
	var finalDamage = 0;
	var nonParriedDamage = 0.75;


	var precisionScore;
	var dodgeScore;
	var parryScore;
	var enemyDefenseScore;

	var attackingUnit;
	var attackedUnit;
}

//for testing purpose
//console.log(physicalHit());


//get weapon final damage with ratio
physicalAttack.getDamages = function() {
	switch(physicalAttack.utility.attackingUnit.weapon.attribute)
	{
	case "Agility":
	  return physicalAttack.utility.attackingUnit.weapon.damages + physicalAttack.utility.attackingUnit.stats.agility * physicalAttack.utility.attackingUnit.weapon.ratio;
	  break;
	case "Strength":
	  return physicalAttack.utility.attackingUnit.weapon.damages + physicalAttack.utility.attackingUnit.stats.strength * physicalAttack.utility.attackingUnit.weapon.ratio;
	  break;
	case "Intelligence":
	  return physicalAttack.utility.attackingUnit.weapon.damages + physicalAttack.utility.attackingUnit.stats.intelligence * physicalAttack.utility.attackingUnit.weapon.ratio;
	  break;
	}
}

//get superiority bonusses like buff or specific weapon, skill or spell
physicalAttack.getStrengthWeakness = function() {
	return 1;
}

//check if the hit is critical
physicalAttack.isCriticalHit = function() {
	if((Math.floor((Math.random()*100)+1)) <= physicalAttack.utility.precisionScore * 0.4) 
		return 1;
	else
		return 0;
}

//check if the hit is dodged
physicalAttack.isDodged = function() {
	if((Math.floor((Math.random()*100)+1)) <= physicalAttack.utility.dodgeScore * 0.15)
		return true;
	else
		return false;
}

//check if the hit is parried
physicalAttack.isParried = function() {
	if((Math.floor((Math.random()*100)+1)) <= physicalAttack.utility.parryScore * 0.5)
		return true;
	else
		return false;
}

//check if there will be any bonus magic damage give
physicalAttack.getMagicDamage = function() {
	return 0;
}

//get the armor reduction combined with penetration
physicalAttack.getArmorReduction = function() {
	if(physicalAttack.utility.enemyDefenseScore < 40)
		return  ((physicalAttack.utility.enemyDefenseScore * 0.66) / 100).toFixed(2);
	else
		return (150 / (physicalAttack.utility.enemyDefenseScore + 130)).toFixed(2);
}

//setParriedDamage
physicalAttack.setParriedDamages = function() {
	if(physicalAttack.utility.parried)
		physicalAttack.utility.nonParriedDamage = 0.75;
	else
		physicalAttack.utility.nonParriedDamage = 1;
}
//main function
physicalAttack.physicalHit = function(attackUnit, defenseUnit){
	physicalAttack.utility.attackingUnit = attackUnit;
	physicalAttack.utility.attackedUnit = defenseUnit;
	physicalAttack.utility.precisionScore = physicalAttack.utility.attackingUnit.stats.precision;
	physicalAttack.utility.dodgeScore = physicalAttack.utility.attackedUnit.stats.evade;
	physicalAttack.utility.parryScore = physicalAttack.utility.attackedUnit.stats.parry;
	physicalAttack.utility.enemyDefenseScore = physicalAttack.utility.attackedUnit.stats.defense;

	physicalAttack.utility.dodged = physicalAttack.isDodged();
	if(!physicalAttack.utility.dodged){
		physicalAttack.utility.parried = physicalAttack.isParried();
		physicalAttack.utility.criticalHit = physicalAttack.isCriticalHit();
		physicalAttack.setParriedDamages();

		physicalAttack.utility.finalDamage = (physicalAttack.getDamages() +  physicalAttack.utility.criticalHit * physicalAttack.getDamages()) * physicalAttack.getStrengthWeakness() * physicalAttack.getArmorReduction() * physicalAttack.utility.nonParriedDamage + physicalAttack.getMagicDamage();
	}
	else{
		return 0;
	}
	defenseUnit.stats.life = defenseUnit.stats.life - physicalAttack.utility.finalDamage.toFixed(0);

	return physicalAttack.utility.finalDamage.toFixed(0);
}