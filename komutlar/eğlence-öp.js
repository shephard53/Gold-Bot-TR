const Discord = require("discord.js"); 

exports.run = (client, message, args) => {

  let mesaj = args.slice(0).join(" ");
  if (mesaj.length < 1) return message.channel.send("Kimi öpeceksin?"); 

const EmbedSuspect = new Discord.MessageEmbed()

    .setAuthor(" ")
    .setColor("RANDOM")
    .setDescription(
      message.author.username +
        ` **adlı kullanıcı, ${mesaj} adlı kullanıcıyı öptü.**` 
    )

    .setImage(
      `https://i.kym-cdn.com/photos/images/original/000/986/968/2f5.gif` 
    );
 return message.channel.send(EmbedSuspect);

  }

exports.conf = {
  enabled: true,
  guild0nly: false,
  aliases: ["öp", "öp"],
  permLevel: 0
};
exports.help = {
  name: "öp",
  description: "etiketlenen kişiyi öpersiniz",
  usage: "öp"
};
