const Discord = require("discord.js"); 

exports.run = (client, message, args) => {
const EmbedSuspect = new Discord.MessageEmbed()
    .setAuthor(`İtfaiye Geliyor`, client.user.avatarURL())
    .setColor("RANDOM")
    .setImage(`https://cdn.discordapp.com/attachments/825792215024402504/835222061470973952/RigidMeaslyIvorygull-size_restricted.gif` );
message.channel.send(EmbedSuspect);

  }

exports.conf = {
  enabled: true,
  guild0nly: false,
  aliases: ["ara110", "110"],
  permLevel: 0
};
exports.help = {
  name: "ara110",
  description: "etiketlenen kişiyi öpersiniz",
  usage: "ara110"
};
