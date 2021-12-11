const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: "resetallconfig",
    help: "Resets all the configuration previously set.",
    permissions: "ADMINISTRATOR",
    execute(message) {
        db.get(`captcha_system_${message.guild.id}`);
        db.get(`flag_logs_channel_${message.guild.id}`);
        db.get(`flag_role_${message.guild.id}`);
        db.get(`goodbye_channel_${message.guild.id}`);
        db.get(`goodbye_text_${message.guild.id}`);
        db.get(`handoff_role_${message.guild.id}`);
        db.get(`meeting_logs_channel_${message.guild.id}`);
        db.get(`mute_role_${message.guild.id}`);
        db.get(`prefix_${message.guild.id}`);
        db.get(`profanity_block_${message.guild.id}`);
        db.get(`profanity_kick_amt_${message.guild.id}`);
        db.get(`staff_role_${message.guild.id}`);
        db.get(`welcome_channel_${message.guild.id}`);
        db.get(`welcome_role_${message.guild.id}`);
        db.get(`welcome_text_${message.guild.id}`);
        db.get(`allow_everyone_ping_${message.guild.id}`);
        db.get(`community_announcement_channel_${message.guild.id}`);
        db.get(`beta_channel_setting_${message.guild.id}`);
        db.get(`spam_block_${message.guild.id}`);
        db.get(`modlog_channel_${message.guild.id}`);
        
        db.delete(`captcha_system_${message.guild.id}`);
        db.delete(`flag_logs_channel_${message.guild.id}`);
        db.delete(`flag_role_${message.guild.id}`);
        db.delete(`goodbye_channel_${message.guild.id}`);
        db.delete(`goodbye_text_${message.guild.id}`);
        db.delete(`handoff_role_${message.guild.id}`);
        db.delete(`meeting_logs_channel_${message.guild.id}`);
        db.delete(`mute_role_${message.guild.id}`);
        db.delete(`prefix_${message.guild.id}`);
        db.delete(`profanity_block_${message.guild.id}`);
        db.delete(`profanity_kick_amt_${message.guild.id}`);
        db.delete(`staff_role_${message.guild.id}`);
        db.delete(`welcome_channel_${message.guild.id}`);
        db.delete(`welcome_role_${message.guild.id}`);
        db.delete(`welcome_text_${message.guild.id}`);
        db.delete(`allow_everyone_ping_${message.guild.id}`);
        db.delete(`community_announcement_channel_${message.guild.id}`);
        db.delete(`beta_channel_setting_${message.guild.id}`);
        db.delete(`spam_block_${message.guild.id}`);
        db.delete(`modlog_channel_${message.guild.id}`);

        const doneEmbed = new Discord.MessageEmbed()
                .setAuthor(user.username, user.avatarURL(), message.author.avatarURL())
                .setTitle(`✅   All of my configuration settings have been reset.`)
                .setDescription("To see the settings, type **`;settings`**.")
                .setTimestamp()
        message.channel.send(doneEmbed)
    }
}