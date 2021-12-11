const Discord = require('discord.js');

module.exports = {
    name: "resume",
    aliases: ["rs"],
    description: "Resume a paused song!",
    cooldown: 3,
    usage: "[command]",
    async execute(message, args) {
      const client = message.client;
        if(!message.member.voice.channel) 
        return message.reply('**please join a voice channel!**');
        await client.distube.resume(message)
        await client.distube.pause(message)
        await client.distube.resume(message)
        await message.react('▶');
    }
}