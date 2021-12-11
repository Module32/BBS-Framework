const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "setannouncechannel",
    description: "Sets the channel where server members and I can make announcements in.",
    usage: "<channel>",
    cooldown: 10,
    execute(message, args) {
        let channel = message.mentions.channels.first();
        if (!channel) return message.channel.send(`${message.author}, **please provide a channel!**`)
        if (channel.type !== "text") return message.reply("**please provide a *text* channel!**")
        db.set(`community_announcement_channel_${message.guild.id}`, channel.id)
        user = message.author
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The announcements channel has been successfully set to \`${channel.name}\`!**`)
            .setDescription(`You can also change my \`goodbye\` channel and \`welcome\` channel!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    }
}