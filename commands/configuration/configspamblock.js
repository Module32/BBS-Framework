const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'configspamblock',
    help: "Configures whether or not you want spam blocking in your server.",
    guildOnly: true,
    usage: '<argument (true - false)>',
    cooldown: 10,
    permissions: "MANAGE_GUILD",
    execute(message, args) {
        let opt = args[0]
        let choice = ""
        if (!opt) return message.channel.send(`${message.author}, **please provide either \`true\` or \`false\` as the argument!**`)
        if (opt === "true") {
            choice = "true"
        } else if (opt === "false") {
            choice = "false"
        } else {
            return message.reply("**that is not a valid argument!**")
        }
        db.set(`spam_block_${message.guild.id}`, choice)
        user = message.author
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The spam block been successfully set to \`${choice}\`.**`)
            .setDescription(`You can also change my \`profanity block\` channel and \`captcha\`!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    },
}