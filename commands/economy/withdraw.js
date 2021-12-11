const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "withdraw",
    description: "Lets you withdraw Zetas from your bank!",
    cooldown: 4,
    execute(message, args) {
    	const pocket = db.get(`${message.author.id}_pocket_${message.guild.id}`);
        const bank = db.get(`${message.author.id}_bank_${message.guild.id}`);
        const deposit = args[0];
        if (!pocket) {
        	db.set(`${message.author.id}_pocket_${message.guild.id}`, 0)
            let pocket = 0;
        }
        if (!bank) {
        	db.set(`${message.author.id}_bank_${message.guild.id}`, 0)
            let bank = 0;
            return message.reply("**you don't have any Zetas in your bank!**");
        }
        if (deposit > bank) return message.reply("**you do not have enough Zetas for that!**")
        if (deposit < 0) return message.reply("**you cannot input a negative number!**")
        if (deposit === "all") {
        	db.set(`${message.author.id}_bank_${message.guild.id}`, 0)
        	db.set(`${message.author.id}_pocket_${message.guild.id}`, pocket + bank)
        } else if (isNaN(parseInt(deposit))) {
        	return message.reply("**the value must be a numeric value!**")
        } else {
        	db.set(`${message.author.id}_bank_${message.guild.id}`, parseInt(bank) - parseInt(deposit))
        	db.set(`${message.author.id}_pocket_${message.guild.id}`, parseInt(pocket) + parseInt(deposit))
        }
        const handoffEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **You have withdrawn \`${deposit}\` Zetas out of your bank!**`)
            .setAuthor(`${message.author.username}`, message.author.avatarURL())
            .setTimestamp()
            .setFooter(`your pocket now has ${String(db.get(`${message.author.id}_pocket_${message.guild.id}`)).replace(/(.)(?=(\d{3})+$)/g,'$1,')}ζ - agency economy bleh`)
        message.channel.send(handoffEmbed)
    }
}