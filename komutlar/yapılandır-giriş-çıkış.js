const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json');

exports.run = async(client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<:wessyred:837666400897597490> Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
    let vaggygrşçkşkanal = message.mentions.channels.first()

    if(!vaggygrşçkşkanal) return message.channel.send(`<:wessyred:837666400897597490> Giriş Çıkış Mesajı'nın Gideceği Kanal İçin, Bir Kanal Etiketle **Örnek**: \`${prefix}giriş-çıkış #kanal\``)

    message.channel.send(`<:wessytik:837666400960118834> Giriş Çıkış Kanalı **${vaggygrşçkşkanal}** Olarak Güncelledim!\nGiriş Çıkış Hoşgeldin VE Görüşürüz Mesajı Ayarlamak İçin\`${prefix}giriş-çıkış-hg | ${prefix}giriş-çıkış-bb\` Yazarak Ayarlayabilirsin!`)
    db.set(`vaggygrşçkşK_${message.guild.id}`, vaggygrşçkşkanal.id)
};

exports.conf = {
    aliases: ['giriş-çıkış', 'gç', 'gc']
};
exports.help = {
    name: 'giriş-çıkış'
};