const Discord = require('discord.js');

module.exports = {
    name: 'impersonate',
    help: "Impersonates someone.",
    usage: "<user> [impersonation]",
    execute(message, args) {
        user = message.author
        let menuser = message.guild.member(message.mentions.users.first());
        if (menuser.id === message.author.id) return message.reply("**you can't impersonate yourself ya little möbius strip**")
        incogsearch = ["should i shave the hair on my chest", "should i dye my beard pink", "how to pick up girls", "how to kill a 6ft owl with a knife", "why is my doodoo yellowish", "what to do if I gotta doo the doo in public", "how to tell if a guy likes me", "am I trans", "fear of myself", "what to do if I am underage on Discord", "ya can't ducc the zucc"]
        incogpick = incogsearch[Math.floor(Math.random() * incogsearch.length)];
        responses = ["'Hi guys welcome back to my hype yt channel`", `You just hacked into ${menuser}s Youtube acc and posted cringe vids`, `You just got into ${menuser}s Facebook and roasted Zucky, now the data collection team's after you`, `You just pinged everyone in a public server in ${menuser}s Discord`, `You emailed Discord about ${menuser} breaking the TOS (now they're gettin terminated lol)`, `You just got into ${menuser}s Instagram and posted pics of feet (ew what the heck man)`, `You just revealed ${menuser}s incognito searches\nMOST RECENT SEARCH:\n\n*${incogpick}*`]
        responsepick = responses[Math.floor(Math.random() * responses.length)];
        let final = ""
        let tosmsg = args.slice(1).join(" ");
        if (!tosmsg) {
            final = responsepick
        } else {
            final = tosmsg
        }
        const tosEmbed = new Discord.MessageEmbed()
			.setColor('c4abff')
			.setDescription(final)
            .setAuthor(`${user.username}`, user.avatarURL())
			.setTimestamp()
			.setFooter('wait isn\'t this a cri-', 'https://th.bing.com/th/id/OIP.OlFRe1SEDTq_kY9BCDRhRgHaD6?pid=ImgDet&rs=1');
        message.channel.send(tosEmbed)
    }
}