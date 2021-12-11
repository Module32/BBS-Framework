const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'boardmeeting',
    help: "Sets up a board meeting for staff and administrators of a server to use.",
    permissions: "MANAGE_MESSAGES",
    cooldown: 10,
    execute(message, args) {
        reason = args.join(' ');
        if (!reason) return message.reply("**please specify a reason for the board meeting!**")
        const client = new Discord.Client();
        const everyoneRole = message.guild.roles.cache.find(w => w.name === "@everyone");
        const staffRole = message.guild.roles.cache.find(r => r.id === db.get(`staff_role_${message.guild.id}`));
        if (!staffRole) return message.reply("**no staff role has been configured!**")
        if (message.guild.channels.cache.find(channel => channel.name === "board-meeting")) return message.reply("**a board meeting is already running in this server. Consider talking in that channel instead of making a new one.**")

        message.guild.channels.create("board-meeting")
            .then(r => {
                r.updateOverwrite(message.author.id, { VIEW_CHANNEL: true });
                r.updateOverwrite(everyoneRole, { VIEW_CHANNEL: false });
                r.updateOverwrite(staffRole, { VIEW_CHANNEL: true });
                r.updateOverwrite(staffRole, { VIEW_CHANNEL: true });
                let channel = message.guild.channels.cache.find(c => c.name === 'board-meeting')
                let footerdb = ""
                if (!db.get(`meeting_logs_channel_${message.guild.id}`)) {
                    footerdb = "No logs channel for board meetings has been configured."
                } else {
                    footerdb = "A logs channel has been specified for board meetings."
                }
                user = message.author
                const boardmeetingEmbed = new Discord.MessageEmbed()
                    .setColor('cfeaff')
                    .setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
                    .setTitle(`${user.username} has started a board meeting.`)
                    .setDescription(`Reason for board meeting: \`${reason}\``)
                    .setTimestamp()
                    .setFooter(`This board meeting is with the server staff. ${footerdb}`, 'https://upload.wikimedia.org/wikipedia/commons/2/26/Tabletennis.jpg');
                channel.send(boardmeetingEmbed)

                const currentDate = new Date();
                let logschannel = message.guild.channels.cache.find(l => l.id === db.get(`meeting_logs_channel_${message.guild.id}`))
                const logsboardmeetingEmbed = new Discord.MessageEmbed()
                    .setColor('cfeaff')
                    .setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
                    .setTitle(`${user.username} just started a board meeting.`)
                    .setDescription(`Reason for board meeting: \`${reason}\`\nCreated at: \`${currentDate.toLocaleString()}\``)
                    .setTimestamp()
                    .setFooter('This board meeting is with the server staff.', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Tabletennis.jpg');
                logschannel.send(logsboardmeetingEmbed)
            })
        
    }
}