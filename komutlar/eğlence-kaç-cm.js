const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message) => {

message.channel.send("Hemen Diyorum Abi 1 Saniye..").then(message => {

    var Suspect = [

      "**Senin Malafatın , 18CM 18CM Bu Zamana Göre Çok Az** :eggplant: ",
      "**Senin Malafatın , 11CM Azdaha Çalış Sonra Komutu DENE! ** :eggplant:",
      "**Senin Malafatın , 32CM Kardeş Sırrın Ne? ** :eggplant:",
      "**Senin Malafatın , 35CM Gene İyisin 35CM** :eggplant:",
      "**Senin Malafatın , 8CM İyi İyi 8CM Olamayanlar Var ** :eggplant:",
      "**Senin Malafatın , 65CM Çok Beslemişsin Kardeş Naptın Sen ** :eggplant:",
      "**Senin Malafatın , 5CM Azdaha Yedirmelisin ** :eggplant:",
      "**Senin Malafatın , 31CM Diyecek Bişi Bulamıyorum.. ** :eggplant:",
      "**Senin Malafatın , 14CM Azdaha Çalış Olacak Eminim** :eggplant:",
      "**Senin Malafatın ,  1CM Kardeş Naptın Hiç Yem Vermedinmi Be** :eggplant:"

    ];

    var Suspect = Suspect[Math.floor(Math.random() * Suspect.length)];

    message.edit(`${Suspect}`);
  
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kaçcm", "cmkaç", "kaçcm", "cm-kaç"],
  permLevel: 0
};

exports.help = {
  name: "kaç-cm",
  description: "Malafatını Söyler.",
  usage: "kaçcm"
};