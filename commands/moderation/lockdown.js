const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "lockdown",
    description: "Locks down the entire server.",
    guildOnly: true,
    permissions: "ADMINISTRATOR",
    execute(message, args) {
    	try {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        (channels.forEach(channel => {
        	channel.updateOverwrite(message.guild.roles.everyone, {
            	SEND_MESSAGES: false
            })
        }))
        } catch (err) {
       		console.log(err);
        }
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (!prefix) prefix = ";"
        const lockedEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle(`<:agencylockdiscord:841064456205369364> The server has been locked!`)
            .setDescription(`To unlock the server, run the following command: **${prefix}unlockdown**`)
			.setTimestamp()
        message.channel.send(lockedEmbed)
    }
}