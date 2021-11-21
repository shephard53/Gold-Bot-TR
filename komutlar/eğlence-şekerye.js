const Discord = require('discord.js');
const ayarlar = require('../config.json');
exports.run = (client, message, params) => {
if (!message.guild) {
const EmbedSuspect = new Discord.MessageEmbed()

.setColor("RANDOM")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField("**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**","**----------------------------------------------------------**")

return message.author.send(EmbedSuspect); }

if (message.channel.type !== 'dm') {

const EmbedSuspect = new Discord.MessageEmbed()

    .setAuthor('Çok Yeme! Dişlerin Çürüçek Evladım.')
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription('')
    .setImage(`https://img-s1.onedio.com/id-55393ff3c0810f6409b05c76/rev-0/w-635/listing/f-jpg-gif-webp-webm-mp4/s-c5c81ece991cc33c024b146e871f1591dae29660.gif`)

return message.channel.send(EmbedSuspect);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'şekerye',
  description: 'Şeker Yersiniz!.',
  usage: 'şekerye'
}; 