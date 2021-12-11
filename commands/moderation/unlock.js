const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'unlock',
    description: "Unlocks a channel.",
    cooldown: 5,
    permissions: 'MANAGE_GUILD',
    usage: "<channel>",
    execute(message) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (!prefix) prefix = ";"
        const everyonerole = message.guild.roles.cache.find(role => role.name === '@everyone') 
        message.channel.updateOverwrite(everyonerole, { 'SEND_MESSAGES': true })
        const lockedEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle(`<:agencyunlockdiscord:841065626087718963> **\`${message.channel.name}\` has been unlocked!**`)
            .setDescription(`To lock the channel, run the following command: **${prefix}lock**`)
			.setTimestamp()
        message.channel.send(lockedEmbed)
    }
}