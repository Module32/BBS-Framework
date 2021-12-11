const { Snake } = require('weky');
const disbut = require('discord-buttons');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
	name: "snake",
    description: "Starts a game of the classic... SNAKE",
    async execute(message, args) {
   		new Snake({
        message: message,
        embed: {
        title: '`SNAKE`', //embed title
        color: "#a1fc03", //embed color
        gameOverTitle: "welp, GAME  O V E R", //game over embed title
        },
        emojis: {
          empty: '⬛', //zone emoji
          snakeBody: '🐍', //snake
          food: '🍎', //food emoji
          //control
          up: '⬆️', 
          right: '⬅️',
          down: '⬇️',
          left: '➡️',
          },
        }).start()
    }
}