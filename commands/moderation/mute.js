const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');

module.exports = {
  name: "mute",
  description: "Mutes a user for a specified amount of time.",
  usage: "<user> <time>",
  permissions: "MANAGE_GUILD",
  execute(message, args) {
    let tomute = message.guild.member(message.mentions.users.first());
    if(!tomute) return message.reply("**you need to mention a user!**")
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("**I am unable to mute this user!**");
    if (tomute.id === message.author.id) return message.reply("**you cannot mute yourself!**");
    let muterole = message.guild.roles.cache.find(r => r.id === db.get(`mute_role_${message.guild.id}`));

    if(!muterole) return message.reply("**you have not configured a mute role yet!**")

    let mutetime = args[1];
    if(!mutetime) return message.reply("**please specify a time!**");

    tomute.roles.add(muterole.id);
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    setTimeout(function(){
      tomute.roles.remove(muterole.id);
      message.channel.send(`<@${tomute.id}> has been unmuted!\n\n**TIP:** if the user doesn't appear to be muted, check to make sure the bot role is higher than the mute role!`);
    }, ms(mutetime));
  }

}
