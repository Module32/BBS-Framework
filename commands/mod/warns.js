const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders')
const { MessageEmbed, Permissions } = require('discord.js')
const db = require('quick.db');
const uniqid = require('uniqid');

module.exports = {
    category: 'Moderation',
    util: 'warns <@user>',
    data: new SlashCommandBuilder()
    .setName('warns')
    .setDescription('Gets all the warns of a user')
    .addUserOption(option =>
                  option
                  .setName('user')
                  .setDescription('User')
                  .setRequired(true)),
    async execute(interaction) {
        const user = interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        let whitelist = String(db.get(`whitelist_${interaction.guild.id}`)) || "";
        console.log(whitelist);
        if (!whitelist) whitelist = "";
        if (!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            if (!whitelist.split(",").includes(user.id)) return interaction.reply({ content: "You do not have permissions to use this command!", ephemeral: true });
        }
        const member2 = interaction.options.getUser('user')
        const user2 = await interaction.guild.members.fetch(member2.id)
        
        count = db.get(`warncount_${user2.id}`) || 0;
        console.log(db.get(`warn_${user2.id}_0`))
        
        const warns = new MessageEmbed()
        	.setTitle(`${member2.username}'s warns`)
        	.setTimestamp()
        
        for (let i = count; i > 0; i--) {
            console.log(i);
            let warn = db.get(`warn-${user2.id}-${i}`)
            try {
                warns.addField(`Warned on ${warn.date}`, `>>> Warned by **<@${warn.mod}>**\nReason: **${warn.reason}**\nID: ${inlineCode(warn.id)}`)
            } catch (err) {
                console.log(err);
            }
        }
        
        interaction.reply({ embeds: [ warns ] });
    }
}