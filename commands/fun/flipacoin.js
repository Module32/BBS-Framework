const Discord = require('discord.js');

module.exports = {
    name: 'flipacoin',
    description: 'Flips a coin for you.',
    aliases: ["flipcoin"],
    usage: '<side>',
    execute(message, args) {
        theirchoice = ""
        result = ""
        if (args[0] === 'heads' || args[0] === 'h') {
            theirchoice = 'heads';
        } else if (args[0] === 'tails' || args[0] == 't') {
            theirchoice = 'tails';
        } else {
            return message.channel.send(`${message.author}, **that is not a valid side!**`);
        }

        sides = ["heads", "tails"];
        side = sides[Math.floor(Math.random() * sides.length)];

        if (theirchoice === side) {
            result = "🙌 won";
        } else {
            result = "🚨 lost";
        }

        user = message.author
        const helpEmbed = new Discord.MessageEmbed()
			.setColor('c4abff')
			.setTitle(`Hey look, you \`${result}\``)
			.setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
			.setDescription(`Your pick: **${theirchoice}** • Computer pick: **${side}**`)
			.setImage('https://cdn.freelogovectors.net/wp-content/uploads/2018/02/bitcoincash-logo.png')
			.setTimestamp()
			.setFooter('wow look, it\'s dogecoin', 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i_.Hrdvci2bw/v1/1000x-1.jpg');

			return message.channel.send(helpEmbed);
        
    }
}