const discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db');
const config = require('../config.json');
require("moment-duration-format");

exports.run = async (client, message, args) => {
                let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
                
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
    
 const embed = new discord.MessageEmbed()
 .setColor("RANDOM")
    .setTitle(`BOTADI - Sunucu Bilgi`)
    .addField("Sunucu Sahibi ID", `<@${message.guild.owner.id}> - ${message.guild.owner.user.tag}`, true)
    .addField("Sunucu Bölgesi", `${message.guild.region}`, true)
    .addField("Oluşturulma Tarihi", `${s}`, true)
   .addField("Kanallar:", `${message.guild.channels.cache.filter(chan => chan.type === 'text').size} **Yazı** 💬 | ${message.guild.channels.cache.filter(chan => chan.type === 'voice').size} **Ses** 🔉`, true)
    .addField("Doğrulama Seviyesi:", `${message.guild.verificationLevel}`, true)
    .addField("İcon VE Banned URL:", `[İCON PNG](${message.guild.iconURL({format:"png",size:2048,dynamic:true})}) - [BANNER PNG](${message.guild.bannerURL({format:"png",size:2048,dynamic:true})})`)
    .addField("Toplam Kullanıcılar", `${message.guild.memberCount}`, true)
   .setThumbnail(message.guild.iconURL({format:"png",size:2048,dynamic:true}))
   .setImage()
   .setTimestamp()
  .setFooter(`©2021 BOTADI`, client.user.avatarURL())
message.channel.send(embed)
};
exports.conf = {
    enabled: true, 
    guildOnly: false,
    aliases: [],
    permLevel: 0
    };
    exports.help = {
        name : "sunucu-bilgi"
        };