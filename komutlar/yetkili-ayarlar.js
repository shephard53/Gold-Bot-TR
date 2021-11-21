const Discord = require('discord.js'); 
const db = require('quick.db'); 
const ayarlar = require('../config.json')
exports.run = async (client, message, args) => { 
let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if (!message.guild) return;

let rolkoruma = db.fetch(`rolk_${message.guild.id}`);
let kanalkoruma = db.fetch(`kanalk_${message.guild.id}`);
let modlog = db.fetch(`log_${message.guild.id}`)
let güvenlik = db.fetch(`guvenlik${message.guild.id}`)
let giriscıkıs = db.fetch(`gçkanal_${message.guild.id}`);
let sayacsayı = db.fetch(`sayac_${message.guild.id}`)
let sayackanal = db.fetch(`sayacK_${message.guild.id}`)
let otorolkanal = db.fetch(`otokanal_${message.guild.id}`) 
let otorol = db.fetch(`otorol_${message.guild.id}`)
let vaggygçK = db.fetch(`grşçkşK_${message.guild.id}`)
let vaggyKRLMK = db.fetch(`KRLMK_${message.guild.id}`)

const ayarReis = new Discord.MessageEmbed() 
.setColor('RANDOM')
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
.setAuthor(`BOTADI Bot`, client.user.avatarURL())
.setDescription(`<:waggyhastag:843468293498601502> Sunucu Ayarlarına Buraya Göre Ayarlayabilirsiniz [Açık, Ayarlanmış](https://discord.com/oauth2/authorize?client_id=BOTİD&scope=bot&permissions=8)/[Kapalı, Ayarlanmamış](https://discord.com/oauth2/authorize?client_id=BOTİD&scope=bot&permissions=8) Gösterir`)
.addField("Reklam Engel", `${db.fetch(`reklam.${message.guild.id}`) ? `Açık` : `Kapalı` }`, true)
.addField("Küfür Engel", `${db.fetch(`küfür.${message.guild.id}`) ? `Açık` : `Kapalı` }`, true)
.addField("Rol Koruma", `${db.fetch(`rolk_${message.guild.id}`) ? `<#${rolkoruma}>` : `Ayarlanmamış` }`, true)
.addField("Kanal Koruma", `${db.fetch(`kanalk_${message.guild.id}`) ? `<#${kanalkoruma}>` : `Ayarlanmamış` }`, true)
.addField("Sayaç Sistemi", `${db.fetch(`sayacK_${message.guild.id}`) ? `<#${sayackanal}>` : `Ayarlanmamış` }\n${db.fetch(`sayac_${message.guild.id}`) ? `**${sayacsayı}**` : `Ayarlanmamış` }`, true)
.addField("Otorol Sistemi", `${db.fetch(`otokanal_${message.guild.id}`) ? `<#${otorolkanal}>` : `Ayarlanmamış` }\n${db.fetch(`otorol_${message.guild.id}`) ? `${message.guild.roles.cache.get(otorol)}` : `Ayarlanmamış` }\n${db.fetch(`otomesaj_${message.guild.id}`) ? `Ayarlanmış` : `Ayarlanmamış` }`, true)
.addField("Resimli Giriş Çıkış", `${db.fetch(`gçkanal_${message.guild.id}`) ? `<#${giriscıkıs}>` : `Ayarlanmamış` }`, true)
.addField("Mod-Log Sistemi", `${db.fetch(`log_${message.guild.id}`) ? `<#${modlog}>` : `Ayarlanmamış` }`, true)
.setTimestamp()
.setThumbnail()
.setImage(``)
.setFooter(`BOTADI Bot Sunucu Ayarları`, client.user.avatarURL())
message.channel.send(ayarReis)
}; 

exports.conf = {
    aliases: ["sunucu-ayarlar"]
}
exports.help = { 
name: "ayarlar",
}