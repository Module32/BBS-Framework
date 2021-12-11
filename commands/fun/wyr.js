const { WouldYouRather } = require('weky');
const disbut = require('discord-buttons');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
	name: "wyr",
    description: "Would you rather...?",
    cooldown: 2,
    guildOnly: false,
    async execute(message, args) {
   		await WouldYouRather(message);
    }
}