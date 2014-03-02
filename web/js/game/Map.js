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

    var StaticTile = new Tile(null, Enum.TileCollision.Passable, 0, 0);

    function Map() {
        var mapData = [];

        // récupère le json de la loading queue puis le parse !
        mapData = jQuery.parseJSON(loadingQueue.getResult("map-json",true));

        this.gameWidth = mapData.width;
        this.gameHeight = mapData.height;
        this.tileWidth = mapData.tilewidth;
        this.tileHeight = mapData.tileheight;

        // Building a matrix of characters that will be replaced by the level {x}.txt
        this.textTiles = Array.matrix(this.gameWidth, this.gameHeight, "|");
        // Physical structure of the level.
        this.tiles = Array.matrix(this.gameWidth, this.gameHeight, "|");
        this.properties = mapData.tilesets[0].tileproperties;
        this.LoadTiles(mapData.layers[0].data);
    }

    /**
     * Transform 1D Array Map in 2D Array Map
     * @param {Array} mapData
     */
    Map.prototype.ParseLevelLines = function (mapData) {
        for (var i = 0; i < this.gameWidth; i++) {
            for (var j = 0; j < this.gameHeight; j++) {
                this.textTiles[i][j] = mapData[(i * this.gameWidth) + j];
            }
        }
    };

    /**
     * Put Tiles with proprierties in Array Map
     * @param {Array} mapData
     */
    Map.prototype.LoadTiles = function (mapData) {
        this.ParseLevelLines(mapData); // Doit récupérer les chiffres indiquant les sprites à partir du JSON et les foutre dans textTiles

        // Loop over every tile position,
        for (var i = 0; i < this.gameWidth; i++) {
            for (var j = 0; j < this.gameHeight; j++) {
                this.tiles[i][j] = this.LoadTile(this.textTiles[i][j], j, i);
                //alert("Tile[" + i +"][" + j+ "]");
            }
            //alert("Tile[" + i +"][" + j+ "]");
        }

    };

    /**
     * Create and load Tile proprierties
     * @param {int} tileType
     * @param {int} x
     * @param {int} y
     */
    Map.prototype.LoadTile = function (tileType, x, y) {
        var property;
        if(this.properties[tileType - 1] != null && this.properties[tileType - 1].block == "true")
            property = Enum.TileCollision.Impassable;
        else
            property = Enum.TileCollision.Passable;

        switch (tileType) {
            // Arbre
            case 1:
                return new Tile(this.loadTileImg(1), property, x, y, true);
            //break;
            // Eau
            case 2:
                return new Tile(this.loadTileImg(2), property, x, y, true);
            //break;
            // Roche
            case 3:
                return new Tile(this.loadTileImg(3), property, x, y, true);
            //break;
            // Plaine
            case 4:
                return new Tile(this.loadTileImg(4), property, x, y, true);
            //break;
        }
    };

    /**
     * Load Tile image from tileSheet
     * @param  {int} idTile
     * @return {createjs.Sprite}
     */
    Map.prototype.loadTileImg = function (idTile) {
        var cellBitmap = new createjs.Sprite(tilesetSheet);
        cellBitmap.gotoAndStop(idTile - 1);
        return cellBitmap;
    };

    /**
     * Get a rectangle around a Tile
     */
    Map.prototype.GetBounds = function (x, y) {
        return new XNARectangle(x * StaticTile.width, y * StaticTile.height, StaticTile.width, StaticTile.height);
    };

    /**
     * Width of level measured in Tiles
     */
    Map.prototype.Width = function () {
        return this.gameWidth;
    };

    /**
     * Height of level measured in Tiles
     */
    Map.prototype.Height = function () {
        return this.gameHeight;
    };

    /**
     * Get the collision proprierty of a Tile at a particular point
     */
    Map.prototype.GetCollision = function (x, y) {
        // Prevent escaping past the level ends.
        if (x < 0 || x >= this.Width()) {
            return Enum.TileCollision.Impassable;
        }
        // Allow jumping past the level top and falling through the bottom.
        if (y < 0 || y >= this.Height()) {
            return Enum.TileCollision.Impassable;
        }

        return this.tiles[y][x].Collision;
    };

    window.Map = Map;
} (window));