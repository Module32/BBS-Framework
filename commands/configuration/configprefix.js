var db = require('quick.db');
var Discord = require('discord.js');
const fs = require('fs');
var { prefix, token } = require('../../config.json');

module.exports = {
    name: 'configprefix',
    permissions: 'MANAGE_GUILD',
    description: 'Sets a custom prefix for this guild.',
	guildOnly: true,
    usage: '<prefix>',
    permissions: "MANAGE_GUILD",
    execute(message, args) {
            args = args;
            let prefixes = db.fetch(`prefix_${message.guild.id}`);
            if (prefixes === null) {
                prefix = ";"
            } else {
                prefix = prefixes;
            }
            if (!args[0]) return message.channel.send(`${message.author}, **please specify a new prefix!**`)
            if (args[0].length > 3) return message.channel.send(`${message.author}, **my prefix can only be under three characters!**`)
            db.set(`prefix_${message.guild.id}`, args[0])
            user = message.author
            const newprefixEmbed = new Discord.MessageEmbed()
                .setColor(0x2ECC71)
                .setTitle(`✅   **My prefix has been successfully set to \`${args[0]}\`!**`)
                .setDescription(`Change my prefix again by running this command: \`${args[0]}configprefix <prefix>\``)
                .setAuthor(`${user.username}`, user.avatarURL())
                .setTimestamp()
            message.channel.send(newprefixEmbed)
    },
};