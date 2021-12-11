const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "unlockdown",
    description: "Unlocks the entire server.",
    guildOnly: true,
    permissions: "ADMINISTRATOR",
    execute(message, args) {
    	try {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        (channels.forEach(channel => {
        	channel.updateOverwrite(message.guild.roles.everyone, {
            	SEND_MESSAGES: true
            })
        }))
        } catch (err) {
       		console.log(err);
        }
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (!prefix) prefix = ";"
        const lockedEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle(`<:agencylockdiscord:841064456205369364> The server has been unlocked!`)
            .setDescription(`To lock the server, run the following command: **${prefix}lock**`)
			.setTimestamp()
        message.channel.send(lockedEmbed)
    }
}