const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');

module.exports = {
  name: "unflag",
  description: "Unflags a user.",
  usage: "<user> [reason]",
  cooldown: 30,
  execute(message, args) {
    let reason = args.slice(1).join(" ");
    let flagman = message.guild.member(message.mentions.users.first());
    if (flagman === 837076791981637712) return message.reply("**you cannot unflag me!**")
    let flaggedman = message.mentions.users.first();
    if (!reason) reason = "*No reason was specified.*"
    if(!flagman) return message.reply("**you need to mention a user!**")
    if (!flagman.roles.cache.some(role => role.id === db.get(`flag_role_${message.guild.id}`))) return message.reply(`**${flagman} has already been unflagged!**`)
    if (flagman.id === message.author.id) return message.reply("**you cannot unflag yourself!**");
    let flagrole = message.guild.roles.cache.find(r => r.id === db.get(`flag_role_${message.guild.id}`));
    let staffRole = message.guild.roles.cache.find(r => r.id === db.get(`staff_role_${message.guild.id}`));
    let flagstaffalertchannel = message.guild.channels.cache.find(l => l.id === db.get(`flag_logs_channel_${message.guild.id}`))
    if (!flagstaffalertchannel) flagstaffalertchannel = message.channel

    if(!flagrole) return message.reply("**please configure a flag role!**")
    user = message.author
    if(!reason) return message.reply("**please specify a reason!**");
    const flaggedEmbed = new Discord.MessageEmbed()
        .setColor(0x2ECC71)
        .setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
        .setTitle(`✅   **The unflag was successful!**`)
        .setDescription(`${flagman} has been unflagged - staff members will be alerted of this.`)
        .setTimestamp()

    flagman.roles.remove(flagrole.id);
    message.channel.send(flaggedEmbed)

    let currentDate = new Date();
    const flagstaffalertEmbed = new Discord.MessageEmbed()
        .setColor(0x2ECC71)
        .setAuthor(user.username, message.author.avatarURL())
        .setTitle(`**A user was just unflagged**`)
        .setDescription(`📊 QUICK STATS:\n\nUnflagged user: **${flagman}**\nReason: **${reason}**\n\n${staffRole} - just pinging to let you know\n`)
        .addFields(
            { name: "🚩 Unflagged user:", value: flagman, inline: true},
            { name: "✏ Done by:", value: user.username, inline: true },
            { name: "🕔 Time of unflag:", value: currentDate.toLocaleString(), inline: true },
            { name: "❓ Reason:", value: `\`${reason}\``, inline: true },
        )
        .setThumbnail(flaggedman.avatarURL())
        .setTimestamp()

    flagstaffalertchannel.send(flagstaffalertEmbed)

    const flaggeddmEmbed = new Discord.MessageEmbed()
        .setColor(0x2ECC71)
        .setAuthor(user.username, message.author.avatarURL())
        .setTitle(`**You were unflagged in \`${message.guild}\`**`)
        .addFields(
            { name: "✏ Done by:", value: user.username, inline: true },
            { name: "🕔 Time of unflag:", value: currentDate.toLocaleString(), inline: true },
            { name: "❓ Reason:", value: `\`${reason}\``, inline: true },
        )
        .setThumbnail(flaggedman.avatarURL())
        .setTimestamp()
    flagman.send(flaggeddmEmbed)
  }

}