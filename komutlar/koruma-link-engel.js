
 exports.run = async (client, message) => {
        let db = require("quick.db")
        let Discord = require("discord.js")
        let config = require("../config.json")
              let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    let reklam = db.fetch(`reklam.${message.guild.id}.durum`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.')
      if(reklam) {
      db.delete(`reklam.${message.guild.id}`)
      message.channel.send(`**Başarılı ile link engel kapandı.**`).then(l => {
      l.delete({timeout: 5000})
    })
    }else{
      db.set(`reklam.${message.guild.id}.durum`,true)
      message.channel.send(`**Başarılı ile link engel açıldı.**`).then(l => {
      l.delete({timeout: 5000})
    })
    }
    }

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["link-engel"],
  permLevel: 0
};

exports.help = {
  name: 'linkengel',
  description: 'WESTRA',
  usage: 'WESTRA'
}