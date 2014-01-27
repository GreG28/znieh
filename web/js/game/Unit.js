

(function (window) {
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
    function Unit(imgUnit, map, position, unitsInfos, taille) {
        "use strict";
        //alert(JSON.stringify(unitsInfos, null, 4));
        this.initialize(imgUnit, map, position, unitsInfos, taille);
    }

    Unit.prototype.IsAlive = true;
    Unit.prototype.IsOnGround = true;

    Unit.prototype.initialize = function (imgUnit, map, position, unitsInfos, taille) {

        "use strict";

        var width = unitsInfos.specifications[taille].sprites.frames.width;
        var left = unitsInfos.specifications[taille].sprites.weapon.left;
        var height = unitsInfos.specifications[taille].sprites.frames.height;
        var top = unitsInfos.specifications[taille].sprites.weapon.top;
        var regX = unitsInfos.specifications[taille].sprites.frames.regX;
        var regY = unitsInfos.specifications[taille].sprites.frames.regY;

        var frameWidth;
        var frameHeight;

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

        frameWidth = localSpriteSheet.getFrame(0).rect.width;
        frameHeight = localSpriteSheet.getFrame(0).rect.height;

        // Calculate bounds within texture size.
        width = parseInt(frameWidth * 0.4,10);
        left = parseInt((frameWidth - width) / 2,10);
        height = parseInt(frameWidth * 0.8,10);
        top = parseInt(frameHeight - height,10);
        this.localBounds = new XNARectangle(left, top, width, height);

        this.sprite_base.name = "Hero";
        this.unitID = ContentManager.getNextUnitID();

        // 1 = right & -1 = left & 0 = idle
        this.sprite_base.direction = 0;

        // starting directly at the first frame of the walk_right sequence
        this.sprite_base.currentFrame = 8;

        this._container = new createjs.Container();

        this.Reset(position);

    };

    /// <summary>
    /// Resets the player to life.
    /// </summary>
    /// <param name="position">The position to come to life at.</param>
    Unit.prototype.Reset = function (position) {
        "use strict";

        this.sprite_base.x = 0;
        this.sprite_base.y = 0;
        this.velocity = new createjs.Point(0, 0);
        this.IsAlive = true;
        this.sprite_base.gotoAndPlay("move-idle");

        var _x = 0;
        var _y = 0;
        var width = this.width;
        var height = this.height;

        var unitID = this.unitID;
        var container = this._container;

        this.shape = new createjs.Shape();
        this.shape.name = "contour";
        this.shape.graphics.beginStroke("##000000");
        this.shape.graphics.setStrokeStyle(2); // 2 pixel
        this.shape.graphics.drawRect((_x - 16), (_y - 16), 32, 32); // Change size as-needed
        this.shape.visible = false;

        this._container.addChild(this.shape);
        this._container.addChild(this.sprite_base);

        var shape = this.shape;
        this._container.on("mouseover", function(evt) {
            shape.visible = true;
        });

        this._container.on("mouseout", function(evt) {
            shape.visible = false;
        });

        this._container.on("click", function(evt) {
            console.log("[UNIT] x" + container.x + " y" + container.y);
        });

        this._container.x = position.x;
        this._container.y = position.y;
        this._container.width = this.sprite_base.width;
        this._container.height = this.sprite_base.height;
        this._container.visible = true;

        stage.addChild(this._container);
    };

    /// <summary>
    /// Gets a rectangle which bounds this player in world space.
    /// </summary>
    Unit.prototype.BoundingRectangle = function () {
        var left = parseInt(Math.round(this.x - 32) + this.localBounds.x,10);
        var top = parseInt(Math.round(this.y - 64) + this.localBounds.y,10);

        return new XNARectangle(left, top, this.localBounds.width, this.localBounds.height);
    };

    /// <summary>
    /// Handles input, performs physics, and animates the player sprite.
    /// </summary>
    /// <remarks>
    /// We pass in all of the input states so that our game is only polling the hardware
    /// once per frame. We also pass the game's orientation because when using the accelerometer,
    /// we need to reverse our motion when the orientation is in the LandscapeRight orientation.
    /// </remarks>
    Unit.prototype.tick = function () {
        "use strict";

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

    /// <summary>
    /// Detects and resolves all collisions between the player and his neighboring
    /// tiles. When a collision is detected, the player is pushed away along one
    /// axis to prevent overlapping. There is some special logic for the Y axis to
    /// handle platforms which behave differently depending on direction of movement.
    /// </summary>
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