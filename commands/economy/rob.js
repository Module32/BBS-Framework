const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "rob",
    description: "Lets you rob someone of their Zetas!",
    cooldown: 45,
    execute(message, args) {
        const member = message.mentions.users.first();
        if (!member) return message.reply("**please mention a user to rob!**")
        if (member.id === message.author.id) return message.reply("**you cannot rob yourself!**")
    	const pocket = db.get(`${message.author.id}_pocket_${message.guild.id}`);
        const bank = db.get(`${message.author.id}_bank_${message.guild.id}`);
        let yourearn = 0;
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
        if (pocket + bank < 200 ) return message.reply("**ayo ya little chump, if you're going to rob someone, then you better have 200 Zetas combined**")
        var whodidit = ["Somebody saw you!", "Your boss saw you...", "You got away like *buttah*...", "You dropped a bike loudly but still managed to get away", "An undercover man from the future decided to throw you into an Einstein-Rosen bridge...", "Go away ya little weirdo.", "Zucc the Ducc saw you and gave you a thumbs-up...", "You fell into a trance about puppies in Miami and woke up to a man about to perform CPR on you...", "You got away with a bit of a ruckus...", "You accidentally scattered an old lady's groceries across the ground, but still managed to get away... what is wrong with you..."];
        var whodidel = whodidit[Math.floor(Math.random() * whodidit.length)];
        if (whodidel === "Somebody saw you!") {
            deposit = getRandomInt(-1, 10);
        } else if (whodidel === "Your boss saw you...") {
            deposit = getRandomInt(-1, 5);
        } else if (whodidel === "You got away like *buttah*...") {
            deposit = getRandomInt(30, 300);
        } else if (whodidel === "You dropped a bike loudly but still managed to get away") {
            deposit = getRandomInt(10, 150);
        } else if (whodidel === "An undercover man from the future decided to throw you into an Einstein-Rosen bridge...") {
            deposit = getRandomInt(10, 20);
        } else if (whodidel === "Go away ya little weirdo.") {
            deposit = 0
        } else if (whodidel === "Zucc the Ducc saw you and gave you a thumbs-up...") {
            deposit = getRandomInt(10, 190);
        } else if (whodidel === "You fell into a trance about puppies in Miami and woke up to a man about to perform CPR on you...") {
            deposit = getRandomInt(5, 20);
        } else if (whodidel === "You got away with a bit of a ruckus...") {
            deposit = getRandomInt(30, 270);
        } else if (whodidel === "You accidentally scattered an old lady's groceries across the ground, but still managed to get away... what is wrong with you...") {
            deposit = getRandomInt(0, 190);
        }
        const membermon = db.get(`${member.id}_pocket_${message.guild.id}`);
        db.set(`${message.author.id}_pocket_${message.guild.id}`, pocket + deposit);
        db.set(`${member.id}_pocket_${message.guild.id}`, pocket - deposit);
        const balEmbed = new Discord.MessageEmbed()
        	.setTitle(`🚓 \`${whodidel}\``)
        	.setDescription(`**Your earnings:** \`${deposit}\`**ζ**`)
            .setColor('bcff2b')
            .setFooter(`your pocket money is now: ${db.get(`${message.author.id}_pocket_${message.guild.id}`)}`)
       	message.channel.send(balEmbed)
    }
}