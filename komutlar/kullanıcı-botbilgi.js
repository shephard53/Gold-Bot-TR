const Discord = require("discord.js");
const moment = require("moment");
const ayarlar = require("../config.json");
const os = require("os");
const db = require("quick.db");
require("moment-duration-format");

exports.run = async (client, message, args) => {
                let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
          let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;
  let s = `${moment(client.user.createdAt).format("DD")} ${
    aylar[moment(client.user.createdAt).format("MM")]
  } ${moment(client.user.createdAt).format("YYYY")}`;
       
    let i = message.guild.shardID

  const msg = new Discord.MessageEmbed()
  .setColor("RANDOM")
    .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
    .setImage(``)
    .setAuthor(`BOTADI - İstatistik`, client.user.avatarURL())
    .setDescription(``)
    .addField("Bellek Kullanımı", `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} / 1 GB`, true)
    .addField("Bot Sahibi", `<@460920273064165407> - Ufqzyn#0001`, true)
    .addField("Sürümler", `Discord.js v${Discord.version} \nNode.js ${process.version}`, true)
    .addField("Botun Kuruluş Tarihi", `${s}`, true)
    .addField("Ping", `\`${Math.round(client.ws.ping)}\` <:online:736296428896387203>`, true)
    .addField('Link', `[Ekle](https://discord.com/oauth2/authorize?client_id=BOTİD&scope=bot&permissions=8) - [Destek](https://discord.gg/4e7RSTyQGH)`, true)
  .setTimestamp()
  .setFooter(`©2021 BOTADI`, client.user.avatarURL())
  return message.channel.send(msg);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bb", "botbilgi", "i", "istatistik"],
  permLevel: 0
};

exports.help = {
  name: "botbilgi",
  description: "Bot i",
  usage: "botbilgi"
};