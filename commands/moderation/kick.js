const Discord = require("discord.js");

module.exports = {
	name: 'kick',
	description: 'Kick a user from this guild.',
	guildOnly: true,
    permissions: 'KICK_MEMBERS',
	args: true,
	usage: '<@user> [reason]',
	execute(message, args) {
		const member = message.mentions.users.first();
		if (!member) return message.channel.send(`${message.author}, **the member mentioned is not in this server!**`);
		if (message.channel.type === 'dm') {
			return;
		}
		try {
			user = message.guild.member(member);
		} catch (err) {
			console.log(err);
		}
		if (user === message.author) return message.channel.send(`${message.author}, **you cannot kick yourself!**`)
		let reason = args.slice(1).join(" ");
		if (!reason) reason = "*No reason was specified.*";
		const kickEmbed = new Discord.MessageEmbed()
			.setTitle(`You were kicked from \`${message.guild.name}\`!`)
			.setDescription('To enter the server again, contact someone in there who can invite you.')
			.addFields(
				{ name: 'Reason for kick', value: `*${reason}*` },
			)
			.setColor(0xff4747)
			.setTimestamp()
			.setThumbnail(`${message.guild.iconURL()}`)
		const kickSuccess = new Discord.MessageEmbed()
			.setDescription(`✅   ${user} was successfully kicked!`)
			.setColor(0xff4747)
			.setTimestamp()

		if (!args[0]) return message.channel.send(`${message.author}, **you need to specify a user to kick!**`);
			user.send(kickEmbed).catch(err => {
			console.log(err);
			return message.channel.send(`${message.author}, I encountered an error when trying to kick the member.`);
		})

		try {
			if (user.username === message.author.username) return message.channel.send(`${message.author}, **you cannot kick yourself!**`);
			user.kick();
			message.channel.send(kickSuccess);
		} catch (err) {
			console.log(err);
			return message.channel.send(`${message.author}, I encountered an error when trying to kick the member.`);
		}
	},
};