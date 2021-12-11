const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');

module.exports = {
  name: "unmute",
  description: "Unmutes a user.",
  usage: "<user>",
  permissions: "MANAGE_GUILD",
  execute(message, args) {
    let tomute = message.guild.member(message.mentions.users.first());
    if(!tomute) return message.reply("**you need to mention a user!**")
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**you do not have the correct permissions to complete this!**");
    if (tomute.id === message.author.id) return message.reply("**you cannot unmute yourself!**");
    let muterole = message.guild.roles.cache.find(r => r.id === db.get(`mute_role_${message.guild.id}`));

    if(!muterole) return message.reply("**you have not configured a mute role yet!**")

    tomute.roles.remove(muterole.id);
    message.reply(`<@${tomute.id}> has been unmuted successfully!`);

}
}