const Discord = require('discord.js');
const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return content = encrypted.toString('hex');
};

module.exports = {
    name: 'encrypt',
    help: 'Encrypts a message for personal use.',
    usage: '<message>',
    cooldown: 5,
    execute(message, args) {
        encrypt
        msg = args.join(' ')
        const encryptEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle(`✅   **Encrypted text:** \`${encrypt(msg)}\``)
            .setDescription(`${message.author}, the encrypted text is above - use \`;decrypt <message>\` to decrypt a message!`)
			.setTimestamp()
			.setFooter('so strong the government can\'t hack us', 'https://patch.com/img/cdn20/shutterstock/24142232/20210105/094935/styles/patch_image/public/shutterstock-1418358686___05094206885.jpg');
        message.channel.send(encryptEmbed);
    }
};