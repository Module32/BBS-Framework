const googleIt = require('google-it');
const got = require('got');
const { stringify } = require('querystring');
const Discord = require("discord.js");
const { execute } = require('./help');

module.exports = {
     name: "google",
     description: "Lets you Google things!",
     cooldown: 10,
     usage: "<query>",
     async execute(message, args) {
         if(!args.length) return message.channel.send('I need to know what to search...')
         const embed = new Discord.MessageEmbed()
            .setTitle("Google Results")
         	.setColor('037ffc')
            .setDescription(`Just as a reminder, your query was: \`${args.slice(0).join(" ")}\``)
            .setTimestamp()

        googleIt({'query': args.slice(0).join(" ")}).then(results => {
            results.forEach(function(item, index) { 
                embed.addField(item.title, `**\`>\` ${item.link}**`);
            });

            message.channel.send(embed);
        }).catch(e => {
            console.log(e);
            message.channel.reply(`**I ran into an error: \`${e}\``);
        });
         }
 }
