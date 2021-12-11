const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    description: 'Shows information about a user.',
    usage: "[user]",
    cooldown: 1,
    execute(message, args) {
        let user = message.mentions.users.first();
        if (!user) {
            user = message.author;
        } else {
            user = message.mentions.users.first();
        }

        const member = message.guild.member(user);

        const embed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setThumbnail(user.avatarURL())
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle("User Information")
            .setDescription(`${user.tag}`, `${user}`, true)
            .addField("👋 User Name", `${user}`, true)
            .addField("🆔 User ID", `\`${user.id}\``, true)
            .addField("📛 Nickname", `**${member.nickname !== null ? `${member.nickname}` : '__No Nick.__'}**`, true)
            .addField("👶 Acccount Creation", `*${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}*`, true) 
            .addField("🧻 Role Count", `\`${member.roles.cache.size}\``, true)
            .addField("🤖 Is Bot", `**${user.bot}**`, true)
            .addField("🟢 Current Status", `**${user.presence.status}**`, true)
            .addField("🌎 Current Server", message.guild.name, true)
            .addField("▶ Server Join", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
            .addField("🎮 Playing Game", `${user.presence.game ? user.presence.game.name : '**None**'}`, true)
            .setTimestamp()
        message.channel.send({embed});
    }
}