const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "settings",
    help: "Shows your configured settings for this server.",
    cooldown: 1,
    execute(message) {
        let captcha_setting = db.get(`captcha_system_${message.guild.id}`);
        let captcha_role = db.get(`captcha_role_${message.guild.id}`);
        let flag_channel = db.get(`flag_logs_channel_${message.guild.id}`);
        let flag_role = db.get(`flag_role_${message.guild.id}`);
        let goodbye_channel = db.get(`goodbye_channel_${message.guild.id}`);
        let goodbye_text = db.get(`goodbye_text_${message.guild.id}`);
        let handoff_role = db.get(`handoff_role_${message.guild.id}`);
        let meeting_logs = db.get(`meeting_logs_channel_${message.guild.id}`);
        let mute_role = db.get(`mute_role_${message.guild.id}`);
        let prefix = db.get(`prefix_${message.guild.id}`);
        let profanity_block = db.get(`profanity_block_${message.guild.id}`);
        let profanity_kick = db.get(`profanity_kick_amt_${message.guild.id}`);
        let staff_role = db.get(`staff_role_${message.guild.id}`);
        let welcome_channel = db.get(`welcome_channel_${message.guild.id}`);
        let welcome_role = db.get(`welcome_role_${message.guild.id}`);
        let welcome_text = db.get(`welcome_text_${message.guild.id}`);
        let everyone_ping = db.get(`allow_everyone_ping_${message.guild.id}`);
        let announce_channel = db.get(`community_announcement_channel_${message.guild.id}`);
        let beta_channel = db.get(`beta_channel_setting_${message.guild.id}`);
        let spam_block = db.get(`spam_block_${message.guild.id}`);
        let modlog_channel = db.get(`modlog_channel_${message.guild.id}`);

        let captcha = ""
        let captcharole = ""
        let flagchannel = ""
        let flagrole = ""
        let goodbyechannel = ""
        let goodbyetext = ""
        let handoffrole = ""
        let meetinglogs = ""
        let muterole = ""
        let theprefix = ""
        let profanityblock = ""
        let profanitykick = ""
        let staffrole = ""
        let welcomechannel = ""
        let welcomerole = ""
        let welcometext = ""
        let everyoneping = ""
        let announcechannel = ""
        let betachannel = ""
        let spamblock = ""
        let modlog = ""

        if (!captcha_setting) {
            captcha = "Disabled | ❌"
        } else {
            captcha = "Enabled | ✅"
        }
        if (!captcha_role) {
            captcharole = "Not Configured | ❌"
        } else {
            captcharole = "Configured | ✅"
        }
        if (!flag_channel) {
            flagchannel = "Not Configured | ❌"
        } else {
            flagchannel = "Configured | ✅"
        }
        if (!flag_role) {
            flagrole = "Not Configured | ❌"
        } else {
            flagrole = "Configured | ✅"
        }
        if (!goodbye_channel) {
            goodbyechannel = "Not Configured | ❌"
        } else {
            goodbyechannel = "Configured | ✅"
        }
        if (!goodbye_text) {
            goodbyetext = "Not Customized | ❌"
        } else {
            goodbyetext = "Customized | ✅"
        }
        if (!handoff_role) {
            handoffrole = "Not Configured | ❌"
        } else {
            handoffrole = "Configured | ✅"
        }
        if (!meeting_logs) {
            meetinglogs = "Not Configured | ❌"
        } else {
            meetinglogs = "Configured | ✅"
        }
        if (!mute_role) {
            muterole = "Not Configured | ❌"
        } else {
            muterole = "Configured | ✅"
        }
        if (!prefix) {
            theprefix = "Not Customized | ❌"
        } else {
            theprefix = "Customized | ✅"
        }
        if (!profanity_block) {
            profanityblock = "Not Configured | ❌"
        } else {
            profanityblock = "Configured | ✅"
        }
        if (!profanity_kick) {
            profanitykick = "Not Configured | ❌"
        } else {
            profanitykick = "Configured | ✅"
        }
        if (!staff_role) {
            staffrole = "Not Configured | ❌"
        } else {
            staffrole = "Configured | ✅"
        }
        if (!welcome_channel) {
            welcomechannel = "Not Configured | ❌"
        } else {
            welcomechannel = "Configured | ✅"
        }
        if (!welcome_role) {
            welcomerole = "Not Configured | ❌"
        } else {
            welcomerole = "Configured | ✅"
        }
        if (!welcome_text) {
            welcometext = "Not Customized | ❌"
        } else {
            welcometext = "Customized | ✅"
        }
        if (!everyone_ping) {
            everyoneping = "Not Configured | ❌"
        } else {
            everyoneping = "Configured | ✅"
        }
        if (!announce_channel) {
            announcechannel = "Not Configured | ❌"
        } else {
            announcechannel = "Configured | ✅"
        }
        if (!beta_channel) {
            betachannel = "Disabled | ❌"
        } else {
            betachannel = "Enabled | ✅"
        }
        if (!spam_block) {
            spamblock = "Not Configured | ❌"
        } else {
            betachannel = "Configured | ✅"
        }
        if (!modlog_channel) {
            modlog = "Not Configured | ❌"
        } else {
            modlog = "Configured | ✅"
        }
        user = message.author
        const settingsEmbed = new Discord.MessageEmbed()
                .setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
                .setTitle(`All of my settings for **${message.guild}**`)
                .addFields(
                    { name: `Captcha: ${captcha}`, value: `▷ Current value: **${captcha_setting}**` },
                    { name: `Captcha Role: ${captcharole}`, value: `▷ Current captcha role: **<@&${captcha_role}>**` },
                    { name: `Flag Channel: ${flagchannel}`, value: `▷ Current channel value: **<#${flag_channel}>**` },
                    { name: `Flag Role: ${flagrole}`, value: `▷ Current flag role: **<@&${flag_role}>**` },
                    { name: `Goodbye Channel: ${goodbyechannel}`, value: `▷ Current channel: **<#${goodbye_channel}>**` },
                    { name: `Goodbye Text: ${goodbyetext}`, value: `▷ Current text:\n\`\`\`${goodbye_text}\`\`\`` },
                    { name: `Handoff Role: ${handoffrole}`, value: `▷ Current role: **<@&${handoff_role}>**` },
                    { name: `Meeting Logs Channel: ${meetinglogs}`, value: `▷ Current channel: **<#${meeting_logs}>**` },
                    { name: `Mute Role: ${muterole}`, value: `▷ Current role: **<@&${mute_role}>**` },
                    { name: `Prefix: ${theprefix}`, value: `▷ Current prefix: \`${prefix}\`` },
                    { name: `Profanity Blocking: ${profanityblock}`, value: `▷ Current configuration: **${profanity_block}**` },
                    { name: `Profanity Kick: ${profanitykick}`, value: `▷ Current value: **${profanity_kick}**` },
                    { name: `Spam Blocking: ${spamblock}`, value: `▷ Current configuration: **${spam_block}**` },
                    { name: `Staff Role: ${staffrole}`, value: `▷ Current role: **<@&${staff_role}>**` },
                    { name: `Welcome Channel: ${welcomechannel}`, value: `▷ Current channel: **<#${welcome_channel}>**` },
                    { name: `Welcome Role (autorole): ${welcomerole}`, value: `▷ Current role: **<@&${welcome_role}>**` },
                    { name: `Welcome Text: ${welcometext}`, value: `▷ Current text:\n\`\`\`${welcome_text}\`\`\`` },
                    { name: `Everyone Ping: ${everyoneping}`, value: `▷ Current value: **${everyone_ping}**` },
                    { name: `Announcement Channel: ${announcechannel}`, value: `▷ Current channel: **<#${announce_channel}>**` },         
                    { name: `Modlog Channel: ${modlog}`, value: `▷ Current channel: **<#${modlog_channel}>**` },
                )
                .setTimestamp()
        message.channel.send(settingsEmbed)
    }
}