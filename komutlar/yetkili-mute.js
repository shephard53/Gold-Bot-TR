const discord = require('discord.js')
const db = require('quick.db')
const config = require("../config.json");

exports.run = async(client, message, args) => {
let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
let yetkili = db.fetch(`muteyetkilirol_${message.guild.id}`)

if(!message.member.roles.cache.has(yetkili)) if(message.author.id !== "768059323951087636") return message.channel.send(`Bu Komudu Kullanabilmen İçin <@&${yetkili}> Rolüne Sahip Olmalısın!`)

let muterol = db.fetch(`muterol_${message.guild.id}`)

if (!muterol) return message.channel.send(`Mute Rolü Ayarlanmamış! Ayarlamak İçin: \`${prefix}mute-rol @rol\``)
let kullanıcı = message.mentions.members.first()
if(!kullanıcı) return message.channel.send(`Muteleyeceğin Kullanıcıyı Belirt!`)

let sebep = args.slice(1).join(' ')
if (!sebep) return message.channel.send(`Muteleme Sebebini Belirtmelisin!`)

message.guild.channels.cache.forEach(x => x.createOverwrite(muterol, {
SEND_MESSAGES: false
}))
  
kullanıcı.roles.add(muterol)

message.channel.send(`${kullanıcı}, ${message.author} Tarafından **${sebep}** Nedeniyle Muteledi! \n Not: Mute Rolu Üste Olmasa Mute Çalışmaz`)

db.set(`mutelimi_${message.guild.id}_${kullanıcı.id}`, 'mutelimi')

}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'mute'
}