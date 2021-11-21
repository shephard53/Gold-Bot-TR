const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../config.json')

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`log_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.send(`Modlog Kanalı Zaten ayarlı değil.`);
    db.delete(`log_${message.guild.id}`)
   message.channel.send(`ModLog Kanalı başarıyla sıfırlandı.`);
    return
  }
  //
if (!logk) return message.channel.send(`Bir Kanal Etiketle **Örnek**: \`${prefix}mod-log #kanal\``);

db.set(`log_${message.guild.id}`, logk.id)

message.channel.send(`Mod-Log kanalı başarıyla ${logk} olarak ayarlandı.`);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log','modlog','log-ayarlama','logayarla','log','vkanal','kayıtkanalı','d']
};

exports.help = {
    name: 'mod-log',
    description: 'Mod-Log kanalını belirler.',
    usage: 'mod-log <#kanal>'
};