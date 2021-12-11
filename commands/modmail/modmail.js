const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db');
const path = require('path');

module.exports = {
    name: 'modmail',
    description: "Sets up a modmail ticket for you.",
    cooldown: 45,
    async execute(message, args) {
        console.log(message.author.id);
        
        cat = db.get(`modmail_category_${message.guild.id}`);
        role = db.get(`modmail_role_${message.guild.id}`);
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();
        transcript = [];
        const everyoneRole = message.guild.roles.cache.find(w => w.name === "@everyone");
        const alreadythere = message.guild.channels.cache.find(w => w.name === `modmail-${message.author.username}`);
        if (alreadythere) return message.reply("**you have already set up a modmail ticket! Please end that session before starting a new one.**")
        let prefix = db.get(`prefix_${message.guild.id}`) || ";";
        if (!cat || !role) return message.reply("**this guild has not been correctly set up yet. Set up a role and category first! *NOTE:* This issue could possibly be caused by the server administrators deleting the support role or category.**")
        const embed = new Discord.MessageEmbed()
            .setTitle("AGENCY's Modmail!")
        	.setAuthor(message.author.username, message.author.avatarURL())
            .setDescription("	**Hi! Welcome to my modmail system.**\n		Modmail can be used to `set up tickets in a server`. It allows for `easy communication` with `staff and users`. Below are specified options that you can use.\n		`❗` Please be aware that `inappropriate use of modmail can result in a warn, mute, or other punishments` that vary from server to server. **Use my modmail wisely!**")
            .addFields(
                { name: "﹄ `Report`", value: "To report a member, please react with: ⚠" },
                { name: "﹄ `Ask a question`", value: "To ask a question, please react with: ❓" },
                { name: "﹄ `Appeal`", value: "To appeal a kick, ban, or other punishment, please react with: 🔨" },
                { name: "﹄ `Other`", value: "For anything else that may not be listed above, please react with: ⚽" },
            )
            .setColor('c5ff33')
            .setTimestamp()
            .setFooter("AGENCY Modmail - designed by Module64")
        try {
            const msg = await message.author.send(embed);
            let rects = ["⚠", "❓", "🔨", "⚽"];
            const reactionCollector = await msg.createReactionCollector((reaction, user) => rects.includes("⚠") || rects.includes("❓") || rects.includes("🔨") || rects.includes("⚽") && user.id === message.author.id, { time: 60000 })
            reactionCollector.on('collect', reaction => {
                msg.delete();
                if (String(reaction.emoji.name) === "⚠️") {
                    global.reportembedc = new Discord.MessageEmbed()
                        .setTitle(`New ticket - \`${message.author.username}\``)
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`⚠ ${message.author.username} would like to **\`report a member.\`**`)
                        .setColor('c5ff33')
                        .setTimestamp()
                        .setFooter(`AGENCY Modmail - designed by Module64`)
                } if (String(reaction.emoji.name) === "❓") {
                    global.reportembedc = new Discord.MessageEmbed()
                        .setTitle(`New ticket - \`${message.author.username}\``)
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`❓ ${message.author.username} would like to **\`ask a question.\`**`)
                        .setColor('c5ff33')
                        .setTimestamp()
                        .setFooter(`AGENCY Modmail - designed by Module64`)
                } if (String(reaction.emoji.name) === "🔨") {
                    global.reportembedc = new Discord.MessageEmbed()
                        .setTitle(`New ticket - \`${message.author.username}\``)
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`🔨 ${message.author.username} would like to **\`appeal a punishment.\`**`)
                        .setColor('c5ff33')
                        .setTimestamp()
                        .setFooter(`AGENCY Modmail - designed by Module64`)
                } if (String(reaction.emoji.name) === "⚽") {
                    global.reportembedc = new Discord.MessageEmbed()
                        .setTitle(`New ticket - \`${message.author.username}\``)
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`⚽ ${message.author.username} has started a ticket for **a different reason.**`)
                        .setColor('c5ff33')
                        .setTimestamp()
                        .setFooter(`AGENCY Modmail - designed by Module64`)
                }
                channel = message.guild.channels.cache.find(ch => ch.type == "category" && ch.id == cat);
                reportembeddm = new Discord.MessageEmbed()
                		.setTitle(`\`👍\` Success! A modmail ticket has been created.`)
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setDescription(`Your modmail ticket has been opened in the server **${message.guild}** under the following category: **${channel}**`)
                        .setColor('c5ff33')
                        .setTimestamp()
                        .setFooter(`AGENCY Modmail - designed by Module64`)
                msg.channel.send(reportembeddm)
                reactionCollector.stop('done');
            })
            global.endedembed = new Discord.MessageEmbed()
            	.setTitle("Closing the ticket now...")
            	.setColor('c5ff33')
                .setTimestamp()
                .setFooter(`AGENCY Modmail - designed by Module64`)
            	.setDescription(`A transcript of your conversation should be below. **Don't see the transcript? Our systems might have encountered an issue when writing the file.**`)
            reactionCollector.on('end', (collected, reason) => {
                if (reason.toLowerCase() == "time") {
                    return message.reply("**you did not react in enough time!**")
                } else {
                    let channel = message.guild.channels.create(`modmail-${message.author.username}`, {
                        reason: "This is a modmail ticket.",
                        parent: cat,
                        type: "text"
                    })
                    .then(r => {
                        r.updateOverwrite(everyoneRole, { VIEW_CHANNEL: false });
                        r.updateOverwrite(role, { VIEW_CHANNEL: true });
                        try {
                            r.send(reportembedc);
                        } catch (err) {
                            console.log(err);
                            r.send("**An error occurred when I attempted to retrieve information about the modmail ticket.**")
                        }
                        const channelCollector = r.createMessageCollector((m) => !m.author.bot)
                        const dmCollector = message.author.dmChannel.createMessageCollector((m) => !m.author.bot)
                        dmCollector.on('collect', m => {
                            if (m.content.toLowerCase().startsWith(`${prefix}end`)) {
                                db.set(`modmail_ended_${message.author.id}_${message.guild.id}`, `${message.author.id}-${message.guild.id}-modmailtranscript-${year + "-" + month + "-" + date + " " + hours + "-" + minutes + "-" + seconds}.txt`)
                                message.author.send(endedembed);
                                r.send(endedembed);
                                try {
                                    fs.writeFile(__dirname + `/../../modmail-transcripts/${db.get(`modmail_ended_${message.author.id}_${message.guild.id}`)}`, transcript.join(" ").toString(), function(err, result) {
     if (err) console.log('error', err);
   });
                                    message.author.send({
                                    files: [__dirname + `/../../modmail-transcripts/${db.get(`modmail_ended_${message.author.id}_${message.guild.id}`)}`]
                                });
                                    r.send({
                                    files: [__dirname + `/../../modmail-transcripts/${db.get(`modmail_ended_${message.author.id}_${message.guild.id}`)}`]
                                });
                                    //fs.unlink((__dirname + `/../../modmail-transcripts/${db.get(`modmail_ended_${message.author.id}_${message.guild.id}`)}`),function(err){
                                        //if(err) return console.log(err);
                                    //});
                                } catch (err) {
                                    console.log(err);
                                }
                                dmCollector.stop('done');
                                channelCollector.stop('done');
                                setTimeout(() => {
                                    r.delete();
                                }, 5000);
                            }
                            r.send(`**${message.author.username}**: ${m.content}`);
                            transcript.push(`\n${message.author.username}: ${m.content}`)
                        })
                        channelCollector.on('collect', m => {
                            if (m.content.toLowerCase().startsWith(`${prefix}end`)) {
                                message.author.send(endedembed);
                                r.send(endedembed);
                                try {
                                    fs.writeFile(__dirname + `/../../modmail-transcripts/${message.author.id}-modmailtranscript-${year + "-" + month + "-" + date + " " + hours + "-" + minutes + "-" + seconds}.txt`, transcript.join(" ").toString(), function(err, result) {
     if (err) console.log('error', err);
   });
                                    message.author.send({
                                    files: [__dirname + `/../../modmail-transcripts/${message.author.id}-modmailtranscript-${year + "-" + month + "-" + date + " " + hours + "-" + minutes + "-" + seconds}.txt`]
                                });
                                    r.send({
                                    files: [__dirname + `/../../modmail-transcripts/${message.author.id}-modmailtranscript-${year + "-" + month + "-" + date + " " + hours + "-" + minutes + "-" + seconds}.txt`]
                                });
                                } catch (err) {
                                    console.log(err);
                                }
                                dmCollector.stop('done');
                                channelCollector.stop('done');
                                setTimeout(() => {
                                    r.delete();
                                }, 10000);
                            }
                            if (message.author.presence.status === "offline") {
                                offlinestaffmsg = new Discord.MessageEmbed()
                                    .setTitle(`A staff member messaged you on your modmail ticket while you were away`)
                                    .setAuthor(message.author.username, message.author.avatarURL())
                                    .setDescription(`**Their message:**\n${m.content}`)
                                    .setColor('c5ff33')
                                    .setTimestamp()
                                    .setFooter(`AGENCY Modmail - designed by Module64`)
                                message.author.send(offlinestaffmsg);
                            	transcript.push(`\nSTAFF (${m.author}): ${m.content}`)
                            } else {
                                message.author.send(`**STAFF (${m.author}):** ${m.content}`);
                            	transcript.push(`\nSTAFF (${m.author}): ${m.content}`)
                            }
                        });
                    }
                )}
            })
        } catch (err) {
            console.log(err);
            return message.reply(`**I encountered an error. You may need to enable DMs from server members in this guild.\nMy error: \`${err}\`**`)
        }
    }
}