const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
    category: 'Clients',
    util: 'close',
    data: new SlashCommandBuilder()
    .setName('close')
    .setDescription('Closes a ticket'),

    async execute(interaction) {
		
        if (interaction.channel.name.includes("ticket") === false && interaction.channel.name.includes("newbot") === false){
            interaction.reply({ content: "This isn't a ticket!", ephemeral: true })
        }
		
        try {
            interaction.channel.send({ content: "✅ Deleting ticket in **5 seconds**. Thanks for contacting staff!" })

        setTimeout(() => {
            interaction.channel.delete()
        }, 5000)
        } catch (err) {
            // dambro
        }
    }
}