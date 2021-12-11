const { ShuffleGuess } = require('weky');
var randomWords = require('random-words');
const Discord = require('discord.js');
const disbut = require('discord-buttons');
module.exports = {
	name: "shuffleguess",
    description: "Creates a game where you have to find hidden words embedded in a random string!",
    guildOnly: false,
    cooldown: 5,
    async execute(message, args) {
    	const client = new Discord.Client();
    	const word = randomWords();
        const game = new ShuffleGuess({
              message: message,
              word: word, // or a simple word
              winMessage: "**You won! 💃**", // message sent when user's message matches with the word
              colorReshuffleButton: 'blurple', // color of the reshuffle button (regen)
              messageReshuffleButton: '🔀 reshuffle', // text of the reshuffle button (regen)
              colorCancelButton: 'red', // color of the cancel button (exit, quit, stop)
              messageCancelButton: '❌ cancel', // text of the cancel button
              client: client
        });
        game.start(); 
    }
    }