const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const db = require('quick.db');

const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.commands = new Collection();
client.config = require('./config.js')
client.emotes = client.config.emojis;

const commands = [];

fs.readdirSync('./commands').forEach(dirs => {
const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${dirs}/${file}`);
	commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
    console.log(`Loading interaction ${file}`)
}
})

// Place your client and guild ids here
const clientId = '952383128947798066';
const guildId = '849615161005965343';

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

const rest = new REST({ version: '9' }).setToken(client.config.discord.token);

(async () => {
	try {
		console.log('Started refreshing interactions (/)');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded Interactions (/)');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) {
    	if (interaction.isButton()) {
        	if (interaction.customId === "delallwarns") {
                let row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                                .setCustomId('confirmdelallwarns')
                                .setLabel('Yes, delete them all')
                                .setStyle('DANGER')
                    	);
                let row2 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                                .setCustomId('canceldelallwarns')
                                .setLabel('Nevermind, don\'t delete all warns')
                                .setStyle('GREEN'),
                    	);
                let delwarn_user = db.get(`delwarn_${interaction.user.id}`);
                const user2 = await interaction.guild.members.fetch(delwarn_user)
                const embed = new MessageEmbed()
                    .setTitle(`**Are you sure you want to delete this user\'s warns?**`)
                	.setDescription(`To **cancel,** don't respond to this embed.`)
                    .setTimestamp()

                await interaction.channel.send({ embeds: [ embed ], components: [ row ] })
            } else if (interaction.customId === "confirmdelallwarns") {
                let delwarn_user = db.get(`delwarn_${interaction.user.id}`);
                let count = db.get(`warncount_${delwarn_user}`) || 0;
                console.log(delwarn_user, count);
                for (let i = count; i > 0; i--) {
                    console.log(i);
                    try {
                        console.log(i);
                        let deleted = db.delete(`warn-${delwarn_user}-${i}`);
                        console.log(deleted);
                    } catch (err) {
                        console.log(err);
                    }
                }
                db.set(`warncount_${delwarn_user.id}`, 0);
                return interaction.channel.send({ content: "Successfully deleted all warns!" })
            }
        }
        if (interaction.isSelectMenu()) {
           if (interaction.customId === "delwarn") {
                let val = interaction.values[0];
               	let delwarn_user = db.get(`delwarn_${interaction.user.id}`);
                let warn = db.get(`warn-${delwarn_user}-${val}`);
                if (!warn) return interaction.channel.send({ content: "I couldn't find that warn... that's odd..." });
                db.delete(`warn-${delwarn_user}-${val}`);
                console.log(`warn-${delwarn_user}-${val}`)

                await interaction.channel.send(`✅ Warn ${warn.id} has been deleted.`)
            } 
        }
    };

	const command = client.commands.get(interaction.commandName);
    if (!command) return;
    if (interaction.commandName === "delwarn") {
        let delwarn_user = interaction.options.getUser('user').id;
        db.set(`delwarn_${interaction.user.id}`, delwarn_user);
    }
    try {
        command.execute(interaction);
    } catch (error) {
        console.log(error);
        interaction.reply({ content: `I encountered an error! Please report this to BBS with the following message: \`${error}\``, ephemeral: true })
    }
});

client.login(client.config.discord.token)