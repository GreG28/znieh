var mapDataJson;

function ContentManager(stage, width, height) {

    this.init = function () {

        loadingQueue = new createjs.LoadQueue(false);
        loadingQueue.addEventListener("complete", initMap);
        loadingQueue.loadManifest([{id:"tileset", src:"../../img/sprites/spritemap.png"}]); // On oblige le chargement de l'image avant l'exécution de la suite, sinon la map n'est pas chargée avant le stage.update()
        loadingQueue.loadManifest([{id:"unitFirefox", src:"../../img/sprites/firefox.png"}]);
        loadingQueue.loadManifest([{id:"sword", src:"../../img/sprites/bluesword.png"}]);
        loadingQueue.loadManifest([{id:"map-json", src:"../../json/map.json"}]);
        loadingQueue.loadManifest([{id:"units-json", src:"../../json/units.json"}]);
    };

    function initMap() {
        tilesheight = 32;
        tileswidth = 32;

        tilesetimg = loadingQueue.getResult("tileset");

        var imageData = {
            images : [ tilesetimg ],
            frames : {
                width : tileswidth,
                height : tilesheight
            }
        };

        this.tilesetSheet = new createjs.SpriteSheet(imageData);
        this.map = new Map(stage);

        createUnit(3, 3, "Firefox");
    }

    function createUnit(x, y, type) {
        spritePerso = loadingQueue.getResult("unit" + type);
        this.Start = this.map.GetBounds(x, y).GetBottomCenter();
        this.Hero = new Unit(spritePerso, this.map, this.Start);
    }
}
