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

var placement_en_cours = true;
var selected_Unit = null;

/**
 * Used to download all ressources and start the game
 * @param {createjs.Stage} stage
 * @param {int} width
 * @param {int} height
 */
function ContentManager(stage, width, height) {

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

    /**
     * Initialize all downloads
     */
    this.init = function () {
        "use strict";

        // coloration du canvas pour tests
        substage = new createjs.Container();

       // First Try to deform the map

        stage.addChild(substage);

        loadingQueue = new createjs.LoadQueue(false);
        loadingQueue.addEventListener("complete", initMap);
        loadingQueue.loadManifest([{id:"tileset", src:"../img/sprites/spritemap.png"}]); // On oblige le chargement de l'image avant l'exécution de la suite, sinon la map n'est pas chargée avant le stage.update()
        loadingQueue.loadManifest([{id:"unitFirefox", src:"../img/sprites/firefox.png"}]);
        loadingQueue.loadManifest([{id:"unitFirefox2", src:"../img/sprites/firefox2.png"}]);
        loadingQueue.loadManifest([{id:"sword", src:"../img/sprites/bluesword.png"}]);
        loadingQueue.loadManifest([{id:"map-json", src:"../json/map.json"}]);
        loadingQueue.loadManifest([{id:"units-json", src:"../json/units.json"}]);
        loadingQueue.loadManifest([{id:"mailarmor", src:"../img/sprites/mailarmor.png"}]);
        loadingQueue.loadManifest([{id:"mailarmor2", src:"../img/sprites/mailarmor2.png"}]);
    }

    /**
     * Initialize map with all parameters
     */
    function initMap () {

        "use strict";
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
    ContentManager.newUnit = function(x, y, type, taille, idUnit) {
        "use strict";

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

        Hero = new Unit(spritePerso, map, Start, unistJson[type], taille, x, y);
        ContentManager.units.push(Hero);
        units[idUnit].unitID = Hero.unitID;
        units[idUnit].statut = 1; // Placé
        $("#unit-" + idUnit).append('<i class="glyphicon glyphicon-ok"></i>');
        $("#unit-" + idUnit).removeClass("active");

        var nextIdUnit = (idUnit + 1) % units.length;

        if(units[nextIdUnit] != null) {
            if(units[nextIdUnit].statut == -1) {
                units[nextIdUnit].statut = 0;
                $("#unit-" + nextIdUnit).addClass("active");
            }
        }
    };

    /**
     * TODO
     */
    ContentManager.selectTiles = function(i, j) {
        "use strict";

        for(var cpt = 0 ; cpt < map.gameWidth ; cpt = cpt+1)
        {
            for(var cpt2 = 0 ; cpt2 < map.gameWidth ; cpt2 = cpt2+1)
            {
                var tile_en_cours = map.tiles[cpt][cpt2];
                var shape = null;
                if(tile_en_cours.Collision == Enum.TileCollision.Impassable)
                {
                    shape = tile_en_cours.shape_selection_impossible;
                }
                else
                {
                    shape = tile_en_cours.shape_selection_possible;
                }

                if(tile_en_cours.i == i-1 && tile_en_cours.j == j)
                {
                    shape.visible = true;
                }
                else if(tile_en_cours.i == i+1 && tile_en_cours.j == j)
                {
                    shape.visible = true;
                }
                else if(tile_en_cours.i == i && tile_en_cours.j == j-1)
                {
                    shape.visible = true;
                }
                else if(tile_en_cours.i == i && tile_en_cours.j == j+1)
                {
                    shape.visible = true;
                }
                else if(tile_en_cours.i == i && tile_en_cours.j == j)
                {
                    shape.visible = true;
                }
            }
        }
    };

    /**
     * TODO
     */
    ContentManager.DeselectTilesAndUnits = function() {
        "use strict";

        for(var cpt = 0 ; cpt < map.gameWidth ; cpt = cpt+1)
        {
            for(var cpt2 = 0 ; cpt2 < map.gameWidth ; cpt2 = cpt2+1)
            {
                map.tiles[cpt][cpt2].shape_selection_possible.visible = false;
                map.tiles[cpt][cpt2].shape_selection_impossible.visible = false;
            }
        }

        for(var cpt3 = 0 ; cpt3 < ContentManager.units.lenght ; cpt3 = cpt3+1)
        {
            ContentManager.units[cpt3].shape_selected.visible = false;
        }
        selected_Unit = null;
    };

    /**
     * Generate units image for menus
     */
    function addUnitImageInMenu ()
    {
        "use strict";

        var x;
        var y;
        var type;
        var taille;
        var idUnit;

        for(var i = 0; i < units.length; i++)
        {
            x = -10;
            y = -10;
            type = units[i].sprite;
            taille = units[i].taille;
            idUnit = i;

            unistJson = jQuery.parseJSON(loadingQueue.getResult("units-json",true));
            var loading_id = unistJson[type].specifications[taille].sprites.spritesheet_loading_ID;
            spritePerso = loadingQueue.getResult(loading_id);
            Start = map.GetBounds(x, y).GetBottomCenter();
            Hero = new Unit(spritePerso, map, Start, unistJson[type], taille, x, y);


            var cache_widht = Hero.width;
            var cache_height = Hero.height;
            var cache_x = -(cache_widht/2)-1;
            var cache_y = -(cache_widht/2)-1;

            Hero._container.cache(cache_x,cache_y,cache_widht,cache_height);
            var _data = Hero._container.getCacheDataURL();
            $("#unit-" + i +"-img").attr({src: _data});

        }
    }

}