const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json')

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
  let SAASmsj = args.join(" ");
  if(SAASmsj.length < 5) return message.channel.send(new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`BOTADI - SA AS Mesaj`, client.user.avatarURL())
  .setDescription(`Karşılama Mesajını Ayarlamak İçin \`${prefix}sa-as-mesaj <mesaj>\``)
  .addField("Kullanılabilen Karakterler", `+ Sunucu Adı: **-sunucu-**\n+ Kullanıcı Etiket: **-üyeetiket-**\n+ Toplam Kullanıcı: **-üyesayisi-**`)
  .addField("Örnek Kullanım", `\`\`\`fix\n${prefix}sa-as-mesaj Aleyküm Selam Hoşgeldin -üyeetiket- Seninle Birlikte -üyesayisi- kişiyiz!\`\`\``)
  .setFooter(`BOTADI - SA AS Mesaj`, client.user.avatarURL())
  );

  message.channel.send('Karşılama Mesajı Ayarlandı\n\`\`\`fix\n'+SAASmsj+'\`\`\`') 
  db.set(`SAASmesaj_${message.guild.id}`, SAASmsj)
};      

exports.conf = {
 aliases: ['saas-msg', 'sa-as-mesaj', 'saas-mesaj']
};

exports.help = {
 name: 'sa-as-msg'
};