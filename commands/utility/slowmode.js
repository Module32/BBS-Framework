const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: "slowmode",
    description: "Sets the slowmode for a channel.",
    usage: "<time>",
    cooldown: 3,
    permissions: "MANAGE_MESSAGES",
    execute(message, args) {
        if (!args[0]) return message.reply("**you need to specify a slowmode time!**")
        let time = ms(args[0]) / 1000;
        if (time < 0) return message.reply("**the time may not be negative!**")
        message.channel.setRateLimitPerUser(time);
        user = message.author;
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The slowmode has been set to \`${time}\`!**`)
            .setDescription(`You can also change my \`profanity blockage\` and \`welcome channel\`!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    }
}