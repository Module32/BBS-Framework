module.exports = {
    name: "giverole",
    description: "Gives a user a role.",
    usage: "<user> <role-id>",
    permissions: "ADMINISTRATOR",
    execute(message, args) {
        let tomute = message.guild.member(message.mentions.users.first());
        let therole = message.mentions.roles.first();
        if (therole.position > tomute.position) return message.reply("**that role is above you in the role hierarchy! You cannot assign yourself that role.**")
        if(!tomute) return message.reply("**you need to mention a user!**")
        let role = message.guild.roles.cache.find(role => role.id == therole.id)
        if (!role) return message.reply("**please specify a valid role! It could be possible that the specified role ID does not exist.**")
        tomute.roles.add(role);
        return message.reply(`**successfully applied *${role}* to ${tomute}!**`)
    }
}