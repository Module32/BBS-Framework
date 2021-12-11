const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'modmailcategory',
    description: "Sets the category for modmail.",
    permissions: "MANAGE_GUILD",
    async execute(message, args) {
        if (!args.length) return message.reply("**please provide a category ID!**")
        const category = message.guild.channels.cache.find(ch => ch.type == "category" && ch.id == args[0]);
        if (!category) return message.reply("**I could not find the given category!**")
        db.set(`modmail_category_${message.guild.id}`, category.id)
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`\`✅\`   **The modmail category has been successfully set to \`${category.name}\`!**`)
            .setDescription(`You can also change my \`goodbye\` channel and \`welcome\` channel!`)
            .setAuthor(`${message.author.username}`, message.author.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    }
}