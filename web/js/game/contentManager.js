var unistJson;
var tilesetSheet;
var map;
var Hero;
var Start;
var spritePerso;
//to stock the units created
var unitsCreated = [];

// this is the units created from the list inside,
// the HTML page
var unitsToMove = [];

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

    this.init = function () {


        // coloration du canvas pour tests
        var shape2 = new createjs.Shape();
        shape2.name = "fondMap";
        shape2.graphics.beginFill("#FF0000");
        shape2.graphics.drawRect(0,0,480,480);
        stage.addChild(shape2);

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
    };

    function initMap() {

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

    function tick(event) {
        $("#fps").html("<strong>FPS:</strong> " + Math.round(createjs.Ticker.getMeasuredFPS()));
        stage.update(event);
    }

    function createUnit(x, y, type, taille) {
        "use strict";

        var loading_id = unistJson[type].specifications[taille].sprites.spritesheet_loading_ID;
        spritePerso = loadingQueue.getResult(loading_id);
        Start = map.GetBounds(x, y).GetBottomCenter();
        // we add the new unit to the array to get them !
        unitsCreated.push(new Unit(spritePerso, map, Start, unistJson[type], taille));
    }

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

        Hero = new Unit(spritePerso, map, Start, unistJson[type], taille);
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

    function addUnitImageInMenu()
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
            Hero = new Unit(spritePerso, map, Start, unistJson[type], taille);


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