const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json');

exports.run = async (client, message, args) => { 
   let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
  
  let otomesaj = args.slice(0).join(' ');
  if(otomesaj.length < 5) return message.channel.send(new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`BOTADI - Otorol Mesajı`, client.user.avatarURL())
  .setDescription(`Otorol Mesajını Ayarlamak İçin \`${prefix}otorol-mesaj <mesaj>\``)
  .addField("Kullanılabilen Karakterler", `+ Sunucu Adı: **-sunucu-**\n+ Kullanıcı Tag: **-üye-**\n+ Kullanıcı Etiket: **-üyeetiket-**\n+ Toplam Kanal Kullanıcı: **-üyekaldı-**\n+ Rol Etiket: **-rol-**`)
  .addField("Örnek Kullanım", `\`\`\`fix\n${prefix}otorol-mesaj -üye- sunucuya katıldı! -rol- Rolü Verildi, Seninle Birlikte -üyekaldı-\`\`\``)
  .setFooter(`BOTADI - Otorol Mesajı`, client.user.avatarURL())
);

 message.channel.send('Otorol Mesajı Ayarlandı\n\`\`\`fix\n'+otomesaj+'\`\`\`') 
 db.set(`otomesaj_${message.guild.id}`, otomesaj)
    
};
exports.conf = {
  aliases: ["otorol-mesaj", "otrl-mesaj"]
}
exports.help = {
name: 'otorol-mesaj'
};