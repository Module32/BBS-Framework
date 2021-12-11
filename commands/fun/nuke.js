module.exports = {
	name: "nuke",
    description: "Nukes a channel",
    cooldown: 5,
    execute(message) {
    	if (message.author.id !== 785585471476465684 && message.author.id !== 804777320123990108) return message.reply("**this command is only available to the owners of Jaden's Community!**")
    	message.channel.clone().then(channel => {
            channel.setPosition(message.channel.position)
            channel.send('💥 Channel nuked!')
        })
        message.channel.delete()
    }
}