const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "warn",
    description: "Warns a user.",
    cooldown: 5,
    usage: "<user> [reason]",
    permissions: "KICK_MEMBERS",
    execute(message, args) {
        let user = message.mentions.users.first();
        if (!user) return message.reply("**please provide a user!**")
        if (user.id === message.author.id) return message.reply("**you cannot warn yourself!**") 
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "None"
        let member = message.guild.member(user);
    	let value = db.get(`${user.id}_warns_${message.guild.id}`) || 0;
        db.set(`${user.id}_warns_${message.guild.id}`, value+1)
        try {
            const notifyverifyEmbed = new Discord.MessageEmbed()
                .setColor('ff7c17')
                .setTitle(`⚠  You were warned in **${message.guild}**`)
            	.setDescription(`**Warned by:** ${message.author.username}\n**Reason:** ${reason}\n**Your total warns:** ${value+1}`)
                .setAuthor(user.username, user.avatarURL())
            	.setThumbnail(message.guild.iconURL())
                .setTimestamp()
        	member.send(notifyverifyEmbed)
        } catch (err) {
            message.channel.send(`<@${user.id}>`)
        }
        const notifyverifyEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle('✅  **I have warned that user!**')
            .setDescription(`${member} will be warned for the following reason: \`${reason}\`\nThis user has \`${value+1}\` warns.`)
            .setAuthor(user.username, user.avatarURL())
			.setTimestamp()
        message.channel.send(notifyverifyEmbed)
    }
}