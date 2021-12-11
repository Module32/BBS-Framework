const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'configmodlog',
    cooldown: 10,
    description: 'Sets the modlog channel for this guild.',
	guildOnly: true,
    usage: '<channel>',
    permissions: "MANAGE_GUILD",
    execute(message, args) {
        let channel = message.mentions.channels.first()
        if (!channel) return message.channel.send(`${message.author}, **please provide a channel!**`)
        db.set(`modlog_channel_${message.guild.id}`, channel.id)
        user = message.author
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The modlog channel has been successfully set to \`${channel.name}\`!**`)
            .setDescription(`You can also change my \`welcome\` channel and \`goodbye\` channel!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    },
};