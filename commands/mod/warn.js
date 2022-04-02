const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders')
const { MessageEmbed, Permissions } = require('discord.js')
const db = require('quick.db');
const uniqid = require('uniqid');

module.exports = {
    category: 'Moderation',
    util: 'warn <@user> [reason]',
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warns a member')
    .addUserOption(option =>
                  option
                  .setName('user')
                  .setDescription('User')
                  .setRequired(true))
    .addStringOption(option =>
                   option
                   .setName('reason')
                   .setDescription('Reason for warn')
                   .setRequired(false)),
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
        if (user2.id === interaction.user.id) return interaction.reply({ content: "You can't warn yourself!", ephemeral: true });
        
        const reason = interaction.options.getString('reason') || "No reason specified";
        
        const kickEmbed = new MessageEmbed()
            .setTitle(`You were warned in **${interaction.guild}**.`)
            .addFields(
                { name: 'Warned by', value: `${user.username}` },
                { name: 'Reason', value: `${reason}`, inline: true },
            )
            .setTimestamp()
        
        await user2.send({ embeds: [ kickEmbed ] }).catch(err => {
			console.log(err);
        })
        
        count = db.get(`warncount_${user2.id}`) || 0;
        db.set(`warncount_${user2.id}`, count + 1);
        
        db.set(`warn-${user2.id}-${db.get(`warncount_${user2.id}`)}`, {
            "mod": interaction.user.id,
            "user": user2.id,
            "reason": reason,
            "date": new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            "id": uniqid()
        })
                
        interaction.reply({ content: `✅ **${user2}** has been warned for: **${reason}**.` });
    }
}