const Discord = require('discord.js');

module.exports = {
    name: 'purge',
    description: 'Deletes a specified amount of messages in bulk in a text channel.',
    usage: '<message_amount>',
    permissions: 'MANAGE_MESSAGES',
    cooldown: 3,
    async execute(message, args) {
        user = message.author
        const pursueEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
            .setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
			.setTitle(`✅   **I successfully deleted \`${args[0]}\` messages!**`)
			.setTimestamp()
        msg_amt = args[0]
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.reply('**my role is not high enough on the role hierarchy! Move it high enough to give me administrator permissions.**')
        const amt = Number(args[0], 10);
        if(isNaN(amt)) return await message.reply('**that is not a valid number!**')
        if (!Number.isInteger(amt)) return await message.reply('**you must have a whole number!**')
        if (!amt || amt < 2 || amt > 100) return await message.reply('**you can only pursue between `2` to `100` messages!**')

        try {
            await message.channel.bulkDelete(parseInt(args[0]));
            themsg = await message.channel.send(pursueEmbed)
            setTimeout(function() {
               themsg.delete();
            }, 5000);
        } catch (err) {
            console.log(err);
            await message.reply('**the messages you are trying to pursue must be less than 2 weeks old!**');
        }
    }
}