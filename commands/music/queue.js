const Discord = require('discord.js');

module.exports = {
    name: "queue",
    aliases: ["q"],
    description: "Checks the music queue for the VC",
    cooldown: 5,
    async execute(message, args) {
      const client = message.client;
        if(!message.member.voice.channel)
         return message.reply('**please join a voice channel!**');
        const queue = client.distube.getQueue(message);
        await message.channel.send(`Current queue:\n${queue.songs.map((song, id) => `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n')}`);
    }
}