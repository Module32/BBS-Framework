const { TicTacToe } = require('weky')
module.exports = {
	name: "ttt",
    description: "Creates a tic-tac-toe game!",
    usage: "<user>",
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
    	const opponent = message.mentions.users.first();
		if (!opponent) return message.reply("**please mention who you want to challenge!**")
        const game = new TicTacToe({
            message: message,
            opponent: opponent, // opponent
            xColor: 'red', // x's color
            oColor: 'blurple', //zero's color
            xEmoji: '❌',  //t he x emoji
            oEmoji: '0️⃣' ,// the zero emoji
        })
        game.start()
    }
}