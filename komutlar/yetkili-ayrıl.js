const discord = require('discord.js')
const config = require("../config.json");
const db = require('quick.db');
exports.run = async(client, virus,args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
            if (!virus.member.hasPermission("ADMINISTRATOR")) return virus.channel.send('Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.');
virus.channel.send("BOTADI görüşürüz ;(")
virus.guild.leave();

};
exports.conf = {
aliases: ["çık", "leave"]
};
exports.help = {
name: "ayrıl"
};