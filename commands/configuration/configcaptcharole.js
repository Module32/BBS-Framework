const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'configcaptcharole',
    help: "Configures the CAPTCHA role for your server.",
    guildOnly: true,
    usage: "<role>",
    cooldown: 10,
    permissions: "MANAGE_GUILD",
    execute(message, args) {
        arg = args.join(" ");
        let role = message.mentions.roles.first();
        if (!arg[1]) return message.reply("**please provide a role!**")
        if (!role) return message.channel.send(`${message.author}, **please provide a role!**`)
        db.set(`captcha_role_${message.guild.id}`, role.id)
        let capsys = db.get(`captcha_system_${message.guild.id}`)
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (!prefix) prefix = ";"
        let ensure = ""
        if (!capsys) {
            ensure = `❌  **CAPTCHA is not yet configured.** Run \`${prefix}configcaptcha\` to configure it.`
        } else if (capsys === "false") {
            ensure = `❌  **CAPTCHA is disabled on this server.** Run \`${prefix}configcaptcha true\` to enable it.`
        } else {
            ensure = `✅  CAPTCHA is enabled on this server.`
        }
        user = message.author
        const welcomeRoleEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The captcha role has been successfully set to \`${role.name}\`.**`)
            .setDescription(`${ensure}\n\nYou can also change my \`welcome role\` and \`captcha blocking\`!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeRoleEmbed)
    }
}