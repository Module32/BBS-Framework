const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "setmembergoal",
    description: "Sets the member count goal for this server.",
    usage: "<channel>",
    cooldown: 10,
    execute(message, args) {
        let goal = Math.floor(args[0]);
        if (!goal) return message.reply("**please provide a goal!**")
        if (goal < 0) return message.reply("**the goal may not be negative!**")
        if (isNaN(goal)) return message.reply("**the goal must be a numeric value!**")
        db.set(`member_track_count_${message.guild.id}`, parseInt(goal))
        user = message.author
        const welcomeChannelEmbed = new Discord.MessageEmbed()
            .setColor(0x2ECC71)
            .setTitle(`✅   **The member count goal has been successfully set to \`${goal}\`!**`)
            .setDescription(`You can also change my \`member count\` channel and \`welcome\` channel!`)
            .setAuthor(`${user.username}`, user.avatarURL())
            .setTimestamp()
        message.channel.send(welcomeChannelEmbed)
    }
}