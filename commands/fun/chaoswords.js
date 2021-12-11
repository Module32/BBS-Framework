const { ChaosWords } = require('weky');
var randomWords = require('random-words');
const Discord = require('discord.js');
module.exports = {
	name: "chaoswords",
    description: "Creates a game where you have to find hidden words embedded in a random string!",
    guildOnly: false,
    cooldown: 5,
    async execute(message, args) {
    	const words = randomWords(4);
        await new ChaosWords({
          message: message,
          maxTries: 8, //max number  of user's tries (ends when reach limit)
          charGenerated: 25, //length of sentence (small length might throw error)
          words: words, //words (array) => ['word']
          embedTitle: '`cHaOs wOrDs`', //understable
          embedFooter: 'Find the words embedded in the string!',
          embedColor: 'RANDOM'
        }).start()
    }
    }