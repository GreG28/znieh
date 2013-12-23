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
    function Unit(imgUnit, map, position) {
        this.initialize(imgUnit, map, position);
    }

    Unit.prototype = new createjs.Bitmap();
    Unit.prototype.IsAlive = true;
    Unit.prototype.IsOnGround = true;

    Unit.prototype.initialize = function (imgUnit, map, position) {
        var width;
        var left;
        var height;
        var top;
        var frameWidth;
        var frameHeight;

        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgUnit], //image to use
            frames: {width: 32, height: 32, regX: 16, regY: 16},
            animations: {
                right: [8, 11, "walk", 0.2],
                top: [32, 39, false, 0.2],
                bottom: [56, 59, false, 0.2],
                idle: [0, 0, "idle"]
            }
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
        width = parseInt(frameWidth * 0.4);
        left = parseInt((frameWidth - width) / 2);
        height = parseInt(frameWidth * 0.8);
        top = parseInt(frameHeight - height);
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
    Unit.prototype.Reset = function (position) {
        this.sprite.x = position.x;
        this.sprite.y = position.y;
        this.velocity = new createjs.Point(0, 0);
        this.IsAlive = true;
        this.sprite.gotoAndPlay("idle");
        stage.addChild(this.sprite);
        stage.update();
    };

    /// <summary>
    /// Gets a rectangle which bounds this player in world space.
    /// </summary>
    Unit.prototype.BoundingRectangle = function () {
        var left = parseInt(Math.round(this.x - 32) + this.localBounds.x);
        var top = parseInt(Math.round(this.y - 64) + this.localBounds.y);

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
        // It not possible to have a predictable tick/update time
        // requestAnimationFrame could help but is currently not widely and properly supported by browsers
        // this.elapsed = (Ticker.getTime() - this.lastUpdate) / 1000;
        // We're then forcing/simulating a perfect world
        this.elapsed = globalTargetFPS / 1000;

        //this.ApplyPhysics();

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
    /// Updates the player's velocity and position based on input, gravity, etc.
    /// </summary>
    Unit.prototype.ApplyPhysics = function () {
        if (this.IsAlive && !this.HasReachedExit) {
            var previousPosition = new Point(this.x, this.y);

            // Base velocity is a combination of horizontal movement control and
            // acceleration downward due to gravity.
            this.velocity.x += this.direction * MoveAcceleration * this.elapsed;
            this.velocity.y = Math.clamp(this.velocity.y + GravityAcceleration * this.elapsed, -MaxFallSpeed, MaxFallSpeed);

            this.velocity.y = this.DoJump(this.velocity.y);

            // Apply pseudo-drag horizontally.
            if (this.IsOnGround) {
                this.velocity.x *= GroundDragFactor;
            }
            else {
                this.velocity.x *= AirDragFactor;
            }

            // Prevent the player from running faster than his top speed.
            this.velocity.x = Math.clamp(this.velocity.x, -MaxMoveSpeed, MaxMoveSpeed);

            this.x += this.velocity.x * this.elapsed;
            this.y += this.velocity.y * this.elapsed;
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);

            // If the player is now colliding with the level, separate them.
            this.HandleCollisions();

            // If the collision stopped us from moving, reset the velocity to zero.
            if (this.x === previousPosition.x) {
                this.velocity.x = 0;
            }

            if (this.y === previousPosition.y) {
                this.velocity.y = 0;
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


    /// <summary>
    /// Called when the player has been killed.
    /// </summary>
    /// <param name="killedBy">
    /// The enemy who killed the Unit. This parameter is null if the player was
    /// not killed by an enemy (fell into a hole).
    /// </param>
    Unit.prototype.OnKilled = function (killedBy) {
        /*this.IsAlive = false;
        this.velocity = new Point(0, 0);

        // Playing the proper animation based on
        // the current direction of our hero
        if (this.direction === 1) {
            this.sprite.gotoAndPlay("die_h");
        }
        else {
            this.sprite.gotoAndPlay("die");
        }

        if (killedBy !== null && killedBy !== undefined) {
            this.level.levelContentManager.playerKilled.play();
        }
        else {
            this.level.levelContentManager.playerFall.play();
        }*/
    };

    window.Unit = Unit;
} (window));