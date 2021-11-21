const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../config.json");

exports.run = async (client, message, args) => {
let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
let otokanal = message.mentions.channels.first()
let otorol = message.mentions.roles.first()
if(!otorol) return message.channel.send(`Bir Rol Etiketle **Örnek**: \`${prefix}otorol-ayarla @rol\``)
if(!otokanal) return message.channel.send(`Bir Kanal Etiketle **Örnek**: \`${prefix}otorol-ayarla #kanal\``)

   
message.channel.send(`**Otomatik Rol Sistemi aktif edildi**\n Kullanıcılara Verilecek Rol ${otorol} Olarak Ayarladım Kayıt Kanalını İse ${otokanal} Olarak Ayarladım\nOtorol Mesajı Ayarlamak İçin: \`${prefix}otorol-mesaj\` \n**V'AGGY Rolünü Üstte Bulunması Gerekmektedir Yoksa Otorol Verilmez**`)
   
db.set(`otokanal_${message.guild.id}`, otokanal.id)   
  db.set(`otorol_${message.guild.id}` , otorol.id)
 };

exports.conf = { 
enabled: true,
guildOnly: false,
 aliases: ['otorol'], 
permLevel: 0
}

exports.help = {
 name: 'otorol-ayarla', 
description: 'taslak',
 usage: 'oto-rol-ayarla' 
};