const Discord = require('discord.js');

module.exports = {
	name: "embed",
    description: "Sends an embed that you can generate!",
    cooldown: 3,
    execute(message, args) {
    	title = args.slice(0).join(" ");
        if (!title) return message.reply("**please enter an embed title!**");
        if (title.length > 256) return message.reply("**the title cannot exceed 256!**")
        color = Math.floor(Math.random()*16777215).toString(16);
        const embed = new Discord.MessageEmbed()
        	.setTitle(title)
            .setColor(color)
        message.channel.send(embed)
    }
}