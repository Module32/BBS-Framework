const Discord = require("discord.js");
const urban = require("urban");

module.exports = {
    name: 'urban',
    description: 'Goes through the urban dictionary. Be warned- it can be NSFW.',
    usage: '<message_to_search>',
    execute (message, args) {
    if(args.length < 1) return message.reply("**please enter some text!**");
    let XD = args.join(" "); 

    urban(XD).first(json => {
        if(!json) return message.reply("**I found no results!**")

        let urbEmbed = new Discord.MessageEmbed()
            .setColor("f4ff59")
            .setTitle(json.word)
            .setDescription(json.definition)
            .addField("👍 Upvotes", json.thumbs_up, true)
            .addField("👎 Downvotes", json.thumbs_down, true)
            .setImage("https://wjlta.files.wordpress.com/2013/07/ud-logo.jpg")
            .setFooter(`${json.author} wrote this`);

        message.channel.send(urbEmbed)
    })
}
}