const Discord = require('discord.js');
const db = require('quick.db') 
const config = require("../config.json");

exports.run = async (client, message, args) => {
let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');

  if(!db.fetch(`otokanal_${message.guild.id}`)) return message.channel.send('Zaten Otomatik Rol Sistemi Kapalı')
   

   message.reply(`Otorol Sistemi Başarıyla Kapatıldı Ayarlamak İçin: \`${prefix}otorol-ayarla @rol #kanal\`, Otorol Mesajı Ayarlamak İçin: \`${prefix}otorol-mesaj <mesaj>\``)
db.delete(`otokanal_${message.guild.id}`)   
  db.delete(`otorol_${message.guild.id}`)
db.delete(`otomesaj_${message.guild.id}`)

}; 

exports.conf = {
    aliases: ["otorol-sıfırla", "otrl-sıfırla", "otomatik-rol-sıfırla", "otorol-kapat", "otrl-kapat", "otomatik-rol-kapat"]
}
exports.help = {
  name: 'otorol-sıfırla'
};