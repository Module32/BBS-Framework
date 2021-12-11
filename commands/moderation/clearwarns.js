const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "clearwarns",
    description: "Clears a user's warns.",
    cooldown: 5,
    usage: "<user>",
    permissions: "KICK_MEMBERS",
    execute(message, args) {
        let user = message.mentions.users.first();
        if (!user) return message.reply("**please provide a user!**")
        if (user.id === message.author.id) return message.reply("**you cannot clear your own warns!**")
        let value = db.get(`${user.id}_warns_${message.guild.id}`)
        if (!value) return message.reply("**this user has never been warned in this server!**")
        db.set(`${user.id}_warns_${message.guild.id}`, 0);
        const notifyverifyEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle('✅  **I have cleared that user\'s warns!**')
            .setAuthor(user.username, user.avatarURL())
			.setTimestamp()
        message.channel.send(notifyverifyEmbed)
    }
    
}