const { DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const client = new Discord.Client();

module.exports = {
	name: 'reload',
	description: 'Reloads a command for developer use.',
	args: true,
	usage: '<command>',
	execute(message, args) {
		if(message.author.id !== '804777320123990108') return message.reply('**only my owner can use this command!**')
		const user = message.author;
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		let prefix = db.get(`prefix_${message.guild.id}`);
		if (!prefix) {
			prefix = ";"
		} else {
			prefix = prefix
		}
		if (commandName === "all") return message.reply(`**reboot me to reload all of my commands! \`${prefix}reboot\`**`)
		if (!command) {
			return message.channel.send(`I could not find a command called **\`${commandName}\`**, ${message.author}!`);
		}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const success = client.emojis.cache.get("837452734503321661");
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			const reloadSuccessEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
			.setTitle(`✅   I successfully reloaded the **\`${newCommand.name}\`** command!`)
			.setTimestamp()
			.setFooter('this command is for supah cool devs', 'https://exaud.com/wp-content/uploads/2020/09/software-skills.png');
			message.channel.send(reloadSuccessEmbed);
		} catch (error) {
			console.error(error);
			const reloadFailureEmbed = new Discord.MessageEmbed()
			.setColor(0xff4747)
			.setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
			.setTitle(`❌   Something went wrong while reloading the **\`${newCommand.name}\`** command!`)
			.setTimestamp()
			.setFooter('this command is for supah cool devs', 'https://exaud.com/wp-content/uploads/2020/09/software-skills.png');
			message.channel.send(reloadFailureEmbed);
		}
	},
};