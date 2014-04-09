GameStatut = {
    IDLE:           0,
    START:          1,
    PLACEMENT:      2,      // Le joueur peut placer son unité
    MOVE:           3,      // Une unité est sélectionnée, le joueur peut maintenant la déplacer
    ATTACK:         4,      // Une unité est sélectionnée, a déjà été déplacée, elle peut maintenant attaquer
 };

$(window).keydown(function(e){
    "use strict";

    if(gameStatut == GameStatut.MOVE)
    {
        gameStatut = GameStatut.IDLE;
    }

    if(gameStatut == GameStatut.IDLE) {
        ContentManager.unSelectAllTiles();
        ContentManager.clearUnitsMenu();

        //cross browser issues exist
        if(!e){ e = window.event; }

        // On sélectionne l'unité
        $("#myUnits #unit-" + (parseInt(e.keyCode) - 49)).addClass("selected");
        selectedUnit = ContentManager.units[(parseInt(e.keyCode) - 49)];
        if(selectedUnit != null) {
            selectedUnit.getAllTilesStatut();
            console.log("$(window).keydown(function(e) -> setInfoSide");
            console.log(selectedUnit);
            setInfoSide(selectedUnit);
        }
    }
});


var KEYCODE_0 = 48;
var KEYCODE_1 = 49;
var KEYCODE_2 = 50;
var KEYCODE_3 = 51;
var KEYCODE_4 = 52;
var KEYCODE_5 = 53;
var KEYCODE_6 = 54;
var KEYCODE_7 = 55;
var KEYCODE_8 = 56;
var KEYCODE_9 = 57;

var unistJson;
var tilesetSheet;
var map;
var Hero;
var Start;
var spritePerso;

//to stock the units created
var unitsCreated = [];
var loadingQueue;

// this is the units created from the list inside,
// the HTML page
var unitsToMove = [];
var substage;

var selectedUnit = null;
var selectedUnitID = null;
var unitsCache = [];
var unitsPlacement = [];
var gameStatut;
var placement_en_cours = true;
var selected_Unit = null;
var EnumTilePassable = null;

/**
 * Used to download all ressources and start the game
 * @param {createjs.Stage} stage
 * @param {int} width
 * @param {int} height
 */
//function ContentManager(stage , width, height*/) {
function ContentManager(stage) {
    "use strict";

    ContentManager.nextUnitID = 0;

    ContentManager.getNextUnitID = function () {
        ContentManager.nextUnitID++;
        return ContentManager.nextUnitID;
    };

    ContentManager.unitsCaracteristics = {
        PETITFIN: "petitfin",
        PETITMOYEN: "petitmoyen",
        PETITMUSCLE: "petitmuscle",
        NORMALFIN: "normalfin",
        NORMALMOYEN: "normalmoyen",
        NORMALMUSCLE: "normalmuscle",
        GRANDFIN: "grandfin",
        GRANDMOYEN: "grandmoyen",
        GRANDMUSCLE: "grandmuscle",
    };

    ContentManager.units = [];
    ContentManager.ennemyUnits = [];

    /**
     * Initialize all downloads
     */
    this.init = function () {
        substage = new createjs.Container();

        stage.addChild(substage);

        loadingQueue = new createjs.LoadQueue(false);
        loadingQueue.addEventListener("complete", initMap);
        loadingQueue.loadManifest([{id:"tileset", src:"../img/sprites/tiles.jpg"}]); // On oblige le chargement de l'image avant l'exécution de la suite, sinon la map n'est pas chargée avant le stage.update()
        loadingQueue.loadManifest([{id:"map-json", src: "../json/map_new.json"}]);
        loadingQueue.loadManifest([{id:"units-json", src:"../json/units.json"}]);
        loadingQueue.loadManifest([{id:"perso_petit", src:"../img/sprites/Perso_barbu.png"}]);
        loadingQueue.loadManifest([{id:"perso_casque", src:"../img/sprites/Perso_barbu_epee.png"}]);
        loadingQueue.loadManifest([{id:"perso_casque_argent", src:"../img/sprites/perso_casqueArgent.png"}]);
        loadingQueue.loadManifest([{id:"perso_casque_Or", src:"../img/sprites/perso_casqueOr2.png"}]);

        gameStatut = GameStatut.IDLE;
    };
    
    /**
     * Initialize map with all parameters
     */
    function initMap () {
        ContentManager.tilesheight = 32;
        ContentManager.tileswidth = 32;

        var tilesetimg = loadingQueue.getResult("tileset");

        var imageData = {
            images : [ tilesetimg ],
            frames : {
                width :     ContentManager.tileswidth,
                height :    ContentManager.tilesheight
            }
        };

        tilesetSheet = new createjs.SpriteSheet(imageData);
        map = new Map(stage);

        unistJson = jQuery.parseJSON(loadingQueue.getResult("units-json",true));

        addUnitImageInMenu();

        gameStatut = GameStatut.PLACEMENT;

        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(60);
    }


    /**
     * Refresh and show FPS
     * @param  {createjs.Event} event
     */
    function tick (event) {
        $("#fps").html("<strong>FPS:</strong> " + Math.round(createjs.Ticker.getMeasuredFPS()));
        stage.update(event);
    }

    /**
     * Create a unity and keep it in memory
     * @param  {int} x
     * @param  {int} y
     * @param  {string} type
     * @param  {string} taille
     * @param  {int} idUnit
     */
    ContentManager.newUnit = function(x, y, type, taille, idUnit, Ismine, name) {

        unistJson = jQuery.parseJSON(loadingQueue.getResult("units-json",true));
        var loading_id = unistJson[type].specifications[taille].sprites.spritesheet_loading_ID;
        spritePerso = loadingQueue.getResult(loading_id);
        Start = map.GetBounds(x, y).GetBottomCenter();

        for (var i = ContentManager.units.length - 1; i >= 0; i--) {
            if(ContentManager.units[i].position.x == Start.x && ContentManager.units[i].position.y == Start.y) {
                console.log("Vous ne pouvez pas placer votre personnage à ce endroit.");
                return false;
            }
        }

        Hero = new Unit(spritePerso, map, Start, unistJson[type], taille, x, y, Ismine, idUnit, name);

        if (Ismine) {
            ContentManager.units.push(Hero);
            units[idUnit].unitID = Hero.unitID;
            units[idUnit].statut = 1; // Placé
        }
        else
        {
            ContentManager.ennemyUnits.push(Hero);
            ennemyUnits[idUnit].unitID = Hero.unitID;
            ennemyUnits[idUnit].statut = 1; // Placé
        }


        $("#myUnits #unit-" + idUnit).removeClass("selected");
        $("#myUnits #unit-" + idUnit).addClass("valid");

        var nextIdUnit = (parseInt(idUnit) + 1) % units.length;
        if(units[nextIdUnit] != null) {
            if(units[nextIdUnit].statut == -1) {
                units[nextIdUnit].statut = 0;
                $("#myUnits #unit-" + nextIdUnit).addClass("selected");
            }
        }
    };

    ContentManager.unSelectAllTiles = function() {
        for(var i = 0; i < map.gameHeight; i++) {
            for(var j = 0; j < map.gameWidth; j++) {
                map.tiles[i][j].shape_selection_possible.visible = false;

                if(selectedUnit != null)
                    selectedUnit.shape_selected_unit.visible = false;
            }
        }

        for(i = 0 ; i < ContentManager.units.lenght; i++)
            ContentManager.units[i].shape_selected.visible = false;
    };

    ContentManager.clearUnitsMenu = function() {
        for (var i = units.length - 1; i >= 0; i--) {
            $("#myUnits #unit-" + i).removeClass("valid");
            $("#myUnits #unit-" + i).removeClass("selected");
        }
    };

    ContentManager.selectTilesAttack = function(x, y) {
        map.tiles[y - 1][x].shape_selection_possible.visible = true;
        map.tiles[y + 1][x].shape_selection_possible.visible = true;
        map.tiles[y][x - 1].shape_selection_possible.visible = true;
        map.tiles[y][x + 1].shape_selection_possible.visible = true;
    };

    /**
     * Generate units image for menus
     */
    function addUnitImageInMenu ()
    {
        var x;
        var y;
        var type;
        var taille;
        var idUnit;
        var cache_widht;
        var cache_height;
        var cache_x;
        var cache_y;
        var loading_id;
        var _data;


        for(var i = 0; i < units.length; i++)
        {
            x = -10;
            y = -10;
            type = units[i].sprite;
            taille = units[i].taille;

            //console.log(taille);
            idUnit = i;

            unistJson = jQuery.parseJSON(loadingQueue.getResult("units-json",true));
            loading_id = unistJson[type].specifications[taille].sprites.spritesheet_loading_ID;
            spritePerso = loadingQueue.getResult(loading_id);
            Start = map.GetBounds(x, y).GetBottomCenter();
            Hero = new Unit(spritePerso, map, Start, unistJson[type], taille, x, y, true, idUnit);

            unitsCache.push(Hero);

            cache_widht = Hero.width;
            cache_height = Hero.height;
            cache_x = -(cache_widht/2)-1;
            cache_y = -(cache_widht/2)-1;

            Hero._container.cache(cache_x,cache_y,cache_widht,cache_height);
            _data = Hero._container.getCacheDataURL();
            $("#myUnits #unit-" + i +"-img").attr({src: _data});

        }

        for(i = 0; i < ennemyUnits.length; i++)
        {
            x = -10;
            y = -10;
            type = ennemyUnits[i].sprite;
            taille = ennemyUnits[i].taille;

            //console.log(taille);
            idUnit = i;

            unistJson = jQuery.parseJSON(loadingQueue.getResult("units-json",true));
            loading_id = unistJson[type].specifications[taille].sprites.spritesheet_loading_ID;
            spritePerso = loadingQueue.getResult(loading_id);
            Start = map.GetBounds(x, y).GetBottomCenter();
            Hero = new Unit(spritePerso, map, Start, unistJson[type], taille, x, y, false,idUnit);

            unitsCache.push(Hero);

            cache_widht = Hero.width;
            cache_height = Hero.height;
            cache_x = -(cache_widht/2)-1;
            cache_y = -(cache_widht/2)-1;

            Hero._container.cache(cache_x,cache_y,cache_widht,cache_height);
            _data = Hero._container.getCacheDataURL();
            $("#ennemyUnits #unit-" + i +"-img").attr({src: _data});

        }


        // We save the side of the ennemy !!
        if(ContentManager.left) {
            ennemySideSauv = $("#rightSide").html();
        }
        else {
            ennemySideSauv = $("#leftSide").html();
        }
    }

}
