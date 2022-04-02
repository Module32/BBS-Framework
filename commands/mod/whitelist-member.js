const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db');

module.exports = {
    category: 'Moderation',
    util: 'whitelist-member <@user>',
    data: new SlashCommandBuilder()
    .setName('whitelist-member')
    .setDescription('Whitelists a member for running mod commands')
    .addUserOption(option =>
                  option
                  .setName('user')
                  .setDescription('User')
                  .setRequired(true)),
    async execute(interaction) {
        const user = interaction.user;
        
        const member2 = interaction.options.getUser('user')
        const user2 = await interaction.guild.members.fetch(member2.id)
        whitelisted = String(db.get(`whitelist_${interaction.guild.id}`)) || "";
        console.log(whitelisted);
        if (whitelisted.split(",").includes(user2.id)) return interaction.reply({ content: "This user is already whitelisted!", ephemeral: true });
        db.set(`whitelist_${interaction.guild.id}`, whitelisted + "," + String(user2.id));
        interaction.reply({ content: "✅ This user has successfully been whitelisted." })
    }
}