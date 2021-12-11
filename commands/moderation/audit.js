module.exports = {
	name: 'audit',
    description: "Gets the audit logs of this server.",
    permissions: "ADMINISTRATOR",
    async execute(message) {
    	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 25,
		});
        let logs = await fetchedLogs.entries;
        if (!logs) return await message.reply("**the audit logs could not be fetched for some reason.**")
        message.channel.send(logs.map(r=>r.name).join('\n'));
    }
}