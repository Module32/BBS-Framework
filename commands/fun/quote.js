const Discord = require('discord.js');

module.exports = {
    name: 'quote',
    help: 'Quotes you. Be sure to say something inspirational, kiddo.',
    cooldown: 5,
    usage: '<yourquote>',
    execute(message, args) {
        const text = args.join(" ");
        if(!text) return message.reply("**please specify something to quote!**").then(msg => {
            msg.delete({ timeout: 30000 })
        })
        user = message.author
        const quoteEmbed = new Discord.MessageEmbed()
			.setColor('c4abff')
            .setAuthor(user.username, user.avatarURL())
			.setTitle(`A wise man once said, "${text}"`)
			.setTimestamp()
			.setFooter('what inspiration, muwah', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasOK4mCV0Kxk2XEv7GsEvAU0_YgTzQxuNNg&usqp=CAU');
        message.channel.send(quoteEmbed);
    }
}