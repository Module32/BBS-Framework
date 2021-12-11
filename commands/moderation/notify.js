const Discord = require('discord.js');

module.exports = {
    name: 'notify',
    help: "Notifies a user for something.",
    usage: '<user> <notification_reason>',
    cooldown: 5,
    permissions: 'MANAGE_MESSAGES',
    execute(message, args) {
        let user = message.author
        let damember = message.guild.member(message.mentions.users.first())
        if (user.id === damember.id) return message.reply("**you cannot notify yourself!**")
        if (!user) return message.reply("**please mention a user to notify!**")
        let reason = args.slice(1).join(" ");
        if (!reason) return message.reply("**please specify a reason!**")

        const notifyverifyEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle('✅  **The notification was successful!**')
            .setDescription(`${damember} will be notified for the following reason: \`${reason}\``)
            .setAuthor(user.username, user.avatarURL())
			.setTimestamp()
			.setFooter('you\'ve got  n o t i f i c a t i o n', 'https://media.forgecdn.net/avatars/67/43/636163084771207853.png');
        message.channel.send(notifyverifyEmbed)

        const notifyEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle(`You were notified in \`${message.guild}\``)
            .setAuthor(user.username, user.avatarURL())
            .setDescription(`Notified by: **${user.username}**\nReason for notification: \`${reason}\``)
			.setTimestamp()
			.setFooter('you\'ve got  n o t i f i c a t i o n', 'https://media.forgecdn.net/avatars/67/43/636163084771207853.png');

        damember.send(notifyEmbed)
    }
}