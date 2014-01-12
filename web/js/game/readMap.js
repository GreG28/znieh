var tileset;
var stage;
var mapData;
var blocked;
var canvas;
var mapDataJson;

function init() {
    blocked = new Array();

    mapData =  loadingQueue.getResult("map-json");
    canvas = document.getElementById("canvas");

    loadingQueue = new createjs.LoadQueue(false);
    loadingQueue.addEventListener("complete", setMap);
    loadingQueue.loadManifest([{id:"tileimg", src:mapData.tilesets[0].image}]); // On oblige le chargement de l'image avant l'exécution de la suite, sinon la map n'est pas chargée avant le stage.update()
    loadingQueue.loadManifest([{id:"imgPerso", src:"../../img/sprites/firefox.png"}]);
    loadingQueue.loadManifest([{id:"imgArme", src:"../../img/sprites/bluesword.png"}]);
    loadingQueue.loadManifest([{id:"map-json", src:"../../json/map.json"}]);
    loadingQueue.loadManifest([{id:"units-json", src:"../../json/units.json"}]);
}

function setMap() {
    //mapDataJson = loadingQueue.getResult("map-json");

    stage = new createjs.Stage(canvas);

    tileset = new Image();
    tileset.src = mapData.tilesets[0].image;
    tileset.onLoad = initLayers();

    var spriteSheet = new createjs.SpriteSheet({
        images: [loadingQueue.getResult("imgPerso")],
        frames: {width: 32, height: 32, regX: 16, regY: 16},
        animations: {
            walk: [8, 11, "walk", 0.2]
        }
    });
    var spriteSheet2 = new createjs.SpriteSheet({
        images: [loadingQueue.getResult("imgArme")],
        frames: {width: 48, height: 48, regX: 24, regY: 24},
        animations: {
            walk_aller: [10, 11, "walk_aller", 0.2],
            walk_retour: [25, 26, "walk_retour", 0.2],
        }
    });


    bmpAnimation = new createjs.Sprite(spriteSheet);
    bmpAnimation.gotoAndPlay("walk");
    bmpAnimation.scaleX = -1;

    bmpAnimation.name = "monster1";
    bmpAnimation.direction = 90;
    bmpAnimation.vX = 1; // Permet de régler la vitesse et le sens !!
    bmpAnimation.x = 16;
    bmpAnimation.y = 32;
    bmpAnimation.currentFrame = 0;

    stage.addChild(bmpAnimation);

    bmpAnimation2 = new createjs.Sprite(spriteSheet2);
    bmpAnimation2.gotoAndPlay("walk_aller");
    bmpAnimation2.scaleX = -1;

    bmpAnimation2.name = "arme";
    bmpAnimation2.direction = 90;
    bmpAnimation2.vX = 1; // Permet de régler la vitesse et le sens !!
    bmpAnimation2.x = 19;
    bmpAnimation2.y = 31;
    bmpAnimation2.currentFrame = 0;

    stage.addChild(bmpAnimation2);

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);

    stage.update();
}

function aller() {
    bmpAnimation2.gotoAndPlay("walk_aller");
    bmpAnimation2.scaleX = 1;
    bmpAnimation2.x -= 3;
    bmpAnimation2.y += 1;


    bmpAnimation2.direction = -90;
}

function retour() {
    bmpAnimation2.gotoAndPlay("walk_retour");
    bmpAnimation2.scaleX = -1;
    bmpAnimation2.x += 3;
    bmpAnimation2.y -= 1;

    bmpAnimation2.direction = 90;
}

function tick() {
    if (bmpAnimation.x >= screen_width - 16) {
        bmpAnimation.direction = 90;
        bmpAnimation.scaleX = -1;

        retour();
    }

    if (bmpAnimation.x < 16) {
        bmpAnimation.direction = -90;
        bmpAnimation.scaleX = 1;

        aller();
    }

    if (bmpAnimation.direction == -90) {
        bmpAnimation.x += bmpAnimation.vX;
        bmpAnimation2.x += bmpAnimation2.vX;
    }
    else {
        bmpAnimation.x -= bmpAnimation.vX;
        bmpAnimation2.x -= bmpAnimation2.vX;
    }

    stage.update();
}

function initLayers() {

    // On définit la taille des Tiles
    var w = mapData.tilesets[0].tilewidth;
    var h = mapData.tilesets[0].tileheight;

    // On récupère les tileid bloquantes et on les place dans un tableau pour pouvoir les réutiliser facilement plus tard
    $.each( mapData.tilesets[0].tileproperties, function (tileid, properties) {
        $.each(properties, function (parameter, value) {
            blocked.push(tileid);
        });
    });

    console.log(blocked);

    var imageData = {
        images : [ tileset ],
        frames : {
            width : w,
            height : h
        }
    };

    // On crée la SpriteSheet qui servira à construire la map
    var tilesetSheet = new createjs.SpriteSheet(imageData);

    // On initialise tous les layers
    for (var idx = 0; idx < mapData.layers.length; idx++) {
        var layerData = mapData.layers[idx];
        if (layerData.type == 'tilelayer')
            initLayer(layerData, tilesetSheet, mapData.tilewidth, mapData.tileheight);
    }

    // On fait la MaJ
    createjs.Ticker.setFPS(20);
    createjs.Ticker.addEventListener(stage);

}

function initLayer(layerData, tilesetSheet, tilewidth, tileheight) {
    console.log(layerData);
    for ( var y = layerData.height - 1; y >= 0; y--) {
        for ( var x = layerData.width - 1; x >= 0 ; x--) {
            // On crée un Sprite pour chaque Tile
            var cellBitmap = new createjs.Sprite(tilesetSheet);

            // On récupère l'id de la Tile
            var idx = x + y * layerData.width;

            // On affiche les Tiles bloquantes (-1 car Tilemap data commence à 1, EaselJS 0)
            if(inArray((layerData.data[idx] - 1), blocked)) {
                $("#logs").prepend("<tr><td>" + x + "</td><td>" + y + "</td></tr>");
            }

            // On ajoute l'image du Tile à la map
            cellBitmap.gotoAndStop(layerData.data[idx] - 1);

            // On définit les coordonnées de la Tile
            cellBitmap.x = x * tilewidth;
            cellBitmap.y = y * tileheight;

            // On ajoute l'image au stage
            stage.addChild(cellBitmap);
        }
    }
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}