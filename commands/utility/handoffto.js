const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');

module.exports = {
    name: 'handoffto',
    description: 'Handoffs permissions to server members for a temporary amount of time.',
    usage: '<user>',
    permissions: 'MANAGE_GUILD',
    cooldown: 5,
    execute(message, args) {
        let handoffuser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!handoffuser) return message.reply("**please specify a user to handoff to!**")
        let handoffrole = message.guild.roles.cache.find(r => r.id === db.get(`handoff_role_${message.guild.id}`));
        let time = args[1];
        let desc = ""   
        if (!time) return message.reply("**please specify a time to handoff!**")
        handoffuser.roles.add(handoffrole);
        user = message.author
        const handoffEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **You have successfully handed off your permissions!**`)
            .setDescription(`${handoffuser} will have the handoff role, **${handoffrole}**, for \`${time}\` by **${user.username}**`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(handoffEmbed)

        setTimeout(function(){
            handoffuser.roles.remove(handoffrole.id);
            if (time === "10000000000000000h") {
                console.log("handoff done 100000000000");
            } else {
                const handoffEmbed = new Discord.MessageEmbed()
                    .setColor(0x2ECC71)
                    .setTitle(`✅   **Handoff has been removed!**`)
                    .setDescription(`${handoffuser}'s handoff role was set to expire in \`${time}\` by **${user.username}**.`)
                    .setAuthor(`${user.username}`, user.avatarURL())
                    .setTimestamp()
                message.channel.send(handoffEmbed)
            }
          }, ms(time));

    }
}