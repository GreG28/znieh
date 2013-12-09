Array.matrix = function (m, n, initial) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i += 1) {
        a = [];
        for (j = 0; j < n; j += 1) {
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat;
};


(function (window) {

    var mapData = [4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 4, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 4, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 4, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 4, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    function Map() {
        /*this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        // Entities in the level.
        this.Hero = null;
        // Key locations in the level.
        this.Start = null;
        // Creating a random background based on the 3 layers available in 3 versions
        this.CreateAndAddRandomBackground();*/
        // Building a matrix of characters that will be replaced by the level {x}.txt
        this.textTiles = Array.matrix(15, 15, "|");
        // Physical structure of the level.
        this.tiles = Array.matrix(15, 15, "|");
        this.LoadTiles(mapData);
    };

    Map.prototype.ParseLevelLines = function (mapData) {
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                this.textTiles[i][j] = mapData[(i * 15) + j];
            }
        }
    };

    Map.prototype.LoadTiles = function (mapData) {
        this.ParseLevelLines(mapData); // Doit récupérer les chiffres indiquant les sprites à partir du JSON et les foutre dans textTiles

        // Loop over every tile position,
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                this.tiles[i][j] = this.LoadTile(this.textTiles[i][j], j, i);
            }
        }

        stage.update();
        /*
        // Verify that the level has a beginning and an end.
        if (this.Hero == null) {
            throw "A level must have a starting point.";
        }
        */
    };


    Map.prototype.LoadTile = function (tileType, x, y) {
        switch (tileType) {

            // Arbre
            case 1:
                return new Tile(this.loadTileImg(1), Enum.TileCollision.Passable, x, y);
                break;
            // Eau
            case 2:
                return new Tile(this.loadTileImg(2), Enum.TileCollision.Passable, x, y);
                break;
            // Roche
            case 3:
                return new Tile(this.loadTileImg(3), Enum.TileCollision.Impassable, x, y);
                break;
            // Plaine
            case 4:
                return new Tile(this.loadTileImg(4), Enum.TileCollision.Passable, x, y);
                break;

            /*
            // Blank space
            case '.':
                return new Tile(null, Enum.TileCollision.Passable, x, y);
                break;

            // Exit
            case 'X':
                return this.LoadExitTile(x, y);
                break;

            // Gem
            case 'G':
                return this.LoadGemTile(x, y);
                break;

            // Floating platform
            case '-':
                return this.LoadNamedTile("Platform", Enum.TileCollision.Platform, x, y);
                break;

            // Various enemies
            case 'A':
                return this.LoadEnemyTile(x, y, "MonsterA");
                break;

            case 'B':
                return this.LoadEnemyTile(x, y, "MonsterB");
                break;

            case 'C':
                return this.LoadEnemyTile(x, y, "MonsterC");
                break;

            case 'D':
                return this.LoadEnemyTile(x, y, "MonsterD");
                break;

            // Platform block
            case '~':
                return this.LoadVarietyTile("BlockB", 2, Enum.TileCollision.Platform, x, y);
                break;

            // Passable block
            case ':':
                return this.LoadVarietyTile("BlockB", 2, Enum.TileCollision.Passable, x, y);
                break;

            // Player 1 start point
            case '1':
                return this.LoadStartTile(x, y);
                break;

            // Impassable block
            case '#':
                return this.LoadVarietyTile("BlockA", 7, Enum.TileCollision.Impassable, x, y);
                break;

            */

        }
    };

    Map.prototype.loadTileImg = function (idTile) {
        var cellBitmap = new createjs.Sprite(tilesetSheet);
        cellBitmap.gotoAndStop(idTile - 1);
        return cellBitmap;
    }

    /*
    /// <summary>
    /// Creates a new tile. The other tile loading methods typically chain to this
    /// method after performing their special logic.
    /// </summary>
    /// <param name="collision">
    /// The tile collision type for the new tile.
    /// </param>
    /// <returns>The new tile.</returns>
    Map.prototype.LoadNamedTile = function (name, collision, x, y) {
        switch (name) {
            case "Platform":
                return new Tile(this.levelContentManager.imgPlatform, collision, x, y);
                break;

            case "Exit":
                return new Tile(this.levelContentManager.imgExit, collision, x, y);
                break;

            case "BlockA0":
                return new Tile(this.levelContentManager.imgBlockA0, collision, x, y);
                break;

            case "BlockA1":
                return new Tile(this.levelContentManager.imgBlockA1, collision, x, y);
                break;

            case "BlockA2":
                return new Tile(this.levelContentManager.imgBlockA2, collision, x, y);
                break;

            case "BlockA3":
                return new Tile(this.levelContentManager.imgBlockA3, collision, x, y);
                break;

            case "BlockA4":
                return new Tile(this.levelContentManager.imgBlockA4, collision, x, y);
                break;

            case "BlockA5":
                return new Tile(this.levelContentManager.imgBlockA5, collision, x, y);
                break;

            case "BlockA6":
                return new Tile(this.levelContentManager.imgBlockA6, collision, x, y);
                break;

            case "BlockB0":
                return new Tile(this.levelContentManager.imgBlockB0, collision, x, y);
                break;

            case "BlockB1":
                return new Tile(this.levelContentManager.imgBlockB1, collision, x, y);
                break;
        }
    };

    /// <summary>
    /// Loads a tile with a random appearance.
    /// </summary>
    /// <param name="baseName">
    /// The content name prefix for this group of tile variations. Tile groups are
    /// name LikeThis0.png and LikeThis1.png and LikeThis2.png.
    /// </param>
    /// <param name="variationCount">
    /// The number of variations in this group.
    /// </param>
    Map.prototype.LoadVarietyTile = function (baseName, variationCount, collision, x, y) {
        var index = Math.floor(Math.random() * (variationCount - 1));
        return this.LoadNamedTile(baseName + index, collision, x, y);
    };

    /// <summary>
    /// Instantiates a player, puts him in the level, and remembers where to put him when he is resurrected.
    /// </summary>
    Map.prototype.LoadStartTile = function (x, y) {
        if (this.Hero != null) {
            throw "A level may only have one starting point.";
        }

        this.Start = this.GetBounds(x, y).GetBottomCenter();
        this.Hero = new Player(this.levelContentManager.imgPlayer, this, this.Start);

        return new Tile(null, Enum.TileCollision.Passable, x, y);
    };

    /// <summary>
    /// Remembers the location of the level's exit.
    /// </summary>
    Map.prototype.LoadExitTile = function (x, y) {
        if (this.Exit.x !== -1 & this.Exit.y !== y) {
            throw "A level may only have one exit.";
        }

        this.Exit = this.GetBounds(x, y).Center;

        return this.LoadNamedTile("Exit", Enum.TileCollision.Passable, x, y);
    };

    /// <summary>
    /// Instantiates a gem and puts it in the level.
    /// </summary>
    Map.prototype.LoadGemTile = function (x, y) {
        position = this.GetBounds(x, y).Center;
        var position = new Point(x, y);
        this.Gems.push(new Gem(this.levelContentManager.imgGem, this, position));

        return new Tile(null, Enum.TileCollision.Passable, x, y);
    };

    /// <summary>
    /// Instantiates an enemy and puts him in the level.
    /// </summary>
    Map.prototype.LoadEnemyTile = function (x, y, name) {
        var position = this.GetBounds(x, y).GetBottomCenter();
        switch (name) {
            case "MonsterA":
                this.Enemies.push(new Enemy(this, position, this.levelContentManager.imgMonsterA));
                break;
            case "MonsterB":
                this.Enemies.push(new Enemy(this, position, this.levelContentManager.imgMonsterB));
                break;
            case "MonsterC":
                this.Enemies.push(new Enemy(this, position, this.levelContentManager.imgMonsterC));
                break;
            case "MonsterD":
                this.Enemies.push(new Enemy(this, position, this.levelContentManager.imgMonsterD));
                break;
        }

        return new Tile(null, Enum.TileCollision.Passable, x, y);
    };

    /// <summary>
    /// Gets the bounding rectangle of a tile in world space.
    /// </summary>
    Map.prototype.GetBounds = function (x, y) {
        return new XNARectangle(x * StaticTile.Width, y * StaticTile.Height, StaticTile.Width, StaticTile.Height);
    };

    /// <summary>
    /// Width of level measured in tiles.
    /// </summary>
    Map.prototype.Width = function () {
        return 20;
    };

    /// <summary>
    /// Height of the level measured in tiles.
    /// </summary>
    Map.prototype.Height = function () {
        return 15;
    };

    /// <summary>
    /// Gets the collision mode of the tile at a particular location.
    /// This method handles tiles outside of the levels boundries by making it
    /// impossible to escape past the left or right edges, but allowing things
    /// to jump beyond the top of the level and fall off the bottom.
    /// </summary>
    Map.prototype.GetCollision = function (x, y) {
        // Prevent escaping past the level ends.
        if (x < 0 || x >= this.Width()) {
            return Enum.TileCollision.Impassable;
        }
        // Allow jumping past the level top and falling through the bottom.
        if (y < 0 || y >= this.Height()) {
            return Enum.TileCollision.Passable;
        }

        return this.tiles[y][x].Collision;
    };

    // Create a random background based on
    // the 3 different layers available
    Map.prototype.CreateAndAddRandomBackground = function () {
        // random number between 0 & 2.
        var randomnumber = Math.floor(Math.random() * 3);

        backgroundSeqTile1 = new Bitmap(this.levelContentManager.imgBackgroundLayers[0][randomnumber]);
        backgroundSeqTile2 = new Bitmap(this.levelContentManager.imgBackgroundLayers[1][randomnumber]);
        backgroundSeqTile3 = new Bitmap(this.levelContentManager.imgBackgroundLayers[2][randomnumber]);

        this.levelStage.addChild(backgroundSeqTile1);
        this.levelStage.addChild(backgroundSeqTile2);
        this.levelStage.addChild(backgroundSeqTile3);
    };


    /*
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
            C'est là dedans qu'on ajoute les Tiles au stage pour les afficher
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------
        ----------------------------------------------------------------------


    // Method to call once everything has been setup in the level
    // to simply start it
    Map.prototype.StartLevel = function () {
        // Adding all tiles to the EaselJS Stage object
        // This is the platform tile where the hero & enemies will
        // be able to walk onto
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 20; j++) {
                if (!!this.tiles[i][j] && !this.tiles[i][j].empty) {
                    this.levelStage.addChild(this.tiles[i][j]);
                }
            }
        }

        // Adding the gems to the stage
        for (var i = 0; i < this.Gems.length; i++) {
            this.levelStage.addChild(this.Gems[i]);
        }

        // Adding all the enemies to the stage
        for (var i = 0; i < this.Enemies.length; i++) {
            this.levelStage.addChild(this.Enemies[i]);
        }

        // Adding our brillant hero
        this.levelStage.addChild(this.Hero);
        // Playing the background music
        this.levelContentManager.globalMusic.play();

        // add a text object to output the current FPS:
        fpsLabel = new Text("-- fps", "bold 14px Arial", "#000");
        this.levelStage.addChild(fpsLabel);
        fpsLabel.x = this.gameWidth - 50;
        fpsLabel.y = 20;
    };

    /// <summary>
    /// Updates all objects in the world, performs collision between them,
    /// and handles the time limit with scoring.
    /// </summary>
    Map.prototype.Update = function () {
        var ElapsedGameTime = (Ticker.getTime() - this.InitialGameTime) / 1000;

        this.Hero.tick();

        if (!this.Hero.IsAlive || this.TimeRemaining === 0) {
            this.Hero.ApplyPhysics();
        }
        else if (this.ReachedExit) {
            var seconds = parseInt((globalTargetFPS / 1000) * 200);
            seconds = Math.min(seconds, parseInt(Math.ceil(this.TimeRemaining)));
            this.TimeRemaining -= seconds;
            this.Score += seconds * PointsPerSecond;
        }
        else {
            this.TimeRemaining = 120 - ElapsedGameTime;

            if (!this.IsHeroDied)
                this.UpdateGems();

            if (this.Hero.BoundingRectangle().Top() >= this.Height() * StaticTile.Height) {
                this.OnPlayerKilled();
            }

            this.UpdateEnemies();

            // The player has reached the exit if they are standing on the ground and
            // his bounding rectangle contains the center of the exit tile. They can only
            // exit when they have collected all of the gems.
            if (this.Hero.IsAlive &&
                    this.Hero.IsOnGround &&
                    this.Hero.BoundingRectangle().ContainsPoint(this.Exit)) {
                this.OnExitReached();
            }
        }

        // Clamp the time remaining at zero.
        if (this.TimeRemaining < 0)
            this.TimeRemaining = 0;

        fpsLabel.text = Math.round(Ticker.getMeasuredFPS()) + " fps";

        // update the stage:
        this.levelStage.update();
    };

    /// <summary>
    /// Called when the player is killed.
    /// </summary>
    /// <param name="killedBy">
    /// The enemy who killed the player. This is null if the player was not killed by an
    /// enemy, such as when a player falls into a hole.
    /// </param>
    Map.prototype.OnPlayerKilled = function (killedBy) {
        this.IsHeroDied = true;
        this.Hero.OnKilled(killedBy);
    };

    */

    window.Map = Map;
} (window));