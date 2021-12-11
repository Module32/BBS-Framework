const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "tadd",
    description: "Adds a user to a ticket.",
    usage: "[reason]",
    cooldown: 4,
    permissions: "MANAGE_SERVER",
    execute(message) {
        const fetchedChannel = message.guild.channels.cache.find(chan => chan.name === `ticket-${message.author.username.toLowerCase()}`);
        const user = message.mentions.users.first();
        if (!fetchedChannel) return message.reply("**you have not yet set up a ticket! Run the `ticket` command to do so.**")
        let role = db.get(`staff_role_${message.guild.id}`);
        if (!role) return message.reply("**no staff role has been configured yet!**");
        const everyoneRole = message.guild.roles.cache.find(w => w.name === "@everyone");
        message.guild.channels.cache.find(chan => chan.name === `ticket-${message.author.username.toLowerCase()}`)
                        fetchedChannel.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });
                        fetchedChannel.updateOverwrite(everyoneRole, { VIEW_CHANNEL: false });
                        fetchedChannel.updateOverwrite(role, { VIEW_CHANNEL: true });
                        fetchedChannel.updateOverwrite(user.id, { VIEW_CHANNEL: true });
                        const welcomeChannelEmbed = new Discord.MessageEmbed()
                            .setColor(0x03c6fc)
                            .setDescription(`👋   **${user} has been added to this ticket.**`)
                        	.setThumbnail(message.author.avatarURL())
                            .setAuthor(`${message.author.username}`, message.author.avatarURL())
                            .setTimestamp()
        				fetchedChannel.send(welcomeChannelEmbed)
    }
}