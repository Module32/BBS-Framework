const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'lock',
    description: "Locks a channel.",
    cooldown: 2,
    permissions: 'MANAGE_GUILD',
    usage: "<channel>",
    execute(message) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (!prefix) prefix = ";"
        const everyonerole = message.guild.roles.cache.find(role => role.name === '@everyone') 
        message.channel.updateOverwrite(everyonerole, { 'SEND_MESSAGES': false })
        const lockedEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle(`<:agencylockdiscord:841064456205369364> **\`${message.channel.name}\` has been locked!**`)
            .setDescription(`To unlock the channel, run the following command: **${prefix}unlock**`)
			.setTimestamp()
        message.channel.send(lockedEmbed)
    }
}