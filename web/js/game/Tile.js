function Enum() { }
Enum.TileCollision = { Passable: 0, Impassable: 1 };

(function (window) {
    "use strict";

    function Tile(texture, collision, x, y, render) {
        this.initialize(texture, collision, x, y, render);
    }

    /**
     * Initialize the Tile with its proprierties
     * @param  {createjs.Sprite} texture
     * @param  {int} collision
     * @param  {int} x
     * @param  {int} y
     * @param  {boolean} render
     */
    Tile.prototype.initialize = function(texture, collision, x, y, render) {

        if (texture != null) {
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

        //console.log('this.i' + this.i);

        // this container will hold all the animation of a Tile
        this._container = new createjs.Container();

        if(render == true) {
            this.render();
        }
    };

    /**
     * Render the Tile and handle actions
     */
    Tile.prototype.render = function() {
        // On définit les coordonnées de la Tile

        this.texture.x = 0;
        this.texture.y = 0;

        var _x = 0;
        var _y = 0;
        var width = this.width;
        var height = this.height;

        var container = this._container;

        this.shape_hover = new createjs.Shape();
        this.shape_hover.name = "contour";
        this.shape_hover.graphics.beginStroke("#ffffff");
        this.shape_hover.graphics.setStrokeStyle(2); // 2 pixel
        this.shape_hover.graphics.drawRect(_x,_y,width,height); // Change size as-needed
        this.shape_hover.visible = false;

        this.shape_selection_possible = new createjs.Shape();
        this.shape_selection_possible.name = "contour_selection_possible";
        this.shape_selection_possible.graphics.beginStroke("#00af00");
        this.shape_selection_possible.graphics.setStrokeStyle(2); // 2 pixel
        this.shape_selection_possible.graphics.drawRect(_x,_y,width - 2,height - 2); // Change size as-needed
        this.shape_selection_possible.visible = false;

        this.shape_selection_impossible = new createjs.Shape();
        this.shape_selection_impossible.name = "contour_selection_impossible";
        this.shape_selection_impossible.graphics.beginStroke("#cc231e");
        this.shape_selection_impossible.graphics.setStrokeStyle(2); // 2 pixel
        this.shape_selection_impossible.graphics.drawRect(_x,_y,width - 2,height - 2); // Change size as-needed
        this.shape_selection_impossible.visible = false;

        this._container.addChild(this.texture);
        this._container.addChild(this.shape_hover);
        this._container.addChild(this.shape_selection_possible);
        this._container.addChild(this.shape_selection_impossible);

        var shape_hover = this.shape_hover;
        var shape_selection_possible = this.shape_selection_possible;
        var shape_selection_impossible = this.shape_selection_impossible;

        var self = this;
        this._container.on("mouseover", function(evt) {
            shape_hover.visible = true;

       });

        this._container.on("mouseout", function(evt) {
            shape_hover.visible = false;
        });

        var _i = this.i;
        var _j = this.j;
        var that = this;

        this._container.on("click", function(evt, data) {
            console.log(gameStatut);
            if(gameStatut == GameStatut.PLACEMENT)
            {
                setEnnemySide();
                if(data.collision == Enum.TileCollision.Passable && ((_i < (map.gameWidth / 3) && ContentManager.left == true) || ((_i >= (2 * map.gameWidth / 3)) && ContentManager.left == false))) {
                    console.log("[TILE] x" + _i + " y" + _j);
                    var idUnit = $("#myUnits div.selected").attr("data-unit");

                    if(units[idUnit] != null) {
                        if(units[idUnit].statut == 0) {
                            
                            // TODO
                            socket.emit('placement-unit', {id:idUnit,i:_i,j:_j}, function(data) {
                                console.log("placement unit -> " + data);
                                ContentManager.newUnit(_i,_j, units[idUnit].sprite, units[idUnit].taille, idUnit, true, units[idUnit].name);

                                // TODO
                                nextUnitID++;
                                
                                if(ContentManager.units.length == numberOfUnits) {
                                    gameStatut = GameStatut.MOVE;
                                    // TODO !!
                                    //gameStatut = GameStatut.IDLE;
                                    ContentManager.clearUnitsMenu();
                                    socket.emit('placement-finished', null, function(data) {
                                        console.log("placement finished -> " + data);

                                        // TODO
                                        // Watch the ennemies on the map !
                                    });
                                }
                            });
                        }
                    }
                    else {
                        gameStatut = GameStatut.IDLE;
                        console.log("Cette unité ne peut être placée");
                    }
                }
                else
                    console.log("Vous ne pouvez pas placer votre personnage à cet endroit.");
            }
            else if(gameStatut == GameStatut.MOVE && selectedUnit.IsMine ) {
                console.log("Unit -> move to this one");
                //selectedUnit = that;
                socket.emit('unit-move', {id:selectedUnit.idUnit,i:_i,j:_j}, function(data) {
                    console.log(data);
                    if(data == true)
                    {
                        console.log("tile on click -> begin to move unit");
                        selectedUnit.move(_i, _j);
                        console.log("tile on click -> finished to move unit");
                        gameStatut = GameStatut.ATTACK;
                    }
                    else
                    {
                        console.log("YOU ARE A LYER !!!");
                    }
                });
            }
            else if(gameStatut == GameStatut.ATTACK) {
                console.log("Il a choisi de ne pas attaquer");
                setEnnemySide();
                gameStatut = GameStatut.IDLE;
                ContentManager.unSelectAllTiles();
                ContentManager.clearUnitsMenu();
                selectedUnit = null;
            }
            else {
                console.log("Unit -> IDDLE");
                setEnnemySide();
                gameStatut = GameStatut.IDLE;
                ContentManager.unSelectAllTiles();
                ContentManager.clearUnitsMenu();
                selectedUnit = null;
            }
        }, null, false, { collision: this.Collision });

        this._container.x = this.x;
        this._container.y = this.y;
        this._container.regX = 0;
        this._container.regY = 0;

        this.visible = true;

        substage.addChild(this._container);
    };

    Tile.prototype.width = 32;
    Tile.prototype.height = 32;

    window.Tile = Tile;
} (window));