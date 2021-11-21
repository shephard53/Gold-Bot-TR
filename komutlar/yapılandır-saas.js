const db = require('quick.db')
const Discord = require('discord.js')
const config = require('../config.json')

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');

if (!args[0]) return message.channel.send(`Sa-As Sistemi Açmak İçin **Örnek:** ${prefix}sa-as aç`)

if (args[0] == 'aç') {
  
db.set(`SAAS_${message.guild.id}`, 'açık')
  
message.channel.send(`Sa-As Sistemi Açıldı\nSa-As Mesajı Ayarlamak İçin **Örnek:**\`${prefix}sa-as-mesaj\``)
}

}

exports.conf = {
  aliases: ['sa-as', 'SA-AS', 'Sa-As']
};

exports.help = {
  name: 'saas'
};