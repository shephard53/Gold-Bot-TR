const Discord = require("discord.js");

exports.run = (client, message) => {

const Suspect = Math.floor(Math.random() * 100) + 1;

return message.channel.send(`**Efkarınız:** **%${Suspect}** **Efkar** `);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "efkarım",
  description: "Asterm | Efkarınızı ölçer",
  usage: "efkar Ölçer"
};
