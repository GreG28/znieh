function Enum() { }
Enum.TileCollision = { Passable: 0, Impassable: 1 };

(function (window) {
    function Tile(texture, collision, x, y, render) {
        this.initialize(texture, collision,x,y, render);
    }

    Tile.prototype.initialize = function(texture, collision, x, y, render) {
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
        this.texture.x = this.x;
        this.texture.y = this.y;
        stage.addChild(this.texture);
    };

    Tile.prototype.width = 32;
    Tile.prototype.height = 32;

    window.Tile = Tile;
} (window));