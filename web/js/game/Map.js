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

    var StaticTile = new Tile(null, Enum.TileCollision.Passable, 0, 0);

    function Map() {
        // RECUPERER LA TAILLE DES TILES ET LA STOCKER POUR L'UTILISER QUAND ON EN A BESOIN
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
    };


    Map.prototype.LoadTile = function (tileType, x, y) {
        switch (tileType) {

            // Arbre
            case 1:
                return new Tile(this.loadTileImg(1), Enum.TileCollision.Passable, x, y, true);
                break;
            // Eau
            case 2:
                return new Tile(this.loadTileImg(2), Enum.TileCollision.Passable, x, y, true);
                break;
            // Roche
            case 3:
                return new Tile(this.loadTileImg(3), Enum.TileCollision.Impassable, x, y, true);
                break;
            // Plaine
            case 4:
                return new Tile(this.loadTileImg(4), Enum.TileCollision.Passable, x, y, true);
                break;
        }
    };

    Map.prototype.loadTileImg = function (idTile) {
        var cellBitmap = new createjs.Sprite(tilesetSheet);
        cellBitmap.gotoAndStop(idTile - 1);
        return cellBitmap;
    }

    /// <summary>
    /// Gets the bounding rectangle of a tile in world space.
    /// </summary>
    Map.prototype.GetBounds = function (x, y) {
        return new XNARectangle(x * StaticTile.width, y * StaticTile.height, StaticTile.width, StaticTile.height);
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

    window.Map = Map;
} (window));