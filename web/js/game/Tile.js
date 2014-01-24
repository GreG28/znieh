function Enum() { }
Enum.TileCollision = { Passable: 0, Impassable: 1 };

(function (window) {
    function Tile(texture, collision, x, y, render) {
        "use strict";
        this.initialize(texture, collision,x,y, render);
    }

    Tile.prototype = new createjs.Container();

    Tile.prototype.initialize = function(texture, collision, x, y, render) {
        "use strict";

        if (texture !== null) {
            this.empty = false;
        }
        else {
            this.empty = true;
        }
        this.Collision = collision;
        this.x = x * this.width;
        this.y = y * this.height;
        this.texture = texture;

        if(render === true) {
            this.render();
        }

    };

    Tile.prototype.render = function() {
        // On définit les coordonnées de la Tile
        "use strict";

        this.texture.x = 0;
        this.texture.y = 0;

        var _x = 0;
        var _y = 0;
        var width = this.width;
        var height = this.height;

        var container = this;

        this.addChild(this.texture);

        this.texture.on("mouseover", function(evt) {
            var shape = new createjs.Shape();
            shape.name = "contour";
            shape.graphics.beginStroke("#ffffff");
            shape.graphics.setStrokeStyle(2); // 2 pixel
            shape.graphics.drawRect(_x,_y,width,height); // Change size as-needed
            container.addChild(shape); // Add the shape to the same container as
        });

        this.texture.on("mouseout", function(evt) {
            container.removeChild(container.getChildByName("contour"));
        });

        this.texture.on("click", function(evt) {
            console.log('Click sur une texture x=' + evt.stageX + " y=" + evt.stageY);
            console.log('Click sur une texture dans container x=' + container.x + " y=" + container.y);
            console.log('Click sur une texture dans container de name ->' + container.name);
            /*var idUnit = nextUnitID;
            if(units[idUnit] !== null) {
                ContentManager.newUnit(Math.floor(evt.stageX / ContentManager.tileswidth), Math.floor(evt.stageY / ContentManager.tilesheight), units[idUnit].name, units[idUnit].taille);
                nextUnitID++;
                console.log(evt.stageX + " " + evt.stageY);
                console.log(evt.stageX + " " + evt.stageY);
            }*/
        });

        this.x = this.x;
        this.y = this.y;
        this.regX = 0;
        this.regY = 0;

        this.visible = true;
        this.name = "x ->" + _x+ "y ->" + _y + "  et le container x -> " + this.x + "  Y -> " + this.y;

        console.log('container.x=' + this.x + "  container.y=" + this.y);
        console.log('texture.x=' + this.texture.x + "  texture.y=" + this.texture.y);

        console.log(this.texture.isVisible());
        stage.addChild(this);
    };

    Tile.prototype.width = 32;
    Tile.prototype.height = 32;

    window.Tile = Tile;
} (window));