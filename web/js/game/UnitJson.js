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
    function UnitJson(imgUnit, map, position,unitsInfos) {
        //alert(JSON.stringify(unitsInfos, null, 4));
        this.initialize(imgUnit, map, position, unitsInfos);
    }

    UnitJson.prototype = new createjs.Bitmap();
    UnitJson.prototype.IsAlive = true;
    UnitJson.prototype.IsOnGround = true;

    UnitJson.prototype.initialize = function (imgUnit, map, position, unitsInfos) {
        
        var width = unitsInfos.specifications[taille_sprite].sprites.frames.width;
        var left = unitsInfos.specifications[taille_sprite].sprites.weapon.left;
        var height = unitsInfos.specifications[taille_sprite].sprites.frames.height;
        var top = unitsInfos.specifications[taille_sprite].sprites.weapon.top;
        var regX = unitsInfos.specifications[taille_sprite].sprites.frames.regX;
        var regY = unitsInfos.specifications[taille_sprite].sprites.frames.regY;
        
        var frameWidth;
        var frameHeight;

        
        // This part is disgusting but we can change it later !
        var tmp_path_to_animations = unitsInfos.animations;

        var animations = {};
        
        var tmp_path_to_move = tmp_path_to_animations.move;
        
        var tab_move_idle = [];
        tab_move_idle.push(tmp_path_to_move.idle.start);
        tab_move_idle.push(tmp_path_to_move.idle.end);
        tab_move_idle.push("move-" + tmp_path_to_move.idle.name);
        tab_move_idle.push(tmp_path_to_move.idle.velocity);

        var tab_move_right = [];
        tab_move_right.push(tmp_path_to_move.right.start);
        tab_move_right.push(tmp_path_to_move.right.end);
        tab_move_right.push("move-" + tmp_path_to_move.right.name);
        tab_move_right.push(tmp_path_to_move.right.velocity);

        var tab_move_top = [];
        tab_move_top.push(tmp_path_to_move.top.start);
        tab_move_top.push(tmp_path_to_move.top.end);
        tab_move_top.push("move-" + tmp_path_to_move.top.name);
        tab_move_top.push(tmp_path_to_move.top.velocity);

        var tab_move_bottom = [];
        tab_move_bottom.push(tmp_path_to_move.bottom.start);
        tab_move_bottom.push(tmp_path_to_move.bottom.end);
        tab_move_bottom.push("move-" + tmp_path_to_move.bottom.name);
        tab_move_bottom.push(tmp_path_to_move.bottom.velocity);

        animations["move-idle"] = tab_move_idle;
        animations["move-right"] = tab_move_right;
        animations["move-top"] = tab_move_top;
        animations["move-bottom"] = tab_move_bottom;


        var tmp_path_to_attack = tmp_path_to_animations.attack;
        
        var tab_attack_right = [];
        tab_attack_right.push(tmp_path_to_attack.right.start);
        tab_attack_right.push(tmp_path_to_attack.right.end);
        tab_attack_right.push("attack-" + tmp_path_to_attack.right.name);
        tab_attack_right.push(tmp_path_to_attack.right.velocity);

        var tab_attack_top = [];
        tab_attack_top.push(tmp_path_to_attack.top.start);
        tab_attack_top.push(tmp_path_to_attack.top.end);
        tab_attack_top.push("attack-" + tmp_path_to_attack.top.name);
        tab_attack_top.push(tmp_path_to_attack.top.velocity);

        var tab_attack_bottom = [];
        tab_attack_bottom.push(tmp_path_to_attack.bottom.start);
        tab_attack_bottom.push(tmp_path_to_attack.bottom.end);
        tab_attack_bottom.push("attack-" + tmp_path_to_attack.bottom.name);
        tab_attack_bottom.push(tmp_path_to_attack.bottom.velocity);

        animations["attack-idle"] = tab_move_idle;
        animations["attack-right"] = tab_move_right;
        animations["attack-top"] = tab_move_top;

        //alert(JSON.stringify(animations, null, 4));

        /* End of configuration of the animations */

        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgUnit], //image to use
            frames: {width: width, height: height, regX: regX, regY: regY},
            animations: animations
        });


        this.sprite = new createjs.Sprite(localSpriteSheet);

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

        this.sprite.name = "Hero";

        // 1 = right & -1 = left & 0 = idle
        this.sprite.direction = 0;

        // starting directly at the first frame of the walk_right sequence
        this.sprite.currentFrame = 8;

        this.Reset(position);
    };

    /// <summary>
    /// Resets the player to life.
    /// </summary>
    /// <param name="position">The position to come to life at.</param>
    UnitJson.prototype.Reset = function (position) {
        this.sprite.x = position.x;
        this.sprite.y = position.y;
        this.velocity = new createjs.Point(0, 0);
        this.IsAlive = true;
        this.sprite.gotoAndPlay("move-right");
        stage.addChild(this.sprite);
        stage.update();
    };

    /// <summary>
    /// Gets a rectangle which bounds this player in world space.
    /// </summary>
    UnitJson.prototype.BoundingRectangle = function () {
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
    UnitJson.prototype.tick = function () {
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
                    this.sprite.gotoAndPlay("walk");
                }
                if (this.currentAnimation.indexOf("walk_h") === -1 && this.direction === 1) {
                    this.sprite.gotoAndPlay("walk_h");
                }
            }
            else {
                if (this.currentAnimation.indexOf("idle") === -1 && this.direction === 0) {
                    this.sprite.gotoAndPlay("idle");
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
    UnitJson.prototype.HandleCollisions = function () {
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

    window.UnitJson = UnitJson;
} (window));