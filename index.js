/*
The BBS Framework -- Designed by the BBS dev team.
*/

// Imports
var db = require('quick.db');
const fs = require('fs');
const Discord = require('discord.js');
var { prefix, token } = require('./config.json');
const client = new Discord.Client();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Setting up
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}
let blacklist = [];
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const distube = require('distube');
client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true })
client.distube
	.on('playSong', (message, queue, song) => {
        const embed = new Discord.MessageEmbed()
			.setTitle(`\`🎶\` **${song.name}**`)
        	.setURL(song.link)
        	.setThumbnail(song.thumbnail)
        	.addFields(
                { name: "Duration", value: `\`${song.formattedDuration}\``, inline: true },
                { name: "Link", value: `${song.url}`, inline: true },
                { name: "Requested By", value: `${song.user}`, inline: true },
                { name: "Likes", value: `\`${String(song.likes).replace(/(.)(?=(\d{3})+$)/g,'$1,')}\``, inline: true },
                { name: "Dislikes", value: `\`${String(song.dislikes).replace(/(.)(?=(\d{3})+$)/g,'$1,')}\``, inline: true },
                { name: "Views", value: `\`${String(song.views).replace(/(.)(?=(\d{3})+$)/g,'$1,')}\``, inline: true },
                { name: "Live", value: `*${song.isLive}*`, inline: true },
                { name: "ID", value: `*${song.id}*`, inline: true },
                { name: "Reposts", value: `*${song.reposts}*`, inline: true },
            )
        	.setColor('5124e3')
        	.setAuthor(`${message.author.username} - Now playing:`, message.author.avatarURL())
        	.setTimestamp()
        	.setFooter("AGENCY music stuff")
    	message.channel.send(embed)
			})
	.on('addSong', (message, queue, song) => {
        const embed = new Discord.MessageEmbed()
			.setTitle(`\`🎶\` Added **${song.name}** to the queue`)
        	.setURL(song.link)
        	.setThumbnail(song.thumbnail)
        	.addFields(
                { name: "Duration", value: `\`${song.formattedDuration}\``, inline: true },
                { name: "Requested By", value: `${song.user}`, inline: true },
            )
        	.setColor('5124e3')
        	.setAuthor(`${message.author.username}`, message.author.avatarURL())
        	.setTimestamp()
        	.setFooter("AGENCY music stuff")
    	message.channel.send(embed)
			})
	.on('error', (message, e) => {
		console.error(e)
		message.reply(`**I ran into an error:** \`${e}\``)
	})
	
// On message event
client.on('message', message => {
	try {
		let prefixes = db.fetch(`prefix_${message.guild.id}`);
		if (!prefixes) {
			prefix = prefix
		} else {
            if (message.channel.type == 'dm') {
                
            } else {
                prefix = prefixes;
            }
    }
	} catch (err) {
		console.log(err);
	}

    // Check if bot mentioned
	if (message.mentions.has(client.user.id)) {
		if (message.author.bot) return;
    	if (message.content.includes("@here") || message.content.includes("@everyone")) return;
		const mentionedEmbed = new Discord.MessageEmbed()
        	.setTitle(`Hi! I'm **${client.user.tag}**.`)
			.setDescription(`Use \`${prefix}help\` to see my commands :D`)
            .setColor('ffdb63')
        	.setFooter("Developed on BBS")
			.setTimestamp()
		message.channel.send(mentionedEmbed);
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
    for (let value of blacklist) {
        if (value === message.author.id) {
            return;
    }
    }
    
    // Get command
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));
	if (!command) {
		return message.reply("EEEE");
	}
	if (command.guildOnly && message.channel.type === 'dm') {
		const dmerrorEmbed = new Discord.MessageEmbed()
			.setDescription('```❌ This command cannot be executed in DMs```')
			.setTimestamp()
        	.setColor('ff1241')
		message.channel.send(dmerrorEmbed);
	}

    // Checking permissions and correct usage
	if (command.permissions) {
		try {
			if (!message.member.hasPermission(command.permissions)) {
				const permserrorEmbed = new Discord.MessageEmbed()
				.setDescription(`\`\`\`❌ You do not have permission to use the ${command.name} command\`\`\``)
				.setTimestamp()
                .setColor('ff1241')
			return message.reply(permserrorEmbed);
			}
		} catch (err) {
			console.log(err);
		}
	}

	if (command.args && !args.length) {
		let usage = ''

		if (command.usage) {
			usage += `${prefix}${command.name} ${command.usage}`
		} else {
			usage += "**No usage.**"
		}

		user = message.author
		const missingArgsEmbed = new Discord.MessageEmbed()
			.setDescription(`❌ **Incorrect command usage** \`\`\`YOUR USAGE: ${message.content}\nACTUAL USAGE: ${usage}\`\`\``)
			.setTimestamp()
        	.setColor('ff1241')
		return message.channel.send(missingArgsEmbed);
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

    // Cooldown message
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before using the **\`${command.name}\`** command again!`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
        command.execute(message, args);
	} catch (error) {
		console.error(error);
	}
});

// Run bot
client.login(token);