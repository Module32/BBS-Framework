const GeniusLyrics = require('genius-lyrics-fetcher');
const Discord = require('discord.js');

module.exports = {
    name: 'lyrics',
    help: "Gets the lyrics of a song based on its title.",
    usage: "<title>",
    cooldown: 2,
    execute(message, args) {
        const TOKEN = "7FVk4QvgCVnowUYkmbuLJEe3F8B7oSasERkFN3148N36JQkcYUpOPUG4rfVE-WDa";
        const client = new GeniusLyrics.Client(TOKEN);
        const result = client.fetch("San Francisco Street", "Sun Rai");
        message.channel.send(result);
    }
}