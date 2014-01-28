function Enum() { }
Enum.TileCollision = { Passable: 0, Impassable: 1 };

(function (window) {
    function Tile(texture, collision, x, y, render) {
        "use strict";
        this.initialize(texture, collision, x, y, render);
    }

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

        // location in the matrix
        this.i = x;
        this.j = y;

        console.log('this.i' + this.i);

        // this container will hold all the animation of a Tile
        this._container = new createjs.Container();

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

        var container = this._container;

        this.shape = new createjs.Shape();
        this.shape.name = "contour";
        this.shape.graphics.beginStroke("#ffffff");
        this.shape.graphics.setStrokeStyle(2); // 2 pixel
        this.shape.graphics.drawRect(_x,_y,width,height); // Change size as-needed
        this.shape.visible = false;

        this._container.addChild(this.texture);
        this._container.addChild(this.shape);

        var shape = this.shape;

        this._container.on("mouseover", function(evt) {
            shape.visible = true;
        });

        this._container.on("mouseout", function(evt) {
            shape.visible = false;
        });

        var _i = this.i;
        var _j = this.j;

        this._container.on("click", function(evt, data) {
            if(data.collision == Enum.TileCollision.Passable && _i < (map.gameWidth / 3)) {
                console.log("[TILE] x" + _i + " y" + _j);
                var idUnit = $("#myUnits a.active").attr("data-unit");

                if(units[idUnit] != null) {
                    if(units[idUnit].statut == 0) {
                        ContentManager.newUnit(_i,_j, units[idUnit].sprite, units[idUnit].taille, idUnit);
                        nextUnitID++;
                    }
                    else
                        console.log("Cette unité ne peut être placée");
                }
                else
                    console.log("Il n'y a plus de personnages à placer");
            }
            else
                console.log("Vous ne pouvez pas placer votre personnage à cet endroit.");
        }, null, false, { collision: this.Collision });

        this._container.x = this.x;
        this._container.y = this.y;
        this._container.regX = 0;
        this._container.regY = 0;

        this.visible = true;

        //stage.addChild(this._container);
        substage.addChild(this._container);
    };

    Tile.prototype.width = 32;
    Tile.prototype.height = 32;

    window.Tile = Tile;
} (window));