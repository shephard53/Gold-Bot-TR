const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
                let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
if(!args[0]) return message.channel.send(`Bir Karakter Seç: \`icon\`, \`banner\`\n**Örnek:** ${prefix}sunucu \`icon\``)

if(args[0] === "icon"){
    return message.channel.send(new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`**[[PNG](${message.guild.iconURL({format:"png",size:2048,dynamic:true})})]** - **[[JPG](${message.guild.iconURL({format:"jpg",size:2048,dynamic:true})})]** - **[[GİF](${message.guild.iconURL({format:"gif",size:2048,dynamic:true})})]** - **[[WEBP](${message.guild.iconURL({format:"webp",size:2048,dynamic:true})})]**`)
    .setImage(`${message.guild.iconURL({format:"png",size:2048,dynamic:true})}`))
};
if(args[0] === "banner"){
    return message.channel.send(new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`**[[PNG](${message.guild.bannerURL({format:"png",size:2048,dynamic:true})})]** - **[[JPG](${message.guild.bannerURL({format:"jpg",size:2048,dynamic:true})})]** - **~~[[GİF]()]~~** - **[[WEBP](${message.guild.bannerURL({format:"webp",size:2048,dynamic:true})})]**`)
    .setImage(`${message.guild.bannerURL({format:"png",size:2048,dynamic:true})}`))
};
};
exports.conf = {
    aliases: ["sunucu", "snc", "server", "sw"]
};
exports.help = {
    name: "sunucu"
};