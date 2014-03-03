
define(['jquery', 'easel', 'app/game/contentManager'], function ($, createjs, ContentManager) {
  console.log('game loaded');

  var canvas = document.getElementById("canvas");
  var stage = new createjs.Stage(canvas);

  stage.enableMouseOver();
  function init() {
    contentManager = new ContentManager(stage, 480, 480);
    contentManager.init();
  }

  var nextUnitID = 0;
  var units = [
    { "sprite": "firefox", "taille": "petitfin", "name": "Bobby", "statut": 0, "life": 100 },
    { "sprite": "mailarmor", "taille": "petitfin", "name": "Jacky", "statut": -1, "life": 100 },
    { "sprite": "mailarmor", "taille": "petitfin", "name": "Bruce", "statut": -1, "life": 100 },
    { "sprite": "firefox", "taille": "petitfin", "name": "Patrick", "statut": -1, "life": 100 },
  ];
  var numberOfUnits = units.length;

  var left = true;

  mySide = '<h2>Mes unités</h2><div id="myUnits"></div>';
  ennemySide = '<h2>Unités ennemies</h2> <div id="ennemyUnits></div>';

  function setMyUnitsSide() {
    if(left) {
      $("#leftSide").html(mySide);
    }
    else {
      $("#rightSide").html(mySide);
    }

    for (var i = units.length - 1; i >= 0; i--) {
      $("#myUnits").prepend('<div class="row unit" id="unit-' + i + '" data-unit="' + i + '" data-unit-game=""><div class="col-sm-12"><div class="row"><div class="col-sm-1"><div class="portrait"><img id="unit-' + i + '-img" /></div></div><div class="col-sm-4"><span class="name">' + units[i].name + '</span></div><div class="col-sm-6"><div class="progress life"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: ' + units[i].life + '%"></div></div></div></div></div><div class="row"><div class="col-sm-5 col-sm-offset-1 stats"><img src="../img/icons/attack.png" alt="Attaque"> 67 <img src="../img/icons/defense.png" alt="Défense"> 35 <img src="../img/icons/precision.png" alt="Précision"> 54 </div><div class="col-sm-6 skills"><img src="../img/icons/spell0.png" alt="Attaque"><img src="../img/icons/spell1.png" alt="Attaque"><img src="../img/icons/spell2.png" alt="Attaque"><img src="../img/icons/spell3.png" alt="Attaque"></div></div></div><div class="clearfix"></div>');
      $("#unit-" + i).on("click", {id: i}, function(event) {
        if(gameStatut == GameStatut.PLACEMENT) {
          if(units[event.data.id].statut == -1) {
            $("#myUnits .unit").removeClass("selected");
            for (var i = units.length - 1; i >= 0; i--) {
              if(units[i].statut == 0)
                units[i].statut = -1;
            };
            $("#unit-" + event.data.id).addClass("selected");
            units[event.data.id].statut = 0;
          }
        }
        else if(gameStatut == GameStatut.IDLE || gameStatut == GameStatut.MOVE) {
          ContentManager.unSelectAllTiles();
          ContentManager.clearUnitsMenu();

          $("#unit-" + event.data.id).addClass("selected");

          selectedUnit = ContentManager.units[event.data.id];

          if(selectedUnit != null) {
            selectedUnit.getAllTilesStatut();
            setInfoSide(selectedUnit);
          }
        }
      });

      $("#unit-" + i).on("mouseover", {id: i}, function(event) {
        setInfoSide(ContentManager.units[event.data.id]);
      });

      $("#unit-" + i).on("mouseout", {id: i}, function(event) {
        if(selectedUnit == null)
          setEnnemySide();
      });

    }

    $("#myUnits div.unit:first-child").addClass("selected");
  }

  function setInfoSide(data) {
    // ' + data.name + '
    // ' + data.armor.pieces[0].part.name + '
    infoSide = '<h2>&nbsp;</h2> <div id="infosUnit"><div class="row infos"><div class="col-sm-12" style="text-align:center;"><h3>Jacky</h3><hr>';
    infoSide += '<h4>Statistiques</h4><div class="stats"><div class="row">';
    infoSide += '<div class="col-sm-3"><img src="../img/icons/vie.png" title="Vie"> 67</div><div class="col-sm-3"><img src="../img/icons/penetration.png" title="Pénétration"> 67</div><div class="col-sm-3"><img src="../img/icons/precision.png" title="Précision"> 67</div><div class="col-sm-3"><img src="../img/icons/esquive.png" title="Esquive"> 67</div>';
    infoSide += '<div class="col-sm-3"><img src="../img/icons/parade.png" title="Parade"> 67</div><div class="col-sm-3"><img src="../img/icons/defense.png" title="Défense"> 67</div><div class="col-sm-3"><img src="../img/icons/force.png" title="Force"> 67</div><div class="col-sm-3"><img src="../img/icons/agilite.png" title="Agilité"> 67</div><div class="col-sm-3 col-sm-offset-3"><img src="../img/icons/intelligence.png" title="Intelligence"> 67</div><div class="col-sm-3"><img src="../img/icons/armure.png" title="Armure"> 67</div></div>';
    infoSide += '<hr class="delimitor"><h4>Armes et armures</h4><div class="row">';
    infoSide += '<div class="col-sm-6"><div class="row"><div class="col-sm-6 col-sm-offset-3">Casque</div><div class="col-sm-6 col-sm-offset-3">Torse</div><div class="col-sm-6 col-sm-offset-3">Gants</div><div class="col-sm-6 col-sm-offset-3">Jambes</div><div class="col-sm-6 col-sm-offset-3">Bottes</div></div></div>';
    infoSide += '<div class="col-sm-6"><div class="row"><div class="col-sm-6 col-sm-offset-3">Lame</div><div class="col-sm-6 col-sm-offset-3">Pommeau</div><div class="col-sm-6 col-sm-offset-3">Garde</div><div class="col-sm-6 col-sm-offset-3">Manche</div></div></div></div></div></div></div></div>';

    if(left) {
      $("#rightSide").html(infoSide);
    }
    else {
      $("#leftSide").html(infoSide);
    }
  }

  function setEnnemySide() {
    if(left) {
      $("#rightSide").html(ennemySide);
    }
    else {
      $("#leftSide").html(ennemySide);
    }
  }

  $(document).ready(function(){
    setMyUnitsSide();
    setEnnemySide();
  });
 });
