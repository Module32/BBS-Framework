const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'configprofanityblock',
    cooldown: 10,
    description: 'Sets the profanity blocking for this server.',
	guildOnly: true,
    usage: '<argument (true - false)>',
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
        db.set(`profanity_block_${message.guild.id}`, choice)
        user = message.author
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **Profanity blocking has been successfully set to \`${choice}\`!**`)
            .setDescription(`You can also change my \`welcome text\` channel and \`goodbye text\`!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    },
};