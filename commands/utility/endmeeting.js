const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'endmeeting',
    help: "Ends a board meeting in the server.",
    permissions: "MANAGE_MESSAGES",
    cooldown: 5,
    execute(message, args) {
        const client = new Discord.Client();
        if (!message.guild.channels.cache.find(channel => channel.name === "board-meeting")) return message.reply("**no board meeting is currently running in this server. Consider making one with the \`boardmeeting\` command if you have something important to discuss.**")
        let logschannel = message.guild.channels.cache.find(l => l.id === db.get(`meeting_logs_channel_${message.guild.id}`))

        user = message.author
        message.guild.channels.cache.find(channel => channel.name === "board-meeting").delete()
            .then(r => {
                const currentDate = new Date();
                const logsboardmeetingEmbed = new Discord.MessageEmbed()
                    .setColor('cfeaff')
                    .setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
                    .setTitle(`${user.username} just ended a board meeting.`)
                    .setDescription(`Reason for board meeting: \`${reason}\`\nEnded at: \`${currentDate.toLocaleString()}\``)
                    .setTimestamp()
                    .setFooter('This board meeting was with the server staff.', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Tabletennis.jpg');
                logschannel.send(logsboardmeetingEmbed)
            })
        
    }
}