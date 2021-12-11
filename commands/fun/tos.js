const Discord = require('discord.js');

module.exports = {
    name: 'tos',
    help: "Creates a custom Terms of Service message.",
    usage: "<tos_message>",
    execute(message, args) {
        user = message.author
        const tosmsg = args.slice(0).join(" ");
        if (!tosmsg) return message.reply("**include a condition to agree to ya buckbeard**")
        const tosEmbed = new Discord.MessageEmbed()
			.setColor('c4abff')
			.setTitle(`__TERMS OF SERVICE__`)
            .setDescription(`\`\`\`Please read these Terms of Services ("Terms", "Terms of Service") carefully before using the Discord website (the "Service") operated by ${message.guild}, Inc. ("us", "we", or "our").\n\nBy accessing this service and accepting the Terms of Service, you agree to the following terms:\`\`\`\n**${tosmsg}**\n\`\`\`❏ I agree to the Terms of Service.\`\`\``)
            .setAuthor(`${user.username}`, user.avatarURL())
			.setTimestamp()
			.setFooter('you must agree to tos lol', 'https://img.hacerfamilia.com/fotoweb/fotonoticia_20180509121923_1024.jpg');
        const toswowEmbed = new Discord.MessageEmbed()
			.setColor('00ff00')
			.setTitle(`Literally **everyone** agreed to your TOS`)
			.setTimestamp()
			.setFooter('they agreed', 'https://img.hacerfamilia.com/fotoweb/fotonoticia_20180509121923_1024.jpg');
        message.channel.send(tosEmbed)
        message.channel.send(toswowEmbed)
    }
}