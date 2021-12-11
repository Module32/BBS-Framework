const Discord = require('discord.js');

module.exports = {
    name: 'mystats',
    help: "Shows my statistics.",
    execute(message) {
        const pingingEmbed = new Discord.MessageEmbed()
			.setTitle('✅   **My statistics**')
            .addFields(
                { name: 'Owner', value: "```Module64#8821```" },
                { name: 'Servers', value: "" }
            )
			.setTimestamp()
        message.channel.send(pingingEmbed)
    }
}