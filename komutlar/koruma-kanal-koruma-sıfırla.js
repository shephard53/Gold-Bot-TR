const Discord = require("discord.js"),
  db = require("quick.db");
  const config = require("../config.json");

module.exports.run = async (client, message, args) => {
	 if(message.author.id !== message.guild.owner.user.id) return message.reply('Bu komutu kullanabilmek için **Sunucu Sahibi** olmalısın!')
            let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    let kanal = await db.fetch(`kanalk_${message.guild.id}`)
    if (!kanal) {
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Kanal koruma zaten ayarlanmamış!`);
      message.channel.send(embed);
      return;
    }
    db.delete(`kanalk_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Kanal koruma sistemi sıfırlandı!`);
    message.channel.send(embed);
    return;
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["channel-protection-reset"],
  permLevel: 3
};

exports.help = {
  name: "kanal-koruma-sıfırla",
  description: "kanal-koruma-sıfırla",
  usage: "kanal-koruma-sıfırla"
};