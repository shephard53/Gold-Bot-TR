const Discord = require("discord.js"); 

exports.run = (client, message, args) => {
const EmbedSuspect = new Discord.MessageEmbed()
    .setAuthor(`Ambulans Geliyor`, client.user.avatarURL())
    .setColor("RANDOM")
    .setImage(`https://tenor.com/view/ambulance-gif-6249120` );
message.channel.send(EmbedSuspect);

  }

exports.conf = {
  enabled: true,
  guild0nly: false,
  aliases: ["ara112", "112"],
  permLevel: 0
};
exports.help = {
  name: "ara112",
  description: "etiketlenen kişiyi öpersiniz",
  usage: "ara112"
};
