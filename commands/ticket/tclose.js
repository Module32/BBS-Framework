module.exports = {
	name: "tclose",
    description: "Closes a ticket.",
    cooldown: 4,
    execute(message, args) {
    	const fetchedChannel = message.guild.channels.cache.find(chan => chan.name === `ticket-${message.author.username.toLowerCase()}`);
        if (!fetchedChannel) return message.reply("**you have not set up a ticket in the first place! 🤦‍♂️🤦‍♀️**")
		fetchedChannel.delete();
    }
}