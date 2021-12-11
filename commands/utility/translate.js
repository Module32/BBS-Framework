const translate = require('@iamtraction/google-translate');
const Discord = require('discord.js');

module.exports = {
    name: "translate",
    description: "Lets you translate text into various languages.",
    cooldown: 5,
    usage: "",
    guildOnly: false,
    execute(message, args) {
        let dofrom = args[0];
        if (!dofrom) return message.reply("**please provide a valid language to translate from!**")
        let doto = args[1];
        if (!doto) return message.reply("**please provide a valid language to translate to!**")
        let txt = args.slice(2).join(" ");
        if (!txt) return message.reply("**please provide some text to translate!**")
        translate(txt, { from: dofrom, to: doto }).then(res => {
          const embed = new Discord.MessageEmbed()
          	.setTitle(res.text)
          	.setDescription(`Translated from **\`${dofrom}\`** to **\`${doto}\`**`)
          	.setTimestamp()
          message.channel.send(embed)
        }).catch(err => {
          console.error(err);
          message.reply("**please make sure to provide a valid language!**")
        });
    }
}