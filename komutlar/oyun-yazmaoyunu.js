const Discord = require('discord.js')


const cümle = require('../oyun/yazmaoyunu.json');
let aktif = [];

exports.run = async (client, message) => {
  if (aktif.includes(message.channel.id)) {
    return message.reply('Oyun zaten başlatılmış.')
  }

  aktif.push(message.channel.id);
const eeembed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle('Yazma Oyunu')
.setDescription(`Oyun ${message.author} tarafından başlatıldı. Botun biraz sonra yazacağı cümleyi yazan kazanır.\nLütfen kopyala-yapıştır yapmayınız.`)
.setFooter(`Bu görevi tamamlamak için ${5} dakikan var!`)
  let oyundurumu = await message.channel.send(eeembed);
let asıl = Math.floor(Math.random() * Object.keys(cümle).length) + 1;
  const embed = new Discord.MessageEmbed()
  .setDescription(cümle[asıl])
  let cümlemesaj = await message.channel.send(embed)
  const collector = message.channel.createMessageCollector(
 msg => msg.content === cümle[asıl],
    {
      time: 5 * 60 * 1000,
      maxMatches: 1
    }
  );

  collector.on('end', async (collection, reason) => {
    let color, result;
    if (reason === 'time') {
      color = 0x66c4a6;
      result = 'Oyun bitti. Malesef, kimse zamanında yazmayı başaramadı.';
    }
    else {
      color = 0x66c4a6;
      result = `Oyun bitti. Tebrikler ${collection.map(m => m.author)[0]}! Sen kazandın.`;
    }
const eembed = new Discord.MessageEmbed()
.setColor()
.setTitle('Yazma Oyunu')
.setDescription(result)
    await message.channel.send(eembed).catch(e => {
      client.log.error(e);
    });
    oyundurumu.delete().catch(() => {});
 
    cümlemesaj.delete().catch(() => {});

    aktif = aktif.slice(aktif.indexOf(message.channel.id) + 1, 1);
  });
};

exports.conf = {
  aliases: [ 'yazmaoyunu' ],
  enabled: true,
  permLevel: 0,
  guildOnly: true
};

exports.help = {
  name: 'yazma-oyunu',
  description: 'Komut kullanıldıktan sonra, botun yazdığı cümleyi ilk yazan kazanır.',
  category: 'Oyun',
  usage:'yazma-oyunu',
};