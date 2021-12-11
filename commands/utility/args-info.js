module.exports = {
    name: 'args-info',
    description: 'Provides information about the arguments given.',
    aliases: ["argi"],
    args: true,
    usage: '<args (as much as you want)>',
    execute(message, args) {
        if (args[0] === 'module64') {
            return message.channel.send("My creator, oh yeah");
        }

        message.channel.send(`Argument(s): **${args}**\nArgument length: *${args.length}*`);
    }
}