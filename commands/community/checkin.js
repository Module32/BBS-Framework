const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "checkin",
    description: "Pushes a check-in to a server's members.",
    permissions: "MANAGE_GUILD",
    cooldown: 5,
    usage: "<check-in>",
    execute(message, args) {
        const thement = args.slice(0).join(" ");
        if (!thement) return message.reply("**please specify a check-in to push to the server members!**")
        let chan = db.get(`community_announcement_channel_${message.guild.id}`);
        if (!chan) return message.reply("**no announcement channel has been configured!**")
        const announcementembed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor('00e5ff')
            .setDescription(`**☺😃 New Check-In 😃☺**\n\n**Check-in:** ${thement}`)
            .setFooter(`Announced by ${message.author.username} - react below!`)
        thechan = message.guild.channels.cache.get(chan);
        thechan.send(announcementembed)
    }
}