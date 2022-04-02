const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders')
const { MessageEmbed, Permissions } = require('discord.js')
const db = require('quick.db');

module.exports = {
    category: 'Moderation',
    util: 'ban <@user> [reason]',
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the guild')
    .addUserOption(option =>
                  option
                  .setName('user')
                  .setDescription('User')
                  .setRequired(true))
    .addStringOption(option =>
                   option
                   .setName('reason')
                   .setDescription('Reason for kick')
                   .setRequired(false)),
    async execute(interaction) {
        const user = interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        if (!member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            if (db.get(`whitelist_${interaction.guild.id}`).includes(user.id)) return;
            return interaction.reply({ content: "You do not have permissions to use this command!", ephemeral: true });
        }
        const member2 = interaction.options.getUser('user')
        const user2 = await interaction.guild.members.fetch(member2.id)
        if (user2.id === interaction.user.id) return interaction.reply({ content: "You can't ban yourself!", ephemeral: true });
        
        const reason = interaction.options.getString('reason') || "No reason";
        
        const kickEmbed = new MessageEmbed()
            .setTitle(`You were banned from **${interaction.guild}**.`)
            .addFields(
                { name: 'Banned by', value: `${user.username}` },
                { name: 'Reason', value: `${reason}`, inline: true },
            )
            .setTimestamp()
        
        await user2.send({ embeds: [ kickEmbed ] }).catch(err => {
			console.log(err);
        })
        
        try {
			await user2.ban();
			await interaction.reply({ content: `✅ ${user2} has been banned.` });
		} catch (err) {
            console.log(err)
			await interaction.reply({ content: `I encountered an error when banning the user. Open a ticket in BBS with the following error code: ${inlineCode(err)}`, ephemeral: true })
		}
    }
}