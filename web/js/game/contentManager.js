function ContentManager(stage, width, height) {

    this.init = function () {

        loadingQueue = new createjs.LoadQueue(false);
        loadingQueue.addEventListener("complete", initMap);
        loadingQueue.loadManifest([{id:"tileset", src:"../../img/sprites/spritemap.png"}]); // On oblige le chargement de l'image avant l'exécution de la suite, sinon la map n'est pas chargée avant le stage.update()
    }

    function initMap() {
        tilesheight = 32;
        tileswidth = 32;

        tilesetimg = new Image();
        tilesetimg.src = "../../img/sprites/spritemap.png";
        var imageData = {
            images : [ tilesetimg ],
            frames : {
                width : tileswidth,
                height : tilesheight
            }
        };

        this.tilesetSheet = new createjs.SpriteSheet(imageData);
        this.map = new Map(stage);

    }

}
