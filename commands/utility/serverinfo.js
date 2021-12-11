const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Shows information about this server.',
    cooldown: 1, // change to 10 when done debugging
    execute(message, args) {
        guild = message.guild;
        const serverInfoEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle('Server Information')
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setImage(message.guild.iconURL({size:2048,dynamic:true}))
            .addField("👋 Server Name", `__${message.guild.name}__`, inline=true)
            .addField("🆔 Server ID", `\`${message.guild.id}\``, inline=true)
            .addField("👶 Server Creation", `*${message.guild.createdAt}*`, inline=true)
            .addField("🌎 Server Region", message.guild.region, inline=true)
            .addField("🕴 Owner", `${message.guild.owner}`, inline=true)
            .addField("👨‍👨‍👦‍👦 Member Count", `\`${message.guild.memberCount}\` members`, inline=true)
            .addField("🧻 Role Count", `\`${message.guild.roles.cache.size}\` roles`, inline=true)
            .addField("💬 Channel Count", `\`${message.guild.channels.cache.size}\` channels`, inline=true)
            .addField("🔼 Verification Level", message.guild.verificationLevel, inline=true)
			.setTimestamp()
        message.channel.send(serverInfoEmbed);
    }
}