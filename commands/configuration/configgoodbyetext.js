const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'configgoodbyetext',
    cooldown: 10,
    description: 'Sets the goodbye text for this guild.',
	guildOnly: true,
    args: true,
    usage: '<message>',
    permissions: "MANAGE_GUILD",
    execute(message, args) {
        let text = args.join(' ')
        if (!text) return message.channel.send(`${message.author}, **please provide a message!**`)
        db.set(`goodbye_text_${message.guild.id}`, text)
        user = message.author
        server = message.guild
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The goodbye text has been successfully set to this: \`${text}\`**`)
            .setDescription(`You can also change my \`goodbye channel\` and \`welcome text\`!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    },
};