const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Sends my invite link!',
    aliases: ["inviteme"],
    execute(message) {
        const inviteEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle('Invite Me')
            .setDescription(`${message.author}, here is my invite link: **https://bit.ly/337otKL**`)
			.setTimestamp()
			.setFooter('thx for inviting lol', 'https://th.bing.com/th/id/R2d6ca43b7e0f07f79fb6a65eb0f99883?rik=Xwq7m%2fWIFkrYlg&pid=ImgRaw');
        message.channel.send(inviteEmbed)
    }
}