function Enum() { }
Enum.TileCollision = { Passable: 0, Impassable: 1 };

var _x;
var _y;

(function (window) {
    function Tile(texture, collision, x, y, render) {
        "use strict";
        this.initialize(texture, collision,x,y, render);
        //console.log('x=' + x + "  y=" + y);
    }

    //Tile.prototype = new createjs.Bitmap();
    //Tile.prototype = new createjs.Container();
    Tile.prototype._container = new createjs.Container();

    Tile.prototype.initialize = function(texture, collision, x, y, render) {
        "use strict";

        _x = x;
        _y = y;

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

        var x = 0;
        var y = 0;
        var width = this.width;
        var height = this.height;

        var container = this._container;

        this._container.addChild(this.texture);

        this.texture.on("mouseover", function(evt) {
            var shape = new createjs.Shape();
            shape.name = "contour";
            shape.graphics.beginStroke("#ffffff");
            shape.graphics.setStrokeStyle(2); // 2 pixel
            shape.graphics.drawRect(x,y,width,height); // Change size as-needed
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

        this._container.x = this.x;
        this._container.y = this.y;
        this._container.visible = true;
        this._container.name = "x ->" + _x+ "y ->" + _y + "  et le container x -> " + this._container.x + "  Y -> " + this._container.y;

        console.log('this.x=' + this.x + "  this.y=" + this.y);
        console.log('container.x=' + this._container.x + "  container.y=" + this._container.y);
        
        stage.addChild(this._container);
    };

    Tile.prototype.width = 32;
    Tile.prototype.height = 32;

    window.Tile = Tile;
} (window));