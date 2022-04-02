const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders')
const { MessageEmbed, Permissions, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
const db = require('quick.db');

module.exports = {
    category: 'Moderation',
    util: 'warn <@user> [reason]',
    data: new SlashCommandBuilder()
    .setName('delwarn')
    .setDescription('Deletes a member\'s warn(s)')
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
        if (user2.id === interaction.user.id) return interaction.reply({ content: "You can't delete your own warns!", ephemeral: true });
        count = db.get(`warncount_${user2.id}`) || 0;
        let options = [];
        for (let i = count; i > 0; i--) {
            let warn = db.get(`warn-${user2.id}-${i}`)
            try {
                options.push({ label: `Warn ${warn.id}`, description: `On ${warn.date} for: ${warn.reason}.`, value: `${i}`});
            } catch (err) {
                console.log(err);
            }
        }
        if (options.join() === "") return interaction.reply({ content: 'This user has no warns! Dang that\'s impressive...', ephemeral: true })
        let row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('delwarn')
					.setPlaceholder('No warn selected')
                	.addOptions(options),
            );
        let row2 = new MessageActionRow()
			.addComponents(
				new MessageButton()
                        .setCustomId('delallwarns')
                        .setLabel('Delete all warns')
                        .setStyle('DANGER'),
            );
        const embed = new MessageEmbed()
        	.setTitle(`Delete ${member2.username}\'s warn(s)`)
        	.setTimestamp()
        count = db.get(`warncount_${user2.id}`) || 0;
        interaction.reply({ embeds: [ embed ], components: [ row, row2 ] })
    }
}