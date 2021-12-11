const Discord = require('discord.js');
const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return content = decrpyted.toString();
};

module.exports = {
    name: 'decrypt',
    help: 'Decrypts a message for personal use.',
    usage: '<message>',
    cooldown: 5,
    execute(message, args) {
        msg = String(args.join(' '));
        const decryptEmbed = new Discord.MessageEmbed()
			.setColor(0x2ECC71)
			.setTitle(`✅   **Decrypted text:** \`${String(decrypt(msg))}\``)
            .setDescription(`${message.author}, the decrypted text is above - use \`;decrypt <message>\` to decrypt a message!`)
			.setTimestamp()
			.setFooter('so strong the government can\'t hack us', 'https://patch.com/img/cdn20/shutterstock/24142232/20210105/094935/styles/patch_image/public/shutterstock-1418358686___05094206885.jpg');
        message.channel.send(decryptEmbed);
    }
};