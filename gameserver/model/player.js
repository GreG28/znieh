/**
 * player.js
 *
 * Player model
 *
 * @author alfo
 */

function Player(id, name, socket) {
    this.id = id;
    this.name = name;
    this.socket = socket;
    this.status = 'init';
    this.pool = undefined;
    this.battle = undefined;
    this.units = undefined;

    this.disconnectTimeout = undefined;
}

module.exports = Player;