const Discord = require("discord.js"),
  db = require("quick.db");
  const config = require("../config.json");

  var prefix = config.prefix;
module.exports.run = async (client, message, args) => {
	 if(message.author.id !== message.guild.owner.user.id) if(message.author.id !== "768059323951087636") return message.reply('Bu komutu kullanabilmek için **Sunucu Sahibi** olmalısın!')
let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Lütfen log kanalını etiketleyiniz!`);
      message.channel.send(embed);
      return;
    }
    db.set(`bank_${message.guild.id}`, kanal.id);
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Ban limit log kanalı; ${kanal} olarak ayarlandı!`);
    message.channel.send(embed);
    return;
 
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban-protection"],
  permLevel: 3
};

exports.help = {
  name: "ban-koruma",
  description: "ban-koruma",
  usage: "ban-koruma"
};