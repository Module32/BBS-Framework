const Discord = require('discord.js');

module.exports = {
    name: "botpermscheck",
    help: "A simple command to check if AGENCY has the correct permissions to run commands.",
    cooldown: 5,
    execute(message, args) {
        user = message.author
        let checker = ""
        if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
            checker = "❌ | I do not have the Administrator permissions!"
        } else {
            checker = "✅ | I have the Administrator permissions!"
        }
        const botpermEmbed = new Discord.MessageEmbed()
            .setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
            .setTitle(checker)
            .setTimestamp()
        message.channel.send(botpermEmbed)
    }
}