const Discord = require('discord.js');

module.exports = {
    name: "pause",
    aliases: ["ps"],
    description: "Pause a song that's currently playing!",
    cooldown: 3,
    usage: "[command]",
    async execute(message, args) {
      const client = message.client;
        if(!message.member.voice.channel) 
        return message.reply('**please join a voice channel!**');
        await client.distube.pause(message)
        await message.react('⏸');
    }
}