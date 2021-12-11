const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'configprofanitykick',
    cooldown: 10,
    description: 'Sets how many profanity warns are given before a user is kicked.',
	guildOnly: true,
    usage: '<integer>',
    permissions: "MANAGE_GUILD",
    execute(message, args) {
        let opt = args[0]
        let choice = ""
        if (!opt) return message.channel.send(`${message.author}, **please provide a number!**`)
        if (isNaN(opt)) return message.reply("**please provide a valid number!**")
        opt = Number(args[0]);
        db.set(`profanity_kick_amt_${message.guild.id}`, opt)
        user = message.author
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The profanity warns-before-kicks has been successfully set to \`${opt}\`!**`)
            .setDescription(`When a user receives \`${opt}\` warns, they will be kicked - you can also change my \`profanity blocking\` and \`welcome text\`!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    },
};