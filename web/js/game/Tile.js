function Enum() { }
Enum.TileCollision = { Passable: 0, Impassable: 1 };

(function (window) {
    function Tile(texture, collision, x, y, render) {
        this.initialize(texture, collision,x,y, render);
    }

    Tile.prototype.initialize = function(texture, collision, x, y, render) {
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
        this.texture.x = this.x;
        this.texture.y = this.y;

        var x = this.x;
        var y = this.y;
        var width = this.width;
        var height = this.height;

        this.texture.on("mouseover", function(evt) {
            var shape = new createjs.Shape();
            shape.name = "contour";
            shape.graphics.beginStroke("#ffffff");
            shape.graphics.setStrokeStyle(2); // 2 pixel
            shape.graphics.drawRect(x,y,width,height); // Change size as-needed
            stage.addChild(shape); // Add the shape to the same container as
        });

        this.texture.on("mouseout", function(evt) {
            stage.removeChild(stage.getChildByName("contour"));
        });

        this.texture.on("click", function(evt) {
            var idUnit = nextUnitID;
            if(units[idUnit] != null) {
                ContentManager.newUnit(Math.floor(evt.stageX / ContentManager.tileswidth), Math.floor(evt.stageY / ContentManager.tilesheight), units[idUnit].name, units[idUnit].taille);
                nextUnitID++;
            }
        });

        stage.addChild(this.texture);
    };

    Tile.prototype.width = 32;
    Tile.prototype.height = 32;

    window.Tile = Tile;
} (window));