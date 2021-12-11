const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'confighandoffrole',
    cooldown: 10,
    description: 'Sets the handoff role for this guild.',
	guildOnly: true,
    usage: '<role>',
    permissions: "MANAGE_GUILD",
    execute(message, args) {
        let role = message.mentions.roles.first()
        if (!role) return message.channel.send(`${message.author}, **please provide a role!**`)
        db.set(`handoff_role_${message.guild.id}`, role.id)
        user = message.author
        const handoffEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The handoff role has been successfully set to \`${role.name}\`!**`)
            .setDescription(`You can also change my \`mute role\` and \`welcome role\`!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(handoffEmbed)
    },
};