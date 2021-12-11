const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'getsession',
    help: "Gets the previous messages sent and sends them as a text attachment.",
    usage: "<amt>",
    permissions: "MANAGE_GUILD",
    cooldown: 5,
    execute(message, args) {
        msg_amt = args[0];
        message.channel.messages.fetch({ limit: msg_amt })
  			.then(msg => {
                try {
                    message.author.send(`${msg.content}`);
                } catch (err) {
                    console.log(err);
                }
       		})
  			.catch(console.error);
    }
}
