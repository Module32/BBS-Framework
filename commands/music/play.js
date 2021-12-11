const Discord = require('discord.js');

module.exports = {
    name: "play",
    aliases: ["pl"],
    description: "Play a song in VC!",
    cooldown: 5,
    usage: "[command]+[url] or [song name]",
    async execute(message, args) {
      const client = message.client;
        if(!message.member.voice.channel) 
        return message.reply('**please join a voice channel!**');
        const music = args.join(" "); 
        if(!music) return message.reply("**please provide a song!**");
        await client.distube.play(message, music)
        await message.react('▶️');
    }
}