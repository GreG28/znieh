"use strict";

$("#journal").scrollTop($("#journal")[0].scrollHeight);

var route_map = "../json/";
var continueProcess = 0;
var mySide;
var ennemySide;
var contentManager;
var socket;

function waitForElement(){
    if(typeof window.socket != "undefined"){
        socket = window.socket;
        selectMap();
        getSide();
        getUnits();
    }
    else{
        setTimeout(function(){
            waitForElement();
        },250);
    }
}
waitForElement();

function selectMap() {
  socket.emit('select-map', null, function(data) {
    route_map += data;
    console.log('select-map');

    continueProcess++;
    if(continueProcess == 3)
    {
      init();
    }
  });
}

function getSide() {
  socket.emit('get-side', null, function(data) {
    console.log("side ? -> " + data);
    if(data == "left")
      ContentManager.left = true;
    else
      ContentManager.left = false;

    continueProcess++;

    console.log('get-side');
    if(continueProcess == 3)
    {
      init();
    }
  });
}

function getUnits() {
  socket.emit('get-units', null, function(data) {
    var taille;
    units = data;
    console.log('get-units ');

    units = data[0];

    for(var i = 0 ; i < units.length ; i++)
    {
      units[i].life = 100; // TODO : DELETE THIS LINE
      taille = "petitfin";
      if(units[i].size == "Normal" && units[i].weight == "Musclé")
      {
        units[i].taille = "petitfin";
      }
    }

    ennemyUnits = data[1];

    for(i = 0 ; i < ennemyUnits.length ; i++)
    {
      taille = "petitfin";
      if(ennemyUnits[i].size == "Normal" && ennemyUnits[i].weight == "Musclé")
      {
          ennemyUnits[i].taille = "petitfin";
      }
    }

    units[0].statut = 0;

    continueProcess++;
    if(continueProcess == 3)
    {
      init();
    }

  });
}

var canvas = document.getElementById("canvas");
var stage = new createjs.Stage(canvas);
var ennemyUnits = null;
var infoSide = null;
var nextUnitID = 0;
var units = null;
var numberOfUnits = null;
var ennemySideSauv = null;


function init() {
  console.log("init");
  contentManager = new ContentManager(stage, 480, 480);
  numberOfUnits = units.length;
  setMyUnitsSide();
  setEnnemySide();
  contentManager.init();
  setSocketOnForGame();

  stage.enableMouseOver();
}

mySide = '<h2>Mes unités</h2><div id="myUnits"></div>';
ennemySide = '<h2>Unités ennemies</h2><div id="ennemyUnits"></div>';

function setMyUnitsSide() {
  if(ContentManager.left) {
    $("#leftSide").html(mySide);
  }
  else {
    $("#rightSide").html(mySide);
  }

  for (var i = units.length - 1; i >= 0; i--) {
    console.log(units[i]);
    $("#myUnits").prepend('<div class="row unit" id="unit-' + i + '" data-unit="' + i + '" data-unit-game=""><div class="col-sm-12"><div class="row"><div class="col-sm-1"><div class="portrait"><img id="unit-' + i + '-img" /></div></div><div class="col-sm-4"><span class="name">' + units[i].name + '</span></div><div class="col-sm-6"><div class="progress life"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: ' + units[i].life + '%"></div></div></div></div></div><div class="row"><div class="col-sm-5 col-sm-offset-1 stats"><img src="../img/icons/attack.png" alt="Attaque"> 67 <img src="../img/icons/defense.png" alt="Défense"> 35 <img src="../img/icons/precision.png" alt="Précision"> 54 </div><div class="col-sm-6 skills"><img src="../img/icons/spell0.png" alt="Attaque"><img src="../img/icons/spell1.png" alt="Attaque"><img src="../img/icons/spell2.png" alt="Attaque"><img src="../img/icons/spell3.png" alt="Attaque"></div></div></div><div class="clearfix"></div>');
    $("#myUnits #unit-" + i).on("click", {id: i}, function(event) {
      if(gameStatut == GameStatut.PLACEMENT) {
        if(units[event.data.id].statut == -1) {
          $("#myUnits .unit").removeClass("selected");
          for (var i = units.length - 1; i >= 0; i--) {
            if(units[i].statut == 0)
              units[i].statut = -1;
          }
          $("#myUnits #unit-" + event.data.id).addClass("selected");
          units[event.data.id].statut = 0;
        }
      }
      else if(gameStatut == GameStatut.IDLE) {
        ContentManager.unSelectAllTiles();
        ContentManager.clearUnitsMenu();

        $("#myUnits #unit-" + event.data.id).addClass("selected");

        selectedUnit = ContentManager.units[event.data.id];

        if(selectedUnit != null) {
          selectedUnit.getAllTilesStatut();
          setInfoSide(selectedUnit);
        }
      }
    });

    $("#myUnits #unit-" + i).on("mouseover", {id: i}, function(event) {
      setInfoSide(units[event.data.id]);
    });


    $("#myUnits #unit-" + i).on("mouseout", {id: i}, function(event) {
      if(selectedUnit == null) {
        setEnnemySide();
      }
    });

  }

  $("#myUnits div.unit:first-child").addClass("selected");
}
var flag = -1;

function setInfoSide(data) {

  JSON.stringify(data);

  if(flag == -1)
  {
    console.log("setInfoSide()");

    infoSide = '<h2>&nbsp;</h2> <div id="infosUnit"><div class="row infos"><div class="col-sm-12" style="text-align:center;"><h3>' + data.name + '</h3><hr>';
    infoSide += '<h4>Statistiques</h4><div class="stats"><div class="row">';
    infoSide += '<div class="col-sm-3"><img src="../img/icons/vie.png" title="Vie"> 67</div><div class="col-sm-3"><img src="../img/icons/penetration.png" title="Pénétration"> 67</div><div class="col-sm-3"><img src="../img/icons/precision.png" title="Précision"> 67</div><div class="col-sm-3"><img src="../img/icons/esquive.png" title="Esquive"> 67</div>';
    infoSide += '<div class="col-sm-3"><img src="../img/icons/parade.png" title="Parade"> 67</div><div class="col-sm-3"><img src="../img/icons/defense.png" title="Défense"> 67</div><div class="col-sm-3"><img src="../img/icons/force.png" title="Force"> 67</div><div class="col-sm-3"><img src="../img/icons/agilite.png" title="Agilité"> 67</div><div class="col-sm-3 col-sm-offset-3"><img src="../img/icons/intelligence.png" title="Intelligence"> 67</div><div class="col-sm-3"><img src="../img/icons/armure.png" title="Armure"> 67</div></div>';
    infoSide += '<hr class="delimitor"><h4>Armes et armures</h4><div class="row">';
    infoSide += '<div class="col-sm-6"><div class="row"><div class="col-sm-6 col-sm-offset-3">Casque</div><div class="col-sm-6 col-sm-offset-3">Torse</div><div class="col-sm-6 col-sm-offset-3">Gants</div><div class="col-sm-6 col-sm-offset-3">Jambes</div><div class="col-sm-6 col-sm-offset-3">Bottes</div></div></div>';
    infoSide += '<div class="col-sm-6"><div class="row"><div class="col-sm-6 col-sm-offset-3">Lame</div><div class="col-sm-6 col-sm-offset-3">Pommeau</div><div class="col-sm-6 col-sm-offset-3">Garde</div><div class="col-sm-6 col-sm-offset-3">Manche</div></div></div></div></div></div></div></div>';

    if(ContentManager.left) {
      ennemySideSauv = $("#rightSide").html();
      $("#rightSide").html(infoSide);
    }
    else {
      ennemySideSauv = $("#leftSide").html();
      $("#leftSide").html(infoSide);
    }
    flag = 1;
  }
  else
  {
    console.log("setInfoSide() -> flag was false");
  }
}

function setEnnemySide() {

    console.log("setEnnemySide()");
    
    if(ennemySideSauv == null)
    {
      console.log("setEnnemySide -> First");
      if(ContentManager.left) {
        $("#rightSide").html(ennemySide);
      }
      else {
        $("#leftSide").html(ennemySide);
      }

      for (var i = ennemyUnits.length - 1; i >= 0; i--) {
        $("#ennemyUnits").prepend('<div class="row unit" id="unit-' + i + '" data-unit="' + i + '" data-unit-game=""><div class="col-sm-12"><div class="row"><div class="col-sm-1"><div class="portrait"><img id="unit-' + i + '-img" /></div></div><div class="col-sm-4"><span class="name">' + ennemyUnits[i].name + '</span></div><div class="col-sm-6"><div class="progress life"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: ' + ennemyUnits[i].life + '%"></div></div></div></div></div><div class="row"><div class="col-sm-5 col-sm-offset-1 stats"><img src="../img/icons/attack.png" alt="Attaque"> 67 <img src="../img/icons/defense.png" alt="Défense"> 35 <img src="../img/icons/precision.png" alt="Précision"> 54 </div><div class="col-sm-6 skills"><img src="../img/icons/spell0.png" alt="Attaque"><img src="../img/icons/spell1.png" alt="Attaque"><img src="../img/icons/spell2.png" alt="Attaque"><img src="../img/icons/spell3.png" alt="Attaque"></div></div></div><div class="clearfix"></div>');
      }
    }
    else if(flag == 1)
    {
      console.log("setEnnemySide -> Double");
      if(ContentManager.left) {
        $("#rightSide").html(ennemySideSauv);
      }
      else {
        $("#leftSide").html(ennemySideSauv);
      }
      
      flag = -1;
    }
    else
    {
      console.log("setEnnemySide() -> flag was false");
    }
}

function setSocketOnForGame()
{
  socket.on('ennemy-placement', function (data) {
    console.log('the units are positionning well : ' + JSON.stringify(data));

    for(var i = 0 ; i < data.length ; i++) {
      ContentManager.newUnit(data[i]._i,data[i]._j, ennemyUnits[i].sprite, ennemyUnits[i].taille, i, false, ennemyUnits[i].name);
    }
  });  
}