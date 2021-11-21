const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json');

exports.run = async(client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.')

    if(!args[0])
    return message.channel.send(`Kurulum İçin Bir Karakter Seç, \`tamamla\`, \`sıfırla\`, \`ayarlar\`\n**Örnek:** ${prefix}kurulum tamamla`)
    // TAMAMLA
    if(args[0] === "tamamla"){
        db.set(`küfür.${message.guild.id}.durum`,true)
        db.set(`reklam.${message.guild.id}.durum`,true)
        return message.channel.send(`Kurulum Tamamlandı, \`Küfür\`, \`Link\` Filtreleri Açıldı`)
    };
    // TAMAMLA
    // SIFIRLA
    if(args[0] === "sıfırla"){
        db.delete(`küfür.${message.guild.id}.durum`,true)
        db.delete(`reklam.${message.guild.id}.durum`,true)
        return message.channel.send(`Kurulum Sıfırlandı, \`Küfür\`, \`Link\` Filtreleri Kapatıldı`)
    };
    // SIFIRLA
    // AYARLAR
    if(args[0] === "ayarlar"){
        return message.channel.send(new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Kurulum Açıkmı/Kapalımı Gösterir`)
        .addField("Link Engel", `${db.fetch(`reklam.${message.guild.id}`) ? `Açık` : `Kapalı` }`, true)
        .addField("Küfür Engel", `${db.fetch(`küfür.${message.guild.id}`) ? `Açık` : `Kapalı` }`, true))
    };
    // AYARLAR
};

exports.conf = {
    aliases: ['kurulum', 'krlm']
};
exports.help = {
    name: 'kurulum'
};