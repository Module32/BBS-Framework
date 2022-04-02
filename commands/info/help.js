const { SlashCommandBuilder, inlineCode, codeBlock } = require('@discordjs/builders')
const { MessageEmbed, Permissions } = require('discord.js')
const db = require('quick.db');
const fs = require('fs');

module.exports = {
    category: 'Moderation',
    util: 'kick <@user> [reason]',
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get the commands!'),
    async execute(interaction) {
        commands = {};
        fs.readdirSync(__dirname + '/../../commands').forEach(dirs => {
            const commandFiles = fs.readdirSync(__dirname + `/../../commands/${dirs}`).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(__dirname + `/../../commands/${dirs}/${file}`);
                if (commands[dirs]) {
                    commands[dirs] = `${commands[dirs]}\n${command.data.name}`
                } else {
                    commands[dirs] = command.data.name;
                }
            }
        })
        console.log(commands);
        let embed = new MessageEmbed()
        	.setTitle("Help Panel")
        	.setTimestamp()
        for (let key in commands) {
            embed.addField(key, `**${codeBlock(commands[key])}**`, false);
        }
        interaction.reply({ embeds: [ embed ] });
    }
}