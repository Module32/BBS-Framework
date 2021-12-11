const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "weather",
    description: "shows the current weather in a specified location",

    execute (message, args) {
        weather.find({search: args.join(" "), degreeType: `F`}, function (error, result) {
            const forecast = result;
            if(error) return message.channel.send(error);
            if(!args[0]) return message.reply("**please specify a location!**")

            if(result === undefined || result.length === 0) return message.reply('**that is an invalid location!**')

            var current = result[0].current;
            var location = result[0].location;

            user = message.author
            const embed = new Discord.MessageEmbed()
                .setAuthor(user.username, message.author.avatarURL())
                .setThumbnail(current.imageUrl)
                .setTitle(`☀ Weather Info - **${args[0]}**`)
                .setDescription(`__${current.skytext}__ - observed at ${current.observationtime}`)
                .addField('`🌡` Temperature', `${current.temperature}°`, true) 
                .addField('∠ Degree Type', 'Fahrenheit', true)
                .addField('♥ Feels Like', `${current.feelslike}°`, true)
                .addField('💨 General Wind', `${current.winddisplay}`, true)
                .addField('💨 Wind Speed', `${current.windspeed}`, true)
                .addField('💧 Humidity', `${current.humidity}%`, true)
                .addField('🕑 Timezone', `UTC ${location.timezone}`, true)
                .setFooter(`Today is ${current.day}, ${current.date}`)

            message.channel.send(embed)
        })
    }
}