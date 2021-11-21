const Discord = require("discord.js");
const config = require("../config.json");
const db = require("quick.db");

exports.run = async (client, message, params, args) => {
                let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    const atamız = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(`https://cdn.discordapp.com/attachments/816247170437087293/822174593720385586/download.jpg`)
    .setAuthor(`Mustafa Kemal Atatürkü Saygı VE Sevgi İle Anıyoruz`, client.user.avatarURL())
    .setDescription(`Mustafa Kemal Atatürk, Türk asker, devlet adamı ve Türkiye Cumhuriyeti'nin kurucusudur. Birinci Dünya Savaşı sırasında Osmanlı ordusunda görev yapan Atatürk; Çanakkale Cephesi'nde miralaylığa, Sina ve Filistin Cephesi'nde ise Yıldırım Orduları komutanlığına atandı.`)
    .addField("Doğum tarihi:", `\`1881\`, \`Selanik Vilayeti\``, true)
    .addField("Ölüm tarihi ve yeri:", `\`10 Kasım 1938\`, \`Dolmabahçe Sarayı\`, \`İstanbul\``, false)
    .addField("Boy:", `1,74m`, true)
    .addField("Eğitim:", `\`Mekteb-i Erkân-ı Harbiye\` \`(1902–1905)\``, false)
    .setImage(``)
    .setFooter(`Mustafa Kemal Atatürkü Saygı VE Sevgi İle Anıyoruz`, client.user.avatarURL())
message.channel.send(atamız)
};

exports.conf = {
    aliases: ["atatürk", "mka", "atamız"]
};

exports.help = {
    name: "atatürk"
};