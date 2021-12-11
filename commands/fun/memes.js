const https = require('https');
const Discord = require('discord.js');
const url = 'https://www.reddit.com/r/memes/hot/.json?limit=100'

module.exports = {
    name: 'memes',
    description: 'Sends a meme from r/memes!',
    execute(message, args) {
        user = message.author
        https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data
                const user = message.author

                if (index.post_hint !== 'image') {

                    var text = index.selftext
                    const textembed = new Discord.MessageEmbed()
                        .setTitle(title)
                        .setColor('c4abff')
                        .setDescription(subRedditName)
                        .setURL(link)
                        .setAuthor(user.username, message.author.avatarURL())
                        .setTimestamp()
                        .setFooter('the original since 2008 baby', 'https://kuow-prod.imgix.net/store/47331d2e8aa08b843855a9fed369be49.jpg?ixlib=rails-2.1.4&auto=format&crop=faces&fit=crop&h=634&w=924')

                    message.channel.send(textembed)
                }

                var image = index.preview.images[0].source.url.replace('&amp;', '&')
                var title = index.title
                var link = 'https://reddit.com' + index.permalink
                var subRedditName = index.subreddit_name_prefixed
                var comments = index.comments

                if (index.post_hint !== 'image') {
                    const textembed = new Discord.MessageEmbed()
                        .setTitle(title)
                        .setColor('c4abff')
                        .setDescription(subRedditName)
                        .setURL(link)
                        .setAuthor(user.username, message.author.avatarURL())
                        .setTimestamp()
                        .setFooter(`the original since 2008 baby`, 'https://kuow-prod.imgix.net/store/47331d2e8aa08b843855a9fed369be49.jpg?ixlib=rails-2.1.4&auto=format&crop=faces&fit=crop&h=634&w=924')

                    message.channel.send(textembed)
                }
                const imageembed = new Discord.MessageEmbed()
                    .setTitle(title)
                    .setImage(image)
                    .setColor('c4abff')
                    .setDescription(subRedditName)
                    .setURL(link)
                    .setAuthor(user.username, message.author.avatarURL())
                    .setTimestamp()
                    .setFooter('the original since 2008 baby', 'https://kuow-prod.imgix.net/store/47331d2e8aa08b843855a9fed369be49.jpg?ixlib=rails-2.1.4&auto=format&crop=faces&fit=crop&h=634&w=924')
                message.channel.send(imageembed)
            }).on('error', function (e) {
                console.log('Got an error: ', e)
            })
        })
    },
}