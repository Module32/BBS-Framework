const Discord = require('discord.js');
const moment = require("moment");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: 'ping',
    description: 'Ping! Shows the bot latency.',
    cooldown: 1,
    execute(message, args) {
        const client = new Discord.Client();
        const pingingEmbed = new Discord.MessageEmbed()
			.setDescription('⏰   **Pinging...**')
			.setTimestamp()
			.setFooter('module64 loves playing ping-pong lol', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Tabletennis.jpg');
        message.channel.send(pingingEmbed).then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            const user = message.author;
            
            const pingEmbed = new Discord.MessageEmbed()
                .setColor(0x47f0ff)
                .setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
                .setDescription(`🏓  **Pong!** My latency is **\`${ping}ms\`**`)
                .setTimestamp()
			m.edit(pingEmbed);
            // <:agencypaddlediscord:840236060377088000>
        });
    }
}