const { Calculator } = require('weky');
const disbut = require('discord-buttons');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
	name: "calc",
    description: "Calculates stuff.",
    async execute(message, args) {
   		await Calculator(message);
    }
}