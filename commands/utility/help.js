const { prefix } = require('../../config.json');
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: "help",
	description: 'Shows my commands or information about a certain command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 4,
	execute(message, args) {
		const prefix = db.get(`prefix_${message.guild.id}`) || ";";
		const user = message.author;
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			let mod_cmds = fs.readdirSync(__dirname + '/../../commands/moderation').filter(file => file.endsWith('.js'));
    		let mod_map = mod_cmds.map(a => a.replace(".js", ""))
    		let mod_arr = Array.from(mod_map)

			let community_cmds = fs.readdirSync(__dirname + '/../../commands/community').filter(file => file.endsWith('.js'));
    		let community_map = community_cmds.map(a => a.replace(".js", ""))
    		let community_arr = Array.from(community_map) 

			let config_cmds = fs.readdirSync(__dirname + '/../../commands/configuration').filter(file => file.endsWith('.js'));
    		let config_map = config_cmds.map(a => a.replace(".js", ""))
    		let config_arr = Array.from(config_map) 

			let eco_cmds = fs.readdirSync(__dirname + '/../../commands/economy').filter(file => file.endsWith('.js'));
    		let eco_map = eco_cmds.map(a => a.replace(".js", ""))
    		let eco_arr = Array.from(eco_map) 

			let fun_cmds = fs.readdirSync(__dirname + '/../../commands/fun').filter(file => file.endsWith('.js'));
    		let fun_map = fun_cmds.map(a => a.replace(".js", ""))
    		let fun_arr = Array.from(fun_map) 

			let modmail_cmds = fs.readdirSync(__dirname + '/../../commands/modmail').filter(file => file.endsWith('.js'));
    		let modmail_map = modmail_cmds.map(a => a.replace(".js", ""))
    		let modmail_arr = Array.from(modmail_map)

			let music_cmds = fs.readdirSync(__dirname + '/../../commands/music').filter(file => file.endsWith('.js'));
    		let music_map = music_cmds.map(a => a.replace(".js", ""))
    		let music_arr = Array.from(music_map)
			
			let ticket_cmds = fs.readdirSync(__dirname + '/../../commands/ticket').filter(file => file.endsWith('.js'));
    		let ticket_map = ticket_cmds.map(a => a.replace(".js", ""))
    		let ticket_arr = Array.from(ticket_map)
			
			let utility_cmds = fs.readdirSync(__dirname + '/../../commands/utility').filter(file => file.endsWith('.js'));
    		let utility_map = utility_cmds.map(a => a.replace(".js", ""))
    		let utility_arr = Array.from(utility_map) 

			const helpEmbed = new Discord.MessageEmbed()
			.setTitle(`**${message.client.user.tag}'s commands!** `)
			.setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
			.setDescription(`This is a list of all of my commands. To see more about a specific command, just type **${prefix}help <command>**!`)
			.addFields(
				{ name: '`😂 Fun`', value: `\`\`\`\n${fun_arr.join("\n")}\n\`\`\``},
				{ name: '`🛑 Moderation`', value: `\`\`\`\n${mod_arr.join("\n")}\n\`\`\``},
				{ name: '`🔧 Utility`', value: `\`\`\`\n${utility_arr.join("\n")}\n\`\`\``},
				{ name: '`🌈 Configuration`', value: `\`\`\`\n${config_arr.join("\n")}\n\`\`\``},
				{ name: '`🎶 Music`', value: `\`\`\`\n${music_arr.join("\n")}\n\`\`\`` },
				{ name: '`👨‍👩‍👧‍👧 Community`', value: `\`\`\`\n${community_arr.join("\n")}\n\`\`\`` },
                { name: '`🎫 Tickets`', value: `\`\`\`\n${ticket_arr.join("\n")}\n\`\`\`` },
			)
			.setTimestamp()
			.setFooter('Developed on BBS');
			message.channel.send(helpEmbed)
		}
		if (!args[0]) return
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('That command does not exist!');
		}

		desc = ""
		ali = ""
		usa = ""
		cool = 0
		if (command.aliases) {
			ali = command.aliases.join(', ');
		} else ali = "*No aliases found*"
		if (command.description) {
			desc = command.description;
		} else desc = "*No description found*"
		if (command.usage) {
			usa = `${prefix}${command.name} ${command.usage}`
		} else usa = "*No usage information found*"
        if (command.cooldown) {
        	cooldown = `${command.cooldown} sec.`
        } else cooldown = "*No cooldown found.*"
		const helpEmbed = new Discord.MessageEmbed()
			.setTitle(`Information about \`${command.name}\``)
			.setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
			.setDescription(`Type **${prefix}help** for all of my commands!`)
			.addFields(
				{ name: '`✋` Name', value: command.name, inline: false},
				{ name: '`❓` Description', value: desc, inline: false},
				{ name: '`🌈` Aliases', value: ali, inline: false},
				{ name: '`🔧` Usage', value: usa, inline: false},
				{ name: '`🥶` Cooldown', value: cooldown, inline: false},
			)
			.setTimestamp()

			return message.channel.send(helpEmbed);
	},
};