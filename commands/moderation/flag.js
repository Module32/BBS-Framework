const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');

module.exports = {
  name: "flag",
  description: "Flags a user for the server staff.",
  usage: "<user> <reason>",
  cooldown: 15,
  execute(message, args) {
    const reason = args.slice(1).join(" ");
    let flagman = message.guild.member(message.mentions.users.first());
    if (flagman === 837076791981637712) return message.reply("**you cannot flag me!**")
    console.log(flagman);
    let flaggedman = message.mentions.users.first();
    if (!reason) return message.reply("**please specify a reason!**")
    if(!flagman) return message.reply("**you need to mention a user!**")
    if (flagman.roles.cache.some(role => role.id === db.get(`flag_role_${message.guild.id}`))) return message.reply(`**${flagman} has already been flagged!**`)
    if (flagman.id === message.author.id) return message.reply("**you cannot flag yourself!**");
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
        .setTitle(`✅   **The flag was successful!**`)
        .setDescription(`${flagman} has been flagged - staff members will be alerted of this.`)
        .setTimestamp()

    flagman.roles.add(flagrole.id);
    message.channel.send(flaggedEmbed)

    let currentDate = new Date();
    const flagstaffalertEmbed = new Discord.MessageEmbed()
        .setColor(0x2ECC71)
        .setAuthor(user.username, message.author.avatarURL())
        .setTitle(`**A user was just flagged**`)
        .setDescription(`📊 QUICK STATS:\n\nFlagged user: **${flagman}**\nReason: **${reason}**\nAssigned role: **${flagrole}**\n\n${staffRole} - just pinging to let you know\n`)
        .addFields(
            { name: "🚩 Flagged user:", value: flagman, inline: true},
            { name: "✏ Done by:", value: user.username, inline: true },
            { name: "🕔 Time of flag:", value: currentDate.toLocaleString(), inline: true },
            { name: "❓ Reason:", value: `\`${reason}\``, inline: true },
        )
        .setThumbnail(flaggedman.avatarURL())
        .setTimestamp()

    flagstaffalertchannel.send(flagstaffalertEmbed)

    const flaggeddmEmbed = new Discord.MessageEmbed()
        .setColor(0x2ECC71)
        .setAuthor(user.username, message.author.avatarURL())
        .setTitle(`**You were flagged in \`${message.guild}\`**`)
        .addFields(
            { name: "✏ Done by:", value: user.username, inline: true },
            { name: "🕔 Time of flag:", value: currentDate.toLocaleString(), inline: true },
            { name: "❓ Reason:", value: `\`${reason}\``, inline: true },
        )
        .setThumbnail(flaggedman.avatarURL())
        .setTimestamp()
    flagman.send(flaggeddmEmbed)
  }

}