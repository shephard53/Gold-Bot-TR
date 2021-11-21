const Discord = require("discord.js");
const db = require('quick.db');
const config = require('../config.json');
exports.run = async (client, message, args, color) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    if(message.author.id !== "788536943377514496") if(message.author.id !== "460920273064165407") return message.reply(`bu komutu sadece Bot Sahibi kullanabilir!`);
    try {
        let codein = args.join(" ");
        let code = eval(codein);

      if (codein.length < 1) return message.reply(`deneyebilmek için bir kod girmelisin!`)
      
        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField('**Kod**', `\`\`\`js\n${codein}\`\`\``)
        .addField('**Sonuç**', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
      let embed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField('**Hata**', "\`\`\`js\n"+e+"\n\`\`\`")
        message.channel.send(embed2); // u!eval message.member.roles.add("831518217176481812")
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kod'],
    permLevel: `Bot sahibi olmak gerekir.`
  };
  
  exports.help = {
    name: 'eval',
    description: 'Kod denemeyi sağlar.',
    usage: 'r?eval'
  };