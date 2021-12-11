const { fight  } = require('weky');
const Discord = require('discord.js');
module.exports = {
	name: "fight",
    description: "Lets you engage in fierce battle with an opponent!",
    usage: "<user>",
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
        const client = new Discord.Client();
    	const opponent = message.mentions.users.first();
		if (!opponent) return message.reply("**please mention who you want to fight with!**")
        const battle = new fight({
            client: client,
            message: message,
            acceptMessage: '**Click the confirmation button to engage in fierce battle with <@' + message.author + '>!**', //message sent to see if opponent accepts
            challenger: message.author, // NOT CHANGEABLE
            opponent: opponent,  // NOT CHANGEABLE
            hitButtonText: '🎯 HIT', // Hit button text (Custom)
            hitButtonColor: 'red', // Hit button color (Custom)
            healButtonText: '👨‍⚕️ HEAL', // Heal button text (Custom)
            healButtonColor:  'green', // Heal button color (Custom)
            cancelButtonText: '❌ CANCEL', // Cancel button text (Custom)
            cancelButtonColor: 'blurple', // Cancel button color (Custom)
        });
        battle.start();
    }
}