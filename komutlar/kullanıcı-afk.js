const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json')

exports.run = async (client, message, args) => {
             let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
  let user = message.author
  let sebep = args.join(" ")
 
  if (!sebep) return message.channel.send(new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`Bir Sebeb Yazmalısın.`))
 
  db.set(`afk_${user.id}`, sebep)
  message.channel.send(new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`Artık \`${sebep}\` sebebiyle AFK'sın.`))
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'afk',
  description: "AFK olmanızı sağlar.",
  usage: 'afk'
}