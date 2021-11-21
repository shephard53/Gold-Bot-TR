const Discord = require("discord.js"); 

exports.run = (client, message, args) => {
const EmbedSuspect = new Discord.MessageEmbed()
    .setAuthor(`Robert B Weide`, client.user.avatarURL())
    .setColor("RANDOM")
    .setImage(`https://cdn.discordapp.com/attachments/825792215024402504/835216375370481674/WarmheartedPhysicalHart-max-1mb.gif` );
message.channel.send(EmbedSuspect);

  }

exports.conf = {
  enabled: true,
  guild0nly: false,
  aliases: ["robertbweide", "rbw"],
  permLevel: 0
};
exports.help = {
  name: "robertbweide",
  description: "etiketlenen kişiyi öpersiniz",
  usage: "robertbweide"
};
