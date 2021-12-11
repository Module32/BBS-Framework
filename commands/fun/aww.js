const https = require('https');
const Discord = require('discord.js');
const url = 'https://www.reddit.com/r/aww/hot/.json?limit=100'

module.exports = {
    name: 'aww',
    description: 'Sends some cute and cuddly pictures from r/aww!',
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

                var image = index.preview.images[0].source.url.replace('&amp;', '&')
                var title = index.title
                var link = 'https://reddit.com' + index.permalink
                var subRedditName = index.subreddit_name_prefixed
                var comments = index.comments

                const imageembed = new Discord.MessageEmbed()
                    .setTitle(title)
                    .setImage(image)
                    .setColor('c4abff')
                    .setDescription(subRedditName)
                    .setURL(link)
                    .setAuthor(user.username, message.author.avatarURL())
                    .setTimestamp()
                    .setFooter('cuteness maximus', 'https://i1.wp.com/awesci.com/wp-content/uploads/2014/01/cuteness.jpg?fit=1038%2C692')
                message.channel.send(imageembed)
            }).on('error', function (e) {
                console.log('Got an error: ', e)
            })
        })
    },
}