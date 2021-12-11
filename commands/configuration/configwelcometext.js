const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'configwelcometext',
    cooldown: 10,
    description: 'Sets the welcome text for this guild.',
	guildOnly: true,
    args: true,
    usage: '<message>',
    permissions: "MANAGE_GUILD",
    execute(message, args) {
        let text = args.join(' ')
        if (!text) return message.channel.send(`${message.author}, **please provide a message!**`)
        db.set(`welcome_text_${message.guild.id}`, text)
        user = message.author
        server = message.guild
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The welcome text has been successfully set to this: \`${text}\`**`)
            .setDescription(`You can also change my \`goodbye text\` and \`welcome channel\`!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    },
};