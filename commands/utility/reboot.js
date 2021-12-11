const { DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

module.exports = {
	name: 'reboot',
	description: 'Reboots me entirely for developer use.',
	execute(message) {
		if(message.author.id !== '804777320123990108') return message.reply('**only my owner can use this command!**')
		const rebootWaitingEmbed = new Discord.MessageEmbed()
			.setTitle('`🔄`  Now rebooting **The A.G.E.N.C.Y**...')
			.setTimestamp()

		  function ResetBot(channel) {
			channel.send(rebootWaitingEmbed)
			.then(msg => client.destroy())
			.then(console.log("</> bot was just rebooted"))
			.then(() => client.login("ODM3MDc2NzkxOTgxNjM3NzEy.YInSgw.yEGZlDPPpeeadv80O2QSw_PXfiw"));
		  }
		
		try {
			ResetBot(message.channel);
			const rebootDoneEmbed = new Discord.MessageEmbed()
				.setTitle('✅   **I have been successfully rebooted!**')
				.setColor(0x2ECC71)
				.setTimestamp()
			message.channel.send(rebootDoneEmbed)
		} catch (err) {
			console.log(err);
			const rebootFailEmbed = new Discord.MessageEmbed()
				.setTitle('❌   **I encountered an error when rebooting!**')
				.setDescription(`The error I encountered is below.\n**\`${err}\`**\n\n__**My support server:**__ **https://discord.gg/D7GyNjxSsC**`)
				.setTimestamp()
			message.channel.send(rebootFailEmbed)
		}

	},
};