const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../config.json');
module.exports.run = async (bot, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
 
  let u = message.mentions.users.first();
  if (!u) {
    return message.channel.send(`Lütfen banlanacak kişiyi etiketleyiniz!`
    );
  }
 
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
    .setDescription(
	`${u} Adlı şahsın sunucudan banlanmasını onaylıyor musunuz?`)
    .setFooter(bot.user.username, bot.user.avatarURL);
  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = ["✅"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });
    reactions.on("end", () => sentEmbed.edit("İşlem iptal oldu!"));
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "✅") {
    message.channel.send(`İşlem onaylandı! ${u} adlı şahıs sunucudan banlandı!`);
 
        message.guild.member(u).ban();
      }
    });
  });
};
 
module.exports.conf = {
  aliases: [],
  permLevel: 0,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};
 
module.exports.help = {
  name: "ban",
  description: "kick",
  usage: "ban"
};