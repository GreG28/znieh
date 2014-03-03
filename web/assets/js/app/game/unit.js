/**
* Module loaded on the game page
*/
define(['jquery', 'app/game/enum', 'app/game/tile'], function ($, Enum, Tile) {
    (function (window) {
        function Enum() { }
        Enum.TileCollision = { Passable: 0, Impassable: 1 };
         // Constants for controling horizontal movement
        var MoveAcceleration = 13000.0;
        var MaxMoveSpeed = 1750.0;
        var GroundDragFactor = 0.48;
        var AirDragFactor = 0.58;

        // Constants for controlling vertical movement
        var MaxJumpTime = 0.35;
        var JumpLaunchVelocity = -5000.0;
        var GravityAcceleration = 1800.0;
        var MaxFallSpeed = 550.0;
        var JumpControlPower = 0.14;

        var globalTargetFPS = 17;

        var StaticTile = new Tile(null, Enum.TileCollision.Passable, 0, 0);

        // imgUnit should be the PNG containing the sprite sequence
        // level must be of type Level
        // position must be of type Point
        function Unit(imgUnit, map, position, unitsInfos, taille, i, j) {
            this.initialize(imgUnit, map, position, unitsInfos, taille, i, j);
        }

        Unit.prototype.IsAlive = true;
        Unit.prototype.IsOnGround = true;

        /**
         * Initialize the Unit with its animations
         * @param  {Image} imgUnit
         * @param  {Map} map
         * @param  {Position} position
         * @param  {Array} unitsInfos
         * @param  {int} taille
         * @param  {int} i
         * @param  {int} j
         */
        Unit.prototype.initialize = function (imgUnit, map, position, unitsInfos, taille, i, j) {

            var width = unitsInfos.specifications[taille].sprites.frames.width;
            var left = unitsInfos.specifications[taille].sprites.weapon.left;
            var height = unitsInfos.specifications[taille].sprites.frames.height;
            var top = unitsInfos.specifications[taille].sprites.weapon.top;
            var regX = unitsInfos.specifications[taille].sprites.frames.regX;
            var regY = unitsInfos.specifications[taille].sprites.frames.regY;

            this.frameWidth = 0;
            this.frameHeight = 0;

            this._i = i;
            this._j = j;

            var animations = {};
            var animations_move = unitsInfos.animations.move;
            var animations_attack = unitsInfos.animations.attack;

            animations["move-idle"] = [animations_move.idle.start, animations_move.idle.end, "move-" + animations_move.idle.name, animations_move.idle.velocity];
            animations["move-right"] = [animations_move.right.start, animations_move.right.end, "move-" + animations_move.right.name, animations_move.right.velocity];
            animations["move-top"] = [animations_move.top.start, animations_move.top.end, "move-" + animations_move.top.name, animations_move.top.velocity];
            animations["move-bottom"] = [animations_move.bottom.start, animations_move.bottom.end, "move-" + animations_move.bottom.name, animations_move.bottom.velocity];

            animations["attack-right"] = [animations_attack.right.start, animations_attack.right.end, "attack-" + animations_attack.right.name, animations_attack.right.velocity];
            animations["attack-top"] = [animations_attack.top.start, animations_attack.top.end, "attack-" + animations_attack.top.name, animations_attack.top.velocity];
            animations["attack-bottom"] = [animations_attack.bottom.start, animations_attack.bottom.end, "attack-" + animations_attack.bottom.name, animations_attack.bottom.velocity];

            //alert(JSON.stringify(animations, null, 4));

            var localSpriteSheet = new createjs.SpriteSheet({
                images: [imgUnit], //image to use
                frames: {width: width, height: height, regX: regX, regY: regY},
                animations: animations
            });

            this.sprite_base = new createjs.Sprite(localSpriteSheet);

            this.width = width;
            this.height = height;

            this.map = map;
            this.position = position;
            this.velocity = new createjs.Point(0, 0);
            this.previousBottom = 0.0;

            this.elapsed = 0;

            this.frameWidth = localSpriteSheet.getFrame(0).rect.width;
            this.frameHeight = localSpriteSheet.getFrame(0).rect.height;

            // Calculate bounds within texture size.
            width = parseInt(this.frameWidth * 0.4,10);
            left = parseInt((this.frameWidth - width) / 2,10);
            height = parseInt(this.frameWidth * 0.8,10);
            top = parseInt(this.frameHeight - height,10);
            this.localBounds = new XNARectangle(left, top, width, height);

            this.sprite_base.name = "Hero";
            this.unitID = ContentManager.getNextUnitID();

            // 1 = right & -1 = left & 0 = idle
            this.sprite_base.direction = 0;

            // starting directly at the first frame of the walk_right sequence
            this.sprite_base.currentFrame = 8;

            this._container = new createjs.Container();

            substage.addChild(this._container);

            this.Reset(position);

        };

        /**
         * Reset an Unit, set proprierties and handle clicks
         * @param {Position} position
         */
        Unit.prototype.Reset = function (position) {

            this.sprite_base.x = 0;
            this.sprite_base.y = 0;
            this.velocity = new createjs.Point(0, 0);
            this.IsAlive = true;
            this.sprite_base.gotoAndPlay("move-idle");

            var _x = 0;
            var _y = 0;
            var width = this.width;
            var height = this.height;
            var frameWidth = this.frameWidth;
            var frameHeight = this.frameHeight;

            var unitID = this.unitID;
            var container = this._container;

            this.shape_hover = new createjs.Shape();
            this.shape_hover.name = "contour_hover";
            this.shape_hover.graphics.beginStroke("#000000");
            this.shape_hover.graphics.setStrokeStyle(2); // 2 pixel
            this.shape_hover.graphics.drawRect((_x - 16), (_y - 16), 32, 32 - 2); // Change size as-needed
            this.shape_hover.visible = false;

            this.shape_selected = new createjs.Shape();
            this.shape_selected.name = "contour_selected";
            this.shape_selected.graphics.beginStroke("#00af00");
            this.shape_selected.graphics.setStrokeStyle(2); // 2 pixel
            this.shape_selected.graphics.drawRect((_x - 16), (_y - 16), 32 - 2, 32 - 2); // Change size as-needed
            this.shape_selected.visible = false;

            this.shape_selected_unit = new createjs.Shape();
            this.shape_selected_unit.name = "contour_selected_unit";
            this.shape_selected_unit.graphics.beginStroke("#fd8900");
            this.shape_selected_unit.graphics.setStrokeStyle(2); // 2 pixel
            this.shape_selected_unit.graphics.drawRect((_x - 16), (_y - 16), 32 - 2, 32 - 2); // Change size as-needed
            this.shape_selected_unit.visible = false;

            this._container.addChild(this.shape_hover);
            this._container.addChild(this.shape_selected);
            this._container.addChild(this.shape_selected_unit);
            this._container.addChild(this.sprite_base);

            var shape_hover = this.shape_hover;
            var shape_selected = this.shape_selected;
            var shape_selected_unit = this.shape_selected_unit;

            this._container.on("mouseover", function(evt) {
                shape_hover.visible = true;

                // TODO : Ghost de l'unité qui suit la souris pendant le placement des unités
                // if(gameStatut == GameStatut.PLACEMENT) {
                //     selectedUnit = unitsCache[$("#myUnits div.selected").attr("data-unit")];
                //     if(selectedUnit != null) {
                //         selectedUnit._container.x = map.GetBounds(that._i, that._j).GetBottomCenter().x;
                //         selectedUnit._container.y = map.GetBounds(that._i, that._j).GetBottomCenter().y;
                //         console.log("On change");
                //         selectedUnit.sprite_base.gotoAndPlay("move-left"); //animate
                //     }
                // }

                setInfoSide(null);
            });

            this._container.on("mouseout", function(evt) {
                shape_hover.visible = false;

                if(selectedUnit == null)
                    setEnnemySide();
            });

            var i = this._i;
            var j = this._j;
            var that = this;

            this._container.on("click", function(evt) {
                console.log("[UNIT] x" + container.x + " y" + container.y);
                ContentManager.unSelectAllTiles();
                selectedUnit = that;
                setInfoSide(selectedUnit);

                that.getAllTilesStatut();

            });

            this._container.x = position.x;
            this._container.y = position.y;
            this._container.width = this.sprite_base.width;
            this._container.height = this.sprite_base.height;
            this._container.visible = true;

            //stage.addChild(this._container);
            substage.addChild(this._container);
        };

        Unit.prototype.move = function (x, y) {

            var origin_x = this._i;
            var origin_y = this._j;

            var limit = 7; // TODO : Sélectionner la limite de déplacement de l'unité
            var easystar = new EasyStar.js();
            var acceptableTiles = [ 1, 2];
            easystar.setGrid(map.textTiles);
            easystar.setAcceptableTiles(acceptableTiles);

            unitsPlacement.length = 0;
            for (var t = ContentManager.units.length - 1; t >= 0; t--) {
                unitsPlacement.push([ContentManager.units[t]._i, ContentManager.units[t]._j]);
                easystar.avoidAdditionalPoint(ContentManager.units[t]._i, ContentManager.units[t]._j);
            }

            self = this;
            easystar.findPath(self._i, self._j, x, y, function(path) {
                if(path.length <= limit) {
                    var filtered_new = $(unitsPlacement).filter(function(){
                        return x == this[0] && y == this[1];
                    });

                    if(filtered_new.length == 0) {
                        self._container.x = map.GetBounds(x, y).GetBottomCenter().x;
                        self._container.y = map.GetBounds(x, y).GetBottomCenter().y;
                        self._i = x;
                        self._j = y;

                        self.shape_hover.graphics.drawRect((-16), (-16), 32, 32 - 2); // Change size as-needed
                        self.shape_selected.graphics.drawRect((-16), (-16), 32 - 2, 32 - 2); // Change size as-needed
                        self.shape_selected_unit.graphics.drawRect((-16), (-16), 32 - 2, 32 - 2); // Change size as-needed

                        self._container.removeAllChildren();
                        self._container.addChild(self.shape_hover);
                        self._container.addChild(self.shape_selected);
                        self._container.addChild(self.shape_selected_unit);
                        self._container.addChild(self.sprite_base);

                        var placement = [origin_x, origin_y];
                        var filtered = $(unitsPlacement).filter(function(){
                            return placement[0] == this[0] && placement[1] == this[1];
                        });

                        if(filtered.length > 0){
                            map.tiles[origin_y][origin_x].shape_hover.visible = false; // Change size as-needed
                            map.tiles[origin_y][origin_x].shape_selection_possible.visible = false; // Change size as-needed
                            map.tiles[origin_y][origin_x].shape_selection_impossible.visible = false; // Change size as-needed
                        }

                        self.sprite_base.gotoAndPlay("move-left"); //animate
                    }
                    else console.log("Une unité est déjà sur la case.");
                }
                else console.log("Cette unité ne peut pas se déplacer aussi loin.");
            });
            easystar.calculate();

            ContentManager.unSelectAllTiles();
            ContentManager.clearUnitsMenu();
            setEnnemySide();
        };

        Unit.prototype.getAllTilesStatut = function () {
            if(gameStatut != GameStatut.PLACEMENT) {
                ContentManager.clearUnitsMenu();
            }

            var limit = 7; // TODO : Sélectionner la limite de déplacement de l'unité
            var easystar = new EasyStar.js();
            var acceptableTiles = [ 1, 2];
            easystar.setGrid(map.textTiles);
            easystar.setAcceptableTiles(acceptableTiles);

            unitsPlacement.length = 0;
            for (var t = ContentManager.units.length - 1; t >= 0; t--) {
                unitsPlacement.push([ContentManager.units[t]._i, ContentManager.units[t]._j]);
                easystar.avoidAdditionalPoint(ContentManager.units[t]._i, ContentManager.units[t]._j);
            }

            if(gameStatut == GameStatut.IDLE || gameStatut == GameStatut.MOVE) {
                $("#unit-" + (this.unitID - units.length - 1)).addClass("selected");

                for (var x = 0; x < map.textTiles.length; x++) {
                    for (var y = 0; y < map.textTiles[0].length; y++) {
                        //console.log("[x" + i + ", y" + j + "] - [x" + x + ", y" + y + "]");

                        var self = this;
                        easystar.findPath(this._i, this._j, x, y, function(path) {
                            var shape = null;
                            if (path === null) {
                                shape = map.tiles[y][x].shape_selection_impossible;
                                shape.visible = true;
                            } else {
                                if(path.length <= limit) {
                                    var placement = [x, y];
                                    var filtered = $(unitsPlacement).filter(function(){
                                        return placement[0] == this[0] && placement[1] == this[1];
                                    });

                                    if(filtered.length > 0){
                                        shape = map.tiles[y][x].shape_selection_impossible;
                                        shape.visible = true;
                                    }
                                    else {
                                        shape = map.tiles[y][x].shape_selection_possible;
                                        shape.visible = true;
                                    }

                                    shape = self.shape_selected_unit;
                                    shape.visible = true;
                                }
                                else{
                                    shape = map.tiles[y][x].shape_selection_impossible;
                                    shape.visible = true;
                                }
                            }
                        });
                        easystar.calculate();
                    }
                }
            }

            if(gameStatut == GameStatut.IDLE) {
                gameStatut = GameStatut.MOVE;
            }
            else {
                gameStatut = GameStatut.IDLE;
            }


        };

        /**
         * Gets a rectangle around the Unit
         */
        Unit.prototype.BoundingRectangle = function () {
            var left = parseInt(Math.round(this.x - 32) + this.localBounds.x,10);
            var top = parseInt(Math.round(this.y - 64) + this.localBounds.y,10);

            return new XNARectangle(left, top, this.localBounds.width, this.localBounds.height);
        };

        /**
         * TODO
         * Handles input, performs physics and animates the Unit sprite
         */
        Unit.prototype.tick = function () {

            // It not possible to have a predictable tick/update time
            // requestAnimationFrame could help but is currently not widely and properly supported by browsers
            // this.elapsed = (Ticker.getTime() - this.lastUpdate) / 1000;
            // We're then forcing/simulating a perfect world
            this.elapsed = globalTargetFPS / 1000;

            //this.ApplyPhysics();
            this.HandleCollisions();


            if (this.IsAlive && this.IsOnGround) {
                if (Math.abs(this.velocity.x) - 0.02 > 0) {
                    // Checking if we're not already playing the animation
                    if (this.currentAnimation.indexOf("walk") === -1 && this.direction === -1) {
                        this.sprite_base.gotoAndPlay("walk");
                    }
                    if (this.currentAnimation.indexOf("walk_h") === -1 && this.direction === 1) {
                        this.sprite_base.gotoAndPlay("walk_h");
                    }
                }
                else {
                    if (this.currentAnimation.indexOf("idle") === -1 && this.direction === 0) {
                        this.sprite_base.gotoAndPlay("idle");
                    }
                }
            }

        };

        /**
         * TODO
         * Detects and resolves all collisions between the player and his neighboring tiles. When a collision is detected, the player is pushed away along one axis to prevent overlapping. There is some special logic for the Y axis to handle platforms which behave differently depending on direction of movement.
         */
        Unit.prototype.HandleCollisions = function () {
            var bounds = this.BoundingRectangle();
            var leftTile = Math.floor(bounds.Left() / StaticTile.Width);
            var rightTile = Math.ceil((bounds.Right() / StaticTile.Width)) - 1;
            var topTile = Math.floor(bounds.Top() / StaticTile.Height);
            var bottomTile = Math.ceil((bounds.Bottom() / StaticTile.Height)) - 1;

            // Reset flag to search for ground collision.
            this.IsOnGround = false;

            // For each potentially colliding tile,
            for (var y = topTile; y <= bottomTile; ++y) {
                for (var x = leftTile; x <= rightTile; ++x) {
                    // If this tile is collidable,
                    var collision = this.level.GetCollision(x, y);
                    if (collision !== Enum.TileCollision.Passable) {
                        // Determine collision depth (with direction) and magnitude.
                        var tileBounds = this.level.GetBounds(x, y);
                        var depth = bounds.GetIntersectionDepth(tileBounds);
                        if (depth.x !== 0 && depth.y !== 0) {
                            var absDepthX = Math.abs(depth.x);
                            var absDepthY = Math.abs(depth.y);

                            // Resolve the collision along the shallow axis.
                            if (absDepthY < absDepthX || collision == Enum.TileCollision.Platform) {
                                // If we crossed the top of a tile, we are on the ground.
                                if (this.previousBottom <= tileBounds.Top()) {
                                    this.IsOnGround = true;
                                }

                                // Ignore platforms, unless we are on the ground.
                                if (collision == Enum.TileCollision.Impassable || this.IsOnGround) {
                                    // Resolve the collision along the Y axis.
                                    this.y = this.y + depth.y;

                                    // Perform further collisions with the new bounds.
                                    bounds = this.BoundingRectangle();
                                }
                            }
                            else if (collision == Enum.TileCollision.Impassable) // Ignore platforms.
                            {
                                // Resolve the collision along the X axis.
                                this.x = this.x + depth.x;

                                // Perform further collisions with the new bounds.
                                bounds = this.BoundingRectangle();
                            }
                        }
                    }
                }
            }

            // Save the new bounds bottom.
            this.previousBottom = bounds.Bottom();
        };

        window.Unit = Unit;
    } (window));
});
