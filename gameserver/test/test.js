var expect = require('chai').expect;
var teamHandler = require('../model/handlers/unit');
var team = new Array();
team = teamHandler.loadUnit();


team[0].stats.agility = 50;
team[0].stats.defense = 20;
team[1].stats.strength = 50;
team[1].stats.defense = 50;

var hit = require('../model/physicalAttack.js');
var result = hit.physicalHit(team[0],team[1]);

describe("physicalAttack", function() {
   describe(".getDamages()", function() {
       it("should return a number", function(){
           expect(hit.getDamages()).to.be.a.number;
       });
       it("should improve base damages", function(){
       		expect(hit.utility.attackingUnit.weapon.damages < hit.getDamages()).to.be.true;
       });
   });
});

describe("physicalAttack", function() {
   describe(".getStrengthWeakness()", function() {
       it("should return a number", function(){
           expect(hit.getStrengthWeakness()).to.be.a.number;
       });
       it("should not return 0", function(){
           expect(hit.getStrengthWeakness()).to.not.equal(0);
       });
   });
});

describe("physicalAttack", function() {
   describe(".getArmorReduction()", function() {
       it("should return a number", function(){
           expect(hit.getArmorReduction()).to.be.a.number;
       });
       it("should not return 0", function(){
           expect(hit.getStrengthWeakness()).to.not.equal(0);
       });
   });
});

describe("physicalAttack", function() {
   describe(".physicalHit()", function() {
       it("should return a number", function(){
           expect(hit.physicalHit(team[0],team[1])).to.be.a.number;
       });
       it("should return 0 only in case of dodge", function(){
       		if(hit.physicalHit(team[0],team[1]) == 0)
       			expect(hit.utility.dodged).to.be.true;
       });
   });
});
