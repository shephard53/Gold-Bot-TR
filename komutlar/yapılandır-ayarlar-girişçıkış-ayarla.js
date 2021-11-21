const Discord = require("discord.js");
const config = require("../config.json");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
 
  let channel = message.mentions.channels.first();
  if (!channel) {
    return message.channel.send(`Bir kanal etiketleyin **örnek**: \`${prefix}giriş-çıkış-ayarla #kanal\``);
  }
  db.set(`gçkanal_${message.guild.id}`, channel.id);
  //var i = db.set(`capsE_${message.guild.id}`, "acik")
  message.channel.send(`Resimli Hoşgeldin - Güle Güle kanalı ${channel} Olarak Ayarlandı.`);
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gç-ayarla", "resimli-grşçkş-ayarla"],
  permLevel: 0
};
 
exports.help = {
  name: "giriş-çıkış-ayarla",
  description: "Giriş Çıkış Kanalını Ayarlar.",
  usage: "gç-ayarla <#kanal>"
};