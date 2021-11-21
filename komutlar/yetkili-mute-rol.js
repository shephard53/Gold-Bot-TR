const discord = require('discord.js')
const db = require('quick.db')
const config = require('../config.json');
exports.run = async(client, message, args) => {
let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    if (!message.member.hasPermission("MANAGE_GUILD")) if(message.author.id !== "768059323951087636") return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın!`);

if (args[0] === 'sıfırla') {
let rol = db.fetch(`muterol_${message.guild.id}`)  
  if (!rol) return message.channel.send(`Mute Rolü Ayarlanmamış!`)
  message.channel.send(`Mute Rolü Sıfırlandı!`)
db.delete(`muterol_${message.guild.id}`)
  return;
}

let rol = message.mentions.roles.first()
if(!rol) return message.channel.send(`Ayrlayacağınız Mute Rolü Belirtiniz!`)

db.set(`muterol_${message.guild.id}`, rol.id)

message.channel.send(`Mute Rolü ${rol} Olarak Ayarlandı!`)
  
}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: ['muterol'],
  permlevel: 0
}
exports.help = {
  name: 'mute-rol'
}