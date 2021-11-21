
 exports.run = async (client, message) => {
        let db = require("quick.db")
        let Discord = require("discord.js")
        let config = require("../config.json")
              let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    let küfür = db.fetch(`küfür.${message.guild.id}.durum`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.')
      if(küfür) {
      db.delete(`küfür.${message.guild.id}`)
      message.channel.send(`**Başarılı ile küfür engel kapandı.**`).then(l => {
      l.delete({timeout: 5000})
    })
    }else{
      db.set(`küfür.${message.guild.id}.durum`,true)
      message.channel.send(`**Başarılı ile küfür engel açıldı.**`).then(l => {
      l.delete({timeout: 5000})
    })
    }
    }

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür-engel"],
  permLevel: 0
};

exports.help = {
  name: 'küfürengel',
  description: 'WESTRA',
  usage: 'WESTRA'
}