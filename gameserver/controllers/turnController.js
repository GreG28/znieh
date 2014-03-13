var turnController = {};
module.exports = turnController;

turnController.counter = 0;
turnController.hasAttack = {};
turnController.hasMove = {};

turnController.newTurn = function (units){
	this.counter++;

	this.hasAttack = {};
	this.hasMove = {};

	for(var i in units){
		this.hasAttack[units[i]] = false;
		this.hasMove[units[i]] = false;
	}
}

turnController.hasAttacked = function(unit){
	return this.hasAttack[unit];
}

turnController.hasMoved = function(unit){
	return this.hasMoved[unit];
}

turnController.setHasAttacked = function(unit){
	this.hasAttack[unit] = true;
}

turnController.setHasMoved = function(unit){
	this.hasMove[unit] = true;
}