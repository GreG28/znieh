function Player(name, socket) {
    this.name = name,
    this.socket = socket;
    this.status = 'init';
    this.pool = undefined;
}


module.exports = Player;