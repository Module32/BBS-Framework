const weky = require('weky');
const Discord = require('discord.js');
module.exports = {
	name: "flipit",
    description: "Flips a word or message that you send!",
    guildOnly: false,
    cooldown: 5,
    async execute(message, args) {
    	const msg = args.slice(0).join(" ");
        if (!msg) return message.reply("**please provide a statement for me to flip!**")
        message.channel.send(weky.flip(msg));
    }
    }