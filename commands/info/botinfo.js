const pagination = require('discord.js-pagination')
const Discord = require('discord.js');
const os = require('os');

module.exports = {
    name: 'botinfo',
    description: `Provides bot information`,
    execute(message) {
        const page1 = new Discord.MessageEmbed()
        	.setColor("BLUE")
            .setTitle("Bot Information")
            .addFields(
            	{ name: "Bot name", value: message.client.user.tag, inline: false },
                { name: "Bot token", value: "**bruh u wish**", inline: false },
                { name: "System name", value: `\`${os.hostname()}\``, inline: false },
            )
        const page2 = new Discord.MessageEmbed()
        .setColor("AQUA")
        .setTitle("Bot Information Page 2")
        .addFields(
            { name: "System type", value: `\`${os.type()}\``, inline: false },
            { name: "System platform", value: `\`${os.platform()}\``, inline: false },
            { name: "System version", value: `\`${os.version()}\``, inline: false },
        )
        const page3 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Bot Information Page 3")
        .addFields(
            { name: "System CPU(s)", value: `\`\`\`${JSON.stringify(os.cpus())}\`\`\``, inline: false },
            { name: "Bot code info", value: "This bot is using `BBS Framework [stable beta]`", inline: false },
        )
        
        const pages = [
            page1,
            page2,
            page3
        ]
        
        const emoji = ["⏪", "⏩"]
        
        const timeout = '100000'
        
        pagination(message, pages, emoji, timeout)
    }
}