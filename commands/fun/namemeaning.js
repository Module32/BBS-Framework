const Discord = require('discord.js');

module.exports = {
    name: 'namemeaning',
    execute(message) {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const user = message.author;
        var whodidit = ["Central Intelligence Agency", "Federal Bureau of Investigation", "United States Department of Homeland Security", "Document issued by Dwight D. Eisenhower", "Document issued by Ronald Reagan", "Document issued by Harry S. Truman"];
        var whodidel = whodidit[Math.floor(Math.random() * whodidit.length)];
        const pingingEmbed = new Discord.MessageEmbed()
			.setColor('c4abff')
			.setTitle('A.G.E.N.C.Y stands for **the Assimilated Group Entity of National Cover and Yare**')
            .setDescription(`Information found from: **${whodidel}**`)
            .setAuthor(`${user.username} • Retrieved ${getRandomInt(1940, 1989)} document`, user.avatarURL())
			.setTimestamp()
			.setFooter('the FBI wants to know your location', 'https://pbs.twimg.com/profile_images/1079815143008190466/gU0KQ1GL.jpg');
        message.channel.send(pingingEmbed)
    },
};