const https = require('https');
const Discord = require('discord.js');
const url = 'https://www.reddit.com/r/Showerthoughts/hot/.json?limit=100'

module.exports = {
    name: 'showerthoughts',
    description: 'Sends a shower thought from r/Showerthoughts!',
    execute(message, args) {
        const user = message.author

        https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data
                var title = index.title
                var link = 'https://reddit.com' + index.permalink
                var subRedditName = index.subreddit_name_prefixed
                var comments = index.comments

                    var text = index.selftext
                    const textembed = new Discord.MessageEmbed()
                        .setTitle(title)
                        .setColor('c4abff')
                        .setDescription(subRedditName)
                        .setURL(link)
                        .setAuthor(user.username, message.author.avatarURL())
                        .setTimestamp()
                        .setFooter('deep man', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTWRNUCYqaNFHCKDob6NYI5hzVqaTLrqBd4A&usqp=CAU')

                    message.channel.send(textembed)

            }).on('error', function (e) {
                console.log('Got an error: ', e)
            })
        })
    },
}