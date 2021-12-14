module.exports = {
    name: 'ping',
    description: `Send's the bot's API and BOT ping`,
    cooldown: 2,
    
    execute(message) {
        const client = message.client
        message.channel.send(`:white_check_mark: - Ping: **${client.ws.ping}**ms`);
    },
};