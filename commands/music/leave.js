const Discord = require('discord.js');

module.exports = {
    name: "leave",
	description: "Lets me leave a VC.",
    cooldown: 5,
    async execute(message, args) {
      const client = message.client;
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) 
        return message.channel.send("**I'm not in a voice channel!**")
        try {
            voiceChannel.leave()
        } catch(error) {
            return message.channel.send(`**Something went wrong when I tried to leave the VC:**\n\`${error}\``)
        }
    }
}