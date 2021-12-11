const Discord = require('discord.js');

module.exports = {
    name: "vers",
    help: "Shows the different versions of A.G.E.N.C.Y's emojis and changes.",
    cooldown: 4,
    execute(message) {
        message.channel.send("**VERSION 1:**");
        user = message.author
        const v1embedsuccess = new Discord.MessageEmbed()
                .setColor('abffd6')
                .setAuthor(`${user.username} - v1 Emojis`, user.avatarURL(), message.author.avatarURL())
                .setTitle(`<:agencycheckdiscord:840203502612381716>  Success (HEX color code: abffd6) | <:agencyoopsdiscord:837451936490848286>  Fail (HEX color code: ffbaab) | <:agencypaddlediscord:840236060377088000>  Paddle (no HEX code)`)
                .setTimestamp()
        message.channel.send(v1embedsuccess)
        message.channel.send("**VERSION 2:**");
        const v2embedsuccess = new Discord.MessageEmbed()
                .setColor(0x2ECC71)
                .setAuthor(`${user.username} - v2 Emojis`, user.avatarURL(), message.author.avatarURL())
                .setTitle(`✅  Success (HEX color code: 2ECC71) | ❌  Fail (HEX color code: ff4747) | 🏓 Paddle (no HEX code)`)
                .setTimestamp()
        message.channel.send(v2embedsuccess)
    }
}