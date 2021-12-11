const { RPS  } = require('weky');
const Discord = require('discord.js');
module.exports = {
	name: "rps",
    description: "Lets you engage in a fierce rock-paper-scissors battle with an opponent!",
    usage: "<user>",
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
        const client = new Discord.Client();
    	const opponent = message.mentions.users.first();
		if (!opponent) return message.reply("**please mention who you want to challenge!**")
        const game = new RPS({
            message: message,
            opponent: opponent, // NOT CHANGEABLE
            challenger: message.author, // NOT CHANGEABLE
            acceptMessage: '**Click the confirmation button to engage in fierce battle with <@' + message.author + '>!**', // message sent to see if opponent accepts
        })
        game.start();
    }
}