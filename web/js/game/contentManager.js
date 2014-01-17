var unistJson;
var taille_sprite;

function ContentManager(stage, width, height) {

    this.init = function () {

        loadingQueue = new createjs.LoadQueue(false);
        loadingQueue.addEventListener("complete", initMap);
        loadingQueue.loadManifest([{id:"tileset", src:"../../img/sprites/spritemap.png"}]); // On oblige le chargement de l'image avant l'exécution de la suite, sinon la map n'est pas chargée avant le stage.update()
        loadingQueue.loadManifest([{id:"unitFirefox", src:"../../img/sprites/firefox.png"}]);
        loadingQueue.loadManifest([{id:"unitFirefox2", src:"../../img/sprites/firefox2.png"}]);
        loadingQueue.loadManifest([{id:"sword", src:"../../img/sprites/bluesword.png"}]);
        loadingQueue.loadManifest([{id:"map-json", src:"../../json/map.json"}]);
        loadingQueue.loadManifest([{id:"units-json", src:"../../json/units.json"}]);
        loadingQueue.loadManifest([{id:"mailarmor", src:"../../img/sprites/mailarmor.png"}]);
        loadingQueue.loadManifest([{id:"mailarmor2", src:"../../img/sprites/mailarmor2.png"}]);

        // Should it load every sprites for every possibilities for units ?
        taille_sprite = "petit";
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

        unistJson = jQuery.parseJSON(loadingQueue.getResult("units-json",true));

        // try to create units from units.json
        createUnitFromJson(5,3,"firefox");
        createUnitFromJson(5,4,"firefox");
        createUnitFromJson(5,5,"firefox");
        createUnitFromJson(7,5,"mailarmor");
        createUnitFromJson(7,6,"mailarmor");
        createUnitFromJson(7,7,"mailarmor");

        taille_sprite = "grand";

        createUnitFromJson(9,3,"firefox");
        createUnitFromJson(9,4,"firefox");
        createUnitFromJson(9,5,"firefox");
        createUnitFromJson(2,5,"mailarmor");
        createUnitFromJson(2,6,"mailarmor");
        createUnitFromJson(2,7,"mailarmor");

    }

    function createUnit(x, y, type) {
        spritePerso = loadingQueue.getResult("unit" + type);
        this.Start = this.map.GetBounds(x, y).GetBottomCenter();
        this.Hero = new Unit(spritePerso, this.map, this.Start);
    }

    function createUnitFromJson(x, y, type) {
        var loading_id = unistJson[type].specifications[taille_sprite].sprites.spritesheet_loading_ID;
        spritePerso = loadingQueue.getResult(loading_id);
        this.Start = this.map.GetBounds(x, y).GetBottomCenter();
        this.Hero = new UnitJson(spritePerso, this.map, this.Start,unistJson[type]);
    }
}
