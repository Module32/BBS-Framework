const { MessageButton } = require('discord-buttons')

module.exports = {
    name: "buttontest",
    description: "A test for the new Discord buttons!",
    cooldown: 0,
    execute(message) {
        if(message.author.id !== '804777320123990108') return message.reply('**only my owner can use this command!**')
        let button = new MessageButton()
            .setStyle('blurple')
            .setLabel('Button Test!')
            .setID('btntest1')
        message.channel.send(`Welcome to the **button experience!**`, button);
    }
}