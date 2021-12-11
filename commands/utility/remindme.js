const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');

module.exports = {
  name: "remindme",
  description: "Sets a reminder for you.",
  cooldown: 4,
  usage: "<time> <reason>",
  execute(message, args) {
    if (!args[0]) return message.reply("**please provide a time!**")
    var reason = args.slice(1).join(" ");
    if (!reason) return message.reply("**please provide a reason for your reminder!**")
    let time = ms(args[0]);
    message.reply(`**done! I will remind you about this in \`${ms(ms(args[0], { long:true }))}\`.**`);
    var user = message.author
    const reminderEmbed = new Discord.MessageEmbed()
            .setColor('cfeaff')
            .setTitle('**Your reminder is up!**')
            .setDescription(`${user} - ping`)
            .addFields(
                { name: "Time", value: ms(ms(args[0], { long:true })), inline: true },
                { name: "Reminder reason", value: reason, inline: true }
            )
            .setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
            .setTimestamp()
            .setFooter('wake me up when it\'s all over', 'https://upload.wikimedia.org/wikipedia/en/d/da/Avicii_Wake_Me_Up_Official_Single_Cover.png');

    setTimeout(function(){
      try {
           message.channel.send(reminderEmbed);
      } catch (err) {
          console.log(err);
          message.channel.send(`${user} - ${reason}`)
      }
    }, time);
  }
}