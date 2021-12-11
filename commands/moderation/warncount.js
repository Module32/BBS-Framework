const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "warncount",
    description: "Shows the warn count a user has.",
    cooldown: 5,
    usage: "<user>",
    execute(message, args) {
    	let user = message.mentions.users.first();
        if (!user) return message.reply("Please mention a user!")
        let value = db.get(`${user.id}_warns_${message.guild.id}`) || 0;
        let warnword = ""
        if (value === 1) {
        	warnword = "warn"
        } else {
        	warnword = "warns"
        }
        const notifyverifyEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setDescription(`⚠  **${user}** has \`${value}\` ${warnword}`)
            .setAuthor(user.username, user.avatarURL())
			.setTimestamp()
        message.channel.send(notifyverifyEmbed)
    }
}