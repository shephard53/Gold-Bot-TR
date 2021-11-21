const Discord = require('discord.js')
const db = require('quick.db')
const config = require("../config.json");

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
  
  const sayacsayi = await db.fetch(`sayac_${message.guild.id}`);
  const sayackanal = message.mentions.channels.first()

      
  if(args[0] !== "ayarla" && args[0] !== "sıfırla") return message.channel.send(`\`Sayaç Sistemi\` \nAyarlamak İçin: **${prefix}sayaç ayarla <sayı> #kanal** \nSıfırlanması İçin: **${prefix}sayaç sıfırla**`)
    if(args[0] === "sıfırla") {
    if(!sayacsayi) {
      message.channel.send(`**Ayarlanmamış Sayacı Sıfırlayamazsın**`)
return
    }
    
    db.delete(`sayac_${message.guild.id}`)
    db.delete(`sayacK_${message.guild.id}`)
    message.channel.send(`**Sayaç Başarıyla Sıfırlandı** \nAyarlamak İstiyorsan: **${prefix}sayaç ayarla sayı #kanal**`)
    return
  }
  
  if(args[0] === "ayarla") {
  if(isNaN(args[1])) {
    message.channel.send(`**Bir Sayı Yazmalısın.**`)
    return
  }
  
  if(!sayackanal) {
   await message.channel.send(`**Sayaç Kanalını Etiketlemelisin.**`)
  return
  }
  
  

  

 
        if(args[1] <= message.guild.memberCount) {
                message.channel.send(`Sunucudaki Kullanıcı Sayısından **${message.guild.memberCount}** Daha Yüksek Sayı Girmelisin.`)
                return
        }
  
  db.set(`sayac_${message.guild.id}`, args[1])
  db.set(`sayacK_${message.guild.id}`, sayackanal.id)
  
  message.channel.send(`Sayaç Ayarlandı \`${args[1]}\` Sayaç Kanalı ${sayackanal} Olarak Ayarlandı.`)
}
}
 
exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['sayaç'],
        permLevel: 0
}
 
exports.help = {
        name: 'sayaç',
        description: 'Sayacı ayarlar.',
        usage: 'sayaç <sayı> <#kanal> / sıfırla'
}