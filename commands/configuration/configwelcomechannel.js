const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'configwelcomechannel',
    cooldown: 10,
    description: 'Sets the welcome channel for this guild.',
	guildOnly: true,
    usage: '<channel>',
    permissions: "MANAGE_GUILD",
    execute(message, args) {
        let channel = message.mentions.channels.first()
        if (!channel) return message.channel.send(`${message.author}, **please provide a channel!**`)
        db.set(`welcome_channel_${message.guild.id}`, channel.id)
        user = message.author
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The welcome channel has been successfully set to \`${channel.name}\`!**`)
            .setDescription(`You can also change my \`goodbye\` channel and \`welcome text\`!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    },
};