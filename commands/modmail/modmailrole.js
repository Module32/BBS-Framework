const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "modmailrole",
    description: "Sets the modmail role for this guild.",
    permisions: "MANAGE_GUILD",
    async execute(message, args) {
        if (!args.length) return message.reply("**please mention a role!**")
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) return message.reply("**I couldn't find that role!**")
        db.set(`modmail_role_${message.guild.id}`, role.id);
        const welcomeRoleEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`\`✅\`   **The modmail role has been successfully set to \`${role.name}\`!**`)
            .setDescription(`You can also change my \`welcome role\` and \`flag\` role!`)
            .setAuthor(`${message.author.username}`, message.author.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeRoleEmbed)
    }
}