const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    help: 'Gets the avatar of a user.',
    usage: '<user>',
    execute(message, args) {
        let ment_user = message.mentions.users.first();
        if (!ment_user) ment_user = message.author
        let user = message.author
        const pingingEmbed = new Discord.MessageEmbed()
			.setColor('c4abff')
			.setTitle(`**${ment_user.username}'s** profile picture`)
            .setImage(ment_user.avatarURL({size:2048,dynamic:true}))
            .setAuthor(`${user.username}`, user.avatarURL())
			.setTimestamp()
			.setFooter('imagine paying nitro for an anime girl\npfp that blinks when you hover over\nit smh', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpmfMyreeEpkydPIwvuBqDdTfql28RB9-dJdYRt8ZYvl9o85zYf1tGbKk62Oeshj_-DjU&usqp=CAU');
        message.channel.send(pingingEmbed)
    },
};