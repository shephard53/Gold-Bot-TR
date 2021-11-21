const Discord = require('discord.js')
const moment = require('moment');
const config = require('../config.json');
const db = require('quick.db')
const client = new Discord.Client();

const botadi = "BOTADI"

var sahip = config.sahip;
exports.run = async (bot, msg, args) => {
                let prefix = await db.fetch(`prefix_${msg.guild.id}`) || config.prefix
        let simdikitarih = moment.utc(msg.createdAt).format('DD MM YYYY');

        let user = msg.mentions.users.first() || msg.author;

        let userinfo = {};
        userinfo.avatar= user.displayAvatarURL();
        userinfo.id = user.id;
        userinfo.od1 = msg.guild.members.cache.get(user.id).user.presence.activites || "Oynadığı bir oyun yok"
        userinfo.status = user.presence.status.toString()
        .replace("dnd", `\`Rahatsız Etmeyin\``)
        .replace("online", `\`Çevrimiçi\``)
        .replace("idle", `\`Boşta\``)
        .replace("offline", `\`Çevrimdışı\``)
        userinfo.bot = user.bot.toString()
        .replace("false", `\`Hayır\``)
        .replace("true", `\`Evet\``)
        userinfo.sonmesaj = user.lastMessage || "Son yazılan mesaj bulunamadı." || "Son yazılan mesaj gösterilemedi."

        userinfo.dctarih = moment.utc(msg.guild.members.cache.get(user.id).user.createdAt).format('YYYY [Yılında] - (DD:MM:YYYY)')

        .replace("Monday", `Pazartesi`)
        .replace("Tuesday", `Salı`)
        .replace("Wednesday", `Çarşamba`)
        .replace("Thursday", `Perşembe`)
        .replace("Friday", `Cuma\``)
        .replace("Saturday", `Cumartesi`)
        .replace("Sunday", `Pazar`)
        .replace("January", `Ocak`)
        .replace("February", `Şubat`)
        .replace("March", `Mart`)
        .replace("April", `Nisan`)
        .replace("May", `Mayıs`)
        .replace("June", `Haziran`)
        .replace("July", `Temmuz`)
        .replace("August", `Ağustos`)
        .replace("September", `Eylül`)
        .replace("October", `Ekim`)
        .replace("November", `Kasım`)
        .replace("December", `Aralık`)
        userinfo.dctarihkatilma = moment.utc(msg.guild.members.cache.get(user.id).joinedAt).format('YYYY [Yılında] MMMM [Ayında] dddd [Gününde] (DD/MM/YYYY)')
        .replace("Monday", `Pazartesi`)
        .replace("Tuesday", `Salı`)
        .replace("Wednesday", `Çarşamba`)
        .replace("Thursday", `Perşembe`)
        .replace("Friday", `Cuma`)
        .replace("Saturday", `Cumartesi`)
        .replace("Sunday", `Pazar`)
        .replace("January", `Ocak`)
        .replace("February", `Şubat`)
        .replace("March", `Mart`)
        .replace("April", `Nisan`)
        .replace("May", `Mayıs`)
        .replace("June", `Haziran`)
        .replace("July", `Temmuz`)
        .replace("August", `Ağustos`)
        .replace("September", `Eylül`)
        .replace("October", `Ekim`)
        .replace("November", `Kasım`)
        .replace("December", `Aralık`)
        const uembed = new Discord.MessageEmbed()
        .setAuthor(user.tag, userinfo.avatar)
        .setThumbnail(userinfo.avatar)
        .setColor("RANDOM")
        .addField("Kullanıcı Adı", `<@${user.id}> - ${user.tag}`, true)
        .addField("ID", `${userinfo.id}`, true)
        .addField("Durumu", userinfo.status, true)
        .addField("Katılım Tarihi (Discord)", userinfo.dctarih, true)
        .addField("Avatar URL", `[PNG](https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png?size=2048) - [JPG](https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.jpg?size=2048) - [GİF](https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.gif?size=2048) - [WEBP](https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.webp?size=2048)`, true)
        .addField("Rolleri:", `${msg.guild.members.cache.get(user.id).roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(' ') || "**Bu kullanıcıda hiçbir rol bulunmuyor**"}`, false)
        .setFooter(`${botadi} | Kullanıcı Bilgi`)
        msg.channel.send(uembed)
    }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kullanıcı-bilgi', 'kullanıcı-bilği'],
  permLevel: 0
};
exports.help = {
  name: 'kullanıcı-bilgi',
  description: 'İstediğiniz kullanıcını bilgilerini gösterir.',
  usage: 'kullanıcı'
};
