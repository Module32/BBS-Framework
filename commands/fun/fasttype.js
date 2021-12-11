const { FastType } = require('weky');
const Discord = require('discord.js');
module.exports = {
	name: "fasttype",
    description: "Creates a game where you have to type as fast as you can!",
    guildOnly: false,
    cooldown: 5,
    execute(message, args) {
    	thefasttype = ["The fox ran over the dog", "Cars can be cranky and cremated sometimes", "Lucky leopards like to lick mangos all the time", "The Tsunami wave crashed against the raised houses and broke the pilings as if they were toothpicks.", "Doris enjoyed tapping her nails on the table to annoy everyone.", "He wasn't bitter that she had moved on but from the radish.", "He was sure the Devil created red sparkly glitter.", "Plans for this weekend include turning wine into water.", "She always had an interesting perspective on why the world must be flat.", "She did a happy dance because all of the socks from the dryer matched.", "When he encountered maize for the first time, he thought it incredibly corny.", "The worst thing about being at the top of the career ladder is that there's a long way to fall.", "He liked to play with words in the bathtub.", "He had concluded that pigs must be able to fly in Hog Heaven.", "He always wore his sunglasses at night.", "He dreamed of eating green apples with worms.", "Jerry liked to look at paintings while eating garlic ice cream.", "The Guinea fowl flies through the air with all the grace of a turtle.", "He spiked his hair green to support his iguana.", "Iron pyrite is the most foolish of all minerals.", "His confidence would have been admirable if it wasn't for his stupidity."];
        var whodidel = thefasttype[Math.floor(Math.random() * thefasttype.length)];
        const game = new FastType({
        message: message,
        winMessage: "**You won! 🕺**",
        sentence: whodidel,
        loseMessage: '**You lost 😢**',
        time: 50000, // time that user has in ms
        startMessage: '*Good luck!*' // message sent when user starts playing
    });
    game.start(); 
    }
    }