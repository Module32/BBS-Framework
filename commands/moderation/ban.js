const Discord = require("discord.js");

module.exports = {
	name: 'ban',
	description: 'Bans a user from this guild.',
	guildOnly: true,
    permissions: 'BAN_MEMBERS',
	args: true,
	usage: '<@user> [reason]',
	execute(message, args) {
		const member = message.mentions.users.first();
		if (!member) return message.channel.send(`${message.author}, **the member mentioned is not in this server!**`);
		user = message.guild.member(member)
		if (user === message.author) return message.channel.send(`${message.author}, **you cannot ban yourself!**`)
		let reason = args.slice(1).join(" ");
		if (!reason) reason = "*No reason was specified.*";
		const kickEmbed = new Discord.MessageEmbed()
			.setTitle(`You were banned from \`${message.guild.name}\`!`)
			.setDescription('To enter the server again, contact someone in there who can revoke your ban.')
			.addFields(
				{ name: 'Reason for ban', value: `*${reason}*` },
			)
			.setColor(0xff4747)
			.setTimestamp()
			.setThumbnail(`${message.guild.iconURL()}`)
		const kickSuccess = new Discord.MessageEmbed()
			.setDescription(`✅   ${user} was successfully banned!`)
			.setColor(0xff4747)
			.setTimestamp()

		if (!args[0]) return message.channel.send(`${message.author}, **you need to specify a user to ban!**`);
			user.send(kickEmbed).catch(err => {
			console.log(err);
			return message.channel.send(`${message.author}, I encountered an error when trying to ban the member.`);
		})

		try {
			if (user.username === message.author.username) return message.channel.send(`${message.author}, **you cannot ban yourself!**`);
			user.ban();
			message.channel.send(kickSuccess);
		} catch (err) {
			console.log(err);
			return message.channel.send(`${message.author}, I encountered an error when trying to kick the member.`);
		}
	},
};