const Discord = require('discord.js')
const db = require('quick.db')
const config = require('../config.json');
exports.run = async(client, message, args ) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.')
  
let banlanıcak = args[0]
let banlimit = await db.fetch(`banlimit_${message.guild.id}`)
 let bansayı= await db.fetch(`bansayı_${message.author.id}`)
let guild = message.guild
if (!banlanıcak) return message.channel.send(`Kişinin ID`)
 if(isNaN(banlanıcak)) return message.channel.send(`Kullanıcı kimliği yalnızca sayılardan oluşabilir`)
  
  message.channel.send(`Kullanıcının Engellemesi Başarıyla Kaldırıldı`)
guild.members.unban(banlanıcak)
  let kanal = await db.fetch(`banlog_${message.guild.id}`)
  if (kanal) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Kullanıcı Yasağı Kaldırıldı!')
    .setColor("RANDOM")
    .setDescription(`${banlanıcak} Idli Kullanıcısı <@${message.author.id}> Tarafından Sunucudan Yasaklandı`)
    .setTimestamp()
    client.channels.cache.get(kanal).send(sa)
  }
  

};
exports.conf = {
  aliases: ["un-ban"],
  permLevel: 0
};
exports.help = {
  name: 'unban'
}; 