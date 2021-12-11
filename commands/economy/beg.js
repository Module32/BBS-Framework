const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "beg",
    description: "Lets you beg for Zetas!",
    cooldown: 30,
    execute(message, args) {
    	const pocket = db.get(`${message.author.id}_pocket_${message.guild.id}`)
        const bank = db.get(`${message.author.id}_bank_${message.guild.id}`)
        if (!pocket) {
        	db.set(`${message.author.id}_pocket_${message.guild.id}`, 0)
            let pocket = 0;
        }
        if (!bank) {
        	db.set(`${message.author.id}_bank_${message.guild.id}`, 0)
            let pocket = 0;
        }
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const theirearnings = getRandomInt(-1, 300)
        db.set(`${message.author.id}_pocket_${message.guild.id}`, (db.get(`${message.author.id}_pocket_${message.guild.id}`) + theirearnings))
        var whodidit = ["the Central Intelligence Agency", "the Federal Bureau of Investigation", "the United States Department of Homeland Security", "Dwight D. Eisenhower", "Ronald Reagan", "Harry S. Truman", "Apple", "Ducc the zucc", "Donald Duck", "a Microsoft employee", "an Apple Employee", "Tim Cook", "Kuku", "Module64", "Mr.[ CONTENT REDACTED ]", "the umbrella man", "the purple guy", "Freddy", "Jake Paul", "my boss", "the good folks at Discord", "somebody", "God", "Taylor Swift", "The Weeknd", "Ariana Grande", "we the people", "somebody"];
        var whodidel = whodidit[Math.floor(Math.random() * whodidit.length)];
        const balEmbed = new Discord.MessageEmbed()
        	.setTitle(`Hey, \`${whodidel}\` gave you **${theirearnings} Zetas**`)
            .setColor('bcff2b')
            .setFooter(`your pocket money is now: ${db.get(`${message.author.id}_pocket_${message.guild.id}`)}`)
       	message.channel.send(balEmbed)
    }
}