const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "announce",
    description: "Sends an announcement to a channel.",
    permissions: "MANAGE_GUILD",
    cooldown: 5,
    usage: "<announcement>",
    execute(message, args) {
        const thement = args.slice(0).join(" ");
        if (!thement) return message.reply("**please specify an announcement to push to the server members!**")
        let chan = db.get(`community_announcement_channel_${message.guild.id}`);
        if (!chan) return message.reply("**no announcement channel has been configured!**")
        const announcementembed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor(0xff2a00)
            .setDescription(`**📢📢 New Announcement 📢📢**\n\n${thement}`)
            .setFooter(`Announced by ${message.author.username}`)
        thechan = message.guild.channels.cache.get(chan);
        thechan.send(announcementembed)
        message.channel.send(`:white_check_mark: - Message announced!`)
    }
}