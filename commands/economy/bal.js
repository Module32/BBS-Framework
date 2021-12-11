const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "bal",
    description: "Shows your balance for this guild.",
    cooldown: 4,
    execute(message, args) {
        let member = message.mentions.users.first();
        if (!member) {
            member = message.author
        }
    	const pocket = db.get(`${member.id}_pocket_${message.guild.id}`)
        const bank = db.get(`${member.id}_bank_${message.guild.id}`)
        if (!pocket) {
        	db.set(`${member.id}_pocket_${message.guild.id}`, 0)
            let pocket = 0;
        }
        if (!bank) {
        	db.set(`${member.id}_bank_${message.guild.id}`, 0)
            let bank = 0;
        }
        const balEmbed = new Discord.MessageEmbed()
        	.setTitle(`**${member.username}**'s balance`)
            .setColor('bcff2b')
            .setThumbnail(member.avatarURL())
            .addFields(
            	{ name: "Pocket", value: `\`${String(pocket).replace(/(.)(?=(\d{3})+$)/g,'$1,')}\`**ζ**` },
                { name: "Bank", value: `\`${String(bank).replace(/(.)(?=(\d{3})+$)/g,'$1,')}\`**ζ**` },
            )
            .setFooter("whys it called 'balance' lolol")
       	message.channel.send(balEmbed)
    }
}