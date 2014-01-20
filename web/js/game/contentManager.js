var unistJson;

function ContentManager(stage, width, height) {

    ContentManager.nextUnitID = 0;

    ContentManager.getNextUnitID = function () {
        ContentManager.nextUnitID++;
        return ContentManager.nextUnitID;
    }

    var unitsCaracteristics = {
        PETITFIN: "petitfin",
        PETITMOYEN: "petitmoyen",
        PETITMUSCLE: "petitmuscle",
        NORMALFIN: "normalfin",
        NORMALMOYEN: "normalmoyen",
        NORMALMUSCLE: "normalmuscle",
        GRANDFIN: "grandfin",
        GRANDMOYEN: "grandmoyen",
        GRANDMUSCLE: "grandmuscle",
    }

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

        createUnit(5,3,"firefox", unitsCaracteristics.PETITFIN);
        createUnit(5,4,"firefox", unitsCaracteristics.PETITFIN);
        createUnit(5,5,"firefox", unitsCaracteristics.PETITFIN);
        createUnit(7,6,"mailarmor", unitsCaracteristics.PETITFIN);
        createUnit(7,7,"mailarmor", unitsCaracteristics.PETITFIN);
        createUnit(7,8,"mailarmor", unitsCaracteristics.PETITFIN);

        createUnit(9,3,"firefox", unitsCaracteristics.GRANDMUSCLE);
        createUnit(9,4,"firefox", unitsCaracteristics.GRANDMUSCLE);
        createUnit(9,5,"firefox", unitsCaracteristics.GRANDMUSCLE);
        createUnit(3,6,"mailarmor", unitsCaracteristics.GRANDMUSCLE);
        createUnit(3,7,"mailarmor", unitsCaracteristics.GRANDMUSCLE);
        createUnit(3,8,"mailarmor", unitsCaracteristics.GRANDMUSCLE);

        createUnit(1,3,"firefox", unitsCaracteristics.PETITFIN);
        createUnit(1,4,"firefox", unitsCaracteristics.PETITFIN);
        createUnit(1,5,"firefox", unitsCaracteristics.PETITFIN);
        createUnit(2,6,"mailarmor", unitsCaracteristics.PETITFIN);
        createUnit(2,7,"mailarmor", unitsCaracteristics.PETITFIN);
        createUnit(2,8,"mailarmor", unitsCaracteristics.PETITFIN);

        createUnit(4,3,"firefox", unitsCaracteristics.GRANDMUSCLE);
        createUnit(4,4,"firefox", unitsCaracteristics.GRANDMUSCLE);
        createUnit(4,5,"firefox", unitsCaracteristics.GRANDMUSCLE);
        createUnit(6,6,"mailarmor", unitsCaracteristics.GRANDMUSCLE);
        createUnit(6,7,"mailarmor", unitsCaracteristics.GRANDMUSCLE);
        createUnit(6,8,"mailarmor", unitsCaracteristics.GRANDMUSCLE);

        createjs.Ticker.addEventListener("tick", tick);
    }

    function tick(event) {
        stage.update(event);
    }

    function createUnit(x, y, type, taille) {
        var loading_id = unistJson[type].specifications[taille].sprites.spritesheet_loading_ID;
        spritePerso = loadingQueue.getResult(loading_id);
        this.Start = this.map.GetBounds(x, y).GetBottomCenter();
        this.Hero = new Unit(spritePerso, this.map, this.Start, unistJson[type], taille);
    }

}
