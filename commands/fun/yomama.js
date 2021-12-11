const Discord = require('discord.js');
const yomama = require('yo-mamma').default;

module.exports = {
    name: 'yomama',
    description: "Yo  m a m m a  jokes.",
    cooldown: 1,
    execute(message) {
        let mama = yomama();
        user = message.author;
        const mamaEmbed = new Discord.MessageEmbed()
			.setColor('f9d1ff')
			.setTitle(mama)
            .setDescription(`Dang man, that's your mama huh`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setThumbnail('https://yt3.ggpht.com/ytc/AAUvwnhXZsdgBrrE1QjBJaQRjULMmT7TusgSbbt4JGPBMA=s900-c-k-c0x00ffffff-no-rj')
			.setTimestamp()
			.setFooter('yo mama so fat- *FBI OPEN UP*', 'https://yt3.ggpht.com/ytc/AAUvwnhXZsdgBrrE1QjBJaQRjULMmT7TusgSbbt4JGPBMA=s900-c-k-c0x00ffffff-no-rj');
        message.channel.send(mamaEmbed)
    },
};