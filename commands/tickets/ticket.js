const { SlashCommandBuilder, codeBlock, inlineCode } = require('@discordjs/builders')
const { MessageEmbed, Permissions } = require('discord.js')
const db = require('quick.db');

module.exports = {
    util: '<reason>',
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Opens a ticket')
        .addStringOption(option =>
            option
            .setName('reason')
            .setDescription('Reason for creating the ticket')
            .setRequired(true)),
  	async execute(interaction) {
      const current_tickets = interaction.guild.channels.cache.find(chan => chan.name === `ticket-${interaction.user.username.toLowerCase().split(" ").join("-").replace(/[^a-zA-Z0-9 ]/g, '')}`);
      let reason = interaction.options.getString('reason');
      interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                    id: interaction.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
                },
            ],
        }).then(async channel => {
          interaction.reply({ content: `Ticket successfully created! Find it at <#${channel.id}>.`, ephemeral: true });
          const newTicketEmbed = new MessageEmbed()
            .setTitle("👋 **Welcome!** Staff will be with you very soon.")
            .addFields(
              { name: "Reason", value: codeBlock(reason) }
            )
          try {
              channel.send({ embeds: [ newTicketEmbed ] });
          } catch (err) {
              console.log(err);
          }
        })
    }
}