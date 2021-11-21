const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons');
const config = require("../config.json");
const db = require("quick.db");

exports.run = async (client, message, args) => {
                let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png`)
    .setAuthor(`BOTADI - Davet`, client.user.avatarURL())
    .setDescription(`
**Rollü Davet:** [8 Prem Davet Linki](https://discord.com/oauth2/authorize?client_id=BOTİD&scope=bot&permissions=8589934591)

**Destek Sunucusu:** [Destek Sunucusu](https://discord.gg/4e7RSTyQGH)`)
    .setImage(``)
    .setTimestamp()
    .setFooter(`©2021 BOTADI`, client.user.avatarURL())
    
  let buton1 = new MessageButton()
  .setStyle('green')
  .setLabel('Davet') 
  .setID('davet')
  //
  let buton2 = new MessageButton()
  .setStyle('green') 
  .setLabel('Destek sunucusu') 
  .setID('destek')

   let buton3 = new MessageButton()
  .setStyle('green') 
  .setLabel('YouTube') 
  .setID('youtube')

  let buton4 = new MessageButton()
  .setStyle('green') 
  .setLabel('Oy ver') 
  .setID('oy')

message.channel.send({embed: embed, buttons: [
  buton1, buton2, buton3, buton4
]});
};
exports.conf = {
    aliases: ["davet", "d", "dvt", "linkler"]
};
exports.help = {
    name: "davet"
};