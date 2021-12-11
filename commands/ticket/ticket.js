const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "ticket",
    description: "Opens a ticket.",
    usage: "[reason]",
    cooldown: 4,
    execute(message, args) {
    	let reason = args.slice(0).join(" ");
        if (!reason) {
        	reason = "*No specified ticket reason.*"
        } else {
        	reason = args.slice(1).join(" ");
        }
        const fetchedChannel = message.guild.channels.cache.find(chan => chan.name === `ticket-${message.author.username.toLowerCase()}`);
        if (fetchedChannel) return message.reply("**you have already set up a ticket! Please wait for a staff member to respond to it, or end it with the `tclose` command.**")
        let role = db.get(`staff_role_${message.guild.id}`);
        if (!role) return message.reply("**no staff role has been configured yet!**")
        const everyoneRole = message.guild.roles.cache.find(w => w.name === "@everyone");
        cat = db.get(`ticket_category_${message.guild.id}`);
        try {
            let channel = message.guild.channels.create(`ticket-${message.author.username}`, {
                        reason: "This is a basic ticket.",
            			parent: cat,
                        type: "text"
                    })
                    .then(r => {
                        r.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });
                        r.updateOverwrite(everyoneRole, { VIEW_CHANNEL: false });
                        r.updateOverwrite(role, { VIEW_CHANNEL: true });
                        const welcomeChannelEmbed = new Discord.MessageEmbed()
                            .setColor(0x03c6fc)
                            .setTitle(`👋   **Thanks for contacting our staff team.** We will get to you ASAP.`)
                            .setDescription(`Reason for ticket: ${reason}`)
                        	.setThumbnail(message.author.avatarURL())
                            .setAuthor(`${message.author.username}`, message.author.avatarURL())
                            .setTimestamp()
        				r.send(welcomeChannelEmbed)
                   });
        } catch (err) {
            console.log(err);
            return message.reply("**please set up a ticket category!**")
        }
    }
}