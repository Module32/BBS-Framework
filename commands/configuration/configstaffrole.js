const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'configstaffrole',
    cooldown: 10,
    description: 'Sets the staff role for this guild.',
	guildOnly: true,
    usage: '<role>',
    permissions: "MANAGE_GUILD",
    execute(message, args) {
        let role = message.mentions.roles.first()
        if (!role) return message.channel.send(`${message.author}, **please provide a role!**`)
        db.set(`staff_role_${message.guild.id}`, role.id)
        user = message.author
        const welcomeRoleEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The staff role has been successfully set to \`${role.name}\`!**`)
            .setDescription(`You can also change my \`welcome role\` and \`welcome channel\`!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeRoleEmbed)
    },
};