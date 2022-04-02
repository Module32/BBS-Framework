const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    category: 'Utility',
    util: 'ping',
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Sends the bot\'s ping'),
  	async execute(interaction) {
        const client = interaction.client
        let ping = Date.now() - interaction.createdTimestamp;
        const pingEmbed = new MessageEmbed()
        	.setDescription(`**${ping}**ms`)
        interaction.reply({ embeds: [pingEmbed] })
    }
}
