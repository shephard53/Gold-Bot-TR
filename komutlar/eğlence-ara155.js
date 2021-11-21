const Discord = require("discord.js"); 

exports.run = (client, message, args) => {
const EmbedSuspect = new Discord.MessageEmbed()
    .setAuthor(`Polis Geliyor`, client.user.avatarURL())
    .setColor("RANDOM")
    .setImage(`https://tenor.com/view/cops-copchase-drift-gif-10527862` );
message.channel.send(EmbedSuspect);

  }

exports.conf = {
  enabled: true,
  guild0nly: false,
  aliases: ["ara155", "155"],
  permLevel: 0
};
exports.help = {
  name: "ara155",
  description: "etiketlenen kişiyi öpersiniz",
  usage: "ara155"
};
