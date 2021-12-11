const Discord = require('discord.js');

module.exports = {
	name: "moderate",
    description: "Moderates a user's nickname.",
    guildOnly: true,
    permissions: "ADMINISTRATOR",
    async execute(message, args) {
    	try {
            let user = await message.guild.member(message.mentions.users.first());
            if (!user) return message.reply("**please provide a user!**")
            let reason = args.slice(1).join(" ");
            if (!reason) reason = "None"
            await user.setNickname(`[ MODERATED ]`, `User was moderated - reason: ${reason}`);
            const notifyverifyEmbed = new Discord.MessageEmbed()
                .setColor(0x2ECC71)
                .setTitle('✅  **That user\'s nickname has been moderated!**')
                .setDescription(`${user} was moderated for the following reason: \`${reason}\``)
                .setTimestamp()
            await message.channel.send(notifyverifyEmbed)
        } catch (err) {
            console.log(err);
        }
    }
}