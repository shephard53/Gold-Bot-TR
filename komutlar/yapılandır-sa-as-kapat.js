const Discord = require('discord.js');
const db = require('quick.db')
const config = require('../config.json');

var prefix = config.prefix;
exports.run = async (client, message, args) => { 
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
 const rol = db.fetch(`SAAS_${message.guild.id}`)  
 if(!rol) return message.reply(`Bu özellik zaten kapalı!`)
 
 
  message.channel.send(`SA AS başarılı bir şekilde kapatıldı.`)

 
  db.delete(`SAAS_${message.guild.id}`)  
  db.delete(`SAASmesaj_${message.guild.id}`)
};
exports.conf = {
    aliases: ["saas-sıfırla", "sa-as-sıfırla", "SA-AS-sıfırla", "sa-as-kapat", "SA-AS-kapat", "saas-kapat"]
}
exports.help = {
  name: 'sa-as-sıfırla'
};