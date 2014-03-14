var turnController = {};


turnController = function (){
	this.counter = 0;
	this.hasAttack = {};
	this.hasMove = {};


	this.newTurn = function (units){
		this.counter++;

		this.hasAttack = {};
		this.hasMove = {};

		for(var i in units){
			this.hasAttack[units[i]] = false;
			this.hasMove[units[i]] = false;
		}
	};


	this.hasAttacked = function(unit){
		return this.hasAttack[unit];
	};

	this.hasMoved = function(unit){
		return this.hasMoved[unit];
	};

	this.setHasAttacked = function(unit){
		this.hasAttack[unit] = true;
	};

	this.setHasMoved = function(unit){
		this.hasMove[unit] = true;
	};

};
module.exports = turnController;
