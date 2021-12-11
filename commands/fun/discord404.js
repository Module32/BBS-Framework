const Discord = require('discord.js');

module.exports = {
    name: 'discord404',
    help: 'Did you know this about the 404 page?',
    cooldown: 10,
    execute(message) {
        user = message.author
        const snekEmbed = new Discord.MessageEmbed()
			.setColor('c4abff')
			.setTitle('Here\'s something weird: did you know Discord has a secret Snake game in their 404 page? Try it! Click me to visit the 404 page, then click the block with a blue outline.')
            .setDescription(`If you're having trouble finding the game, watch this video: https://www.reddit.com/r/discordapp/comments/i5krhg/i_saw_there_is_a_snake_game_on_the_404_page/`)
            .setAuthor(`${user.username}`, user.avatarURL())
			.setTimestamp()
            .setURL('https://discord.com/wegotanumberonevictoryroyaleyeahfortnitewebouttogetdown')
			.setFooter('the sneks', 'https://i.ytimg.com/vi/4P-MhCtqI04/maxresdefault.jpg');
        message.channel.send(snekEmbed)
    },
};