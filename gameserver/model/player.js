/**
 * player.js
 *
 * Player model
 *
 * @author alfo
 */

function Player(name, socket) {
    this.name = name,
    this.socket = socket;
    this.status = 'init';
    this.pool = undefined;
    this.battle = undefined;

    this.disconnectTimeout = undefined;
}

module.exports = Player;