const Discord = require("discord.js");
const client = new Discord.Client();
require('discord-buttons')(client)
const fs = require('fs');
const db = require('quick.db')
const Canvas = require('canvas')
const ms = require("ms")
const moment = require("moment")
const config = require('./config.json');

const log = message => {
  console.log(` ${message}`);
};

require('./util/eventLoader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`); //
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name); //
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)]; //
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name); //
            });
            resolve();
        } catch (e) {
         reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.on("ready", () => { 
  console.log ('');
      console.log (`Kullanıcı İsmi     : ${client.user.username}`);
      console.log (`Sunucular          : ${client.guilds.cache.size}`);
      console.log (`Prefix             : ${config.prefix}`);
      console.log (`Durum              : Bot Çevrimiçi!`);
      console.log ('');
  client.user.setStatus("online");
  client.user.setActivity(`!yardım`);
})


client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)]; //
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
   if (config.sahip.includes(message.author.id)) permlvl = 4;
    return permlvl;
};

client.login(config.token) // client.login("TOKEN")
///////////////////////////////////// BOT.JS //////////////////////////////////////////
// OTOROL MESAJ
client.on("guildMemberAdd", async member => {
    const otorol = await db.fetch(`otorol_${member.guild.id}`);
    if (!otorol) return;
    const otokanal = await db.fetch(`otokanal_${member.guild.id}`);
    if (!otokanal) return;
    const otomesaj = await db.fetch(`otomesaj_${member.guild.id}`)
    const OTOMSG = otomesaj.replace('-sunucu-', `${member.guild.name}`) .replace('-üye-',`${member.user.tag}`) .replace('-üyeetiket-',`<@${member.user.id}>`) .replace('-üyekaldı-',`${member.guild.memberCount}`) .replace('-rol-',`${member.guild.roles.cache.get(vaggyotorol).name}`)
    member.roles.add(otorol);
    member.guild.channels.cache.get(otokanal).send(OTOMSG);
})
// OTOROL MESAJ
//SAYAÇ
client.on("guildMemberAdd", async member => {
    let sayac = await db.fetch(`sayac_${member.guild.id}`);
    let skanal = await db.fetch(`sayacK_${member.guild.id}`);
    if (!sayac) return;
    if (member.guild.memberCount >= sayac) {
      member.guild.channels.cache
        .get(skanal)
        .send(`**${
            member.user.tag
          }** Sunucuya **Katıldı**! \`${db.fetch(
            `sayac_${member.guild.id}`
          )}\` Kullanıcı Oldu Sayaç Başarıyla Sıfırlandı.`);
      db.delete(`sayac_${member.guild.id}`);
      db.delete(`sayacK_${member.guild.id}`);
      return;
    } else {
      member.guild.channels.cache
        .get(skanal)
        .send(`\`${
            member.user.tag
          }\`  Adlı Kullanıcı Sunucuya **Katıldı** \`${db.fetch(
            `sayac_${member.guild.id}`
          )}\` Kullanıcı Olmaya  \`${db.fetch(`sayac_${member.guild.id}`) -
           member.guild.memberCount}\` Kullanıcı Kaldı. \`${
            member.guild.memberCount
           }\` Kişiyiz!`);
    }
  });
  
  client.on("guildMemberRemove", async member => {
    let sayac = await db.fetch(`sayac_${member.guild.id}`);
    let skanal = await db.fetch(`sayacK_${member.guild.id}`);
    if (!sayac) return;
    member.guild.channels.cache
      .get(skanal)
     .send(`\`${
          member.user.tag
        }\` Adlı Kullanıcı Sunucudan **Ayrıldı** \`${db.fetch(
          `sayac_${member.guild.id}`
       )}\` Kullanıcı Olmaya \`${db.fetch(`sayac_${member.guild.id}`) -
           member.guild.memberCount}\` Kullanıcı Kaldı. \`${
         member.guild.memberCount
        }\` Kişiyiz!`);
  });
  // SAYAÇ

  // BAN SİSTEM
client.on("guildBanAdd", async (guild, user) => {
    let aylartoplam = {
      "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
    };
    let aylar = aylartoplam;
    let s = `${moment(client.user.createdAt).format("DD")} ${
      aylar[moment(client.user.createdAt).format("MM")]
    } ${moment(client.user.createdAt).format("YYYY HH:mm:ss")}`;
    
    let kontrol = await db.fetch(`dil_${guild.id}`);
    let kanal = await db.fetch(`bank_${guild.id}`);
    let rol = await db.fetch(`banrol_${guild.id}`);
    if (!kanal) return;
    if (kontrol == "agayokaga") {
      const entry = await guild
        .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
        .then(audit => audit.entries.first());
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == guild.owner.id) return;
      guild.members.unban(user.id);
      guild.members.cache.get(entry.executor.id).kick();
      const embed = new Discord.MessageEmbed()
        .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
        .setTitle(`Biri Yasaklandı!`)
        .setColor("RANDOM")
        .addField("Yasaklayan", `\`\`\`${entry.executor.tag}\`\`\``)
        .addField("Yasaklanan Kişi", `\`\`\`${user.name}\`\`\``)
        .addField(
          `Sonuç`,
          `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
        )
        .addField("Tarih", `\`\`\`${s}\`\`\``);
      client.channels.cache.get(kanal).send(embed);
    } else {
      const entry = await guild
        .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
        .then(audit => audit.entries.first());
      if (entry.executor.id == client.user.id) return;
      if (entry.executor.id == guild.owner.id) return;
      guild.members.unban(user.id);
      guild.members.cache.get(entry.executor.id).kick();
      const embed = new Discord.MessageEmbed()  
        .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
        .setTitle(`Biri Yasaklandı!`)
        .setColor("RANDOM")
        .addField("Yasaklayan", `\`\`\`${entry.executor.tag}\`\`\``)
        .addField("Yasaklanan Kişi", `\`\`\`${user.name}\`\`\``)
        .addField(
          `Sonuç`,
          `Yasaklayan Kişi Sunucudan Atıldı ve yasaklanan kişinin yasağı kalktı `
        )
        .addField("Tarih", `\`\`\`${s}\`\`\``);
      client.channels.cache.get(kanal).send(embed);
    }
  });
  // BAN SİSTEM
  
  // MOD LOG
client.on("voiceChannelJoin", async(channel) => {
  
  let modlog = await db.fetch(`log_${channel.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await channel.guild.fetchAuditLogs({type: 'VOICE_CHANNEL_JOIN'}).then(audit => audit.entries.first());
    
      let kanal;
  
      if (channel.type === "voice") kanal = `\`\`\`${channel.id}\`\`\``
  
  let embed = new Discord.MessageEmbed()
  
  .setDescription(`\`<@${entry.executor.tag}>\` adlı kullanıcı <#${kanal}> adlı ses kanalına katıldı!`)
  
  .setColor("RANDOM")
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("voiceChannelLeave", async(channel) => {
  
  let modlog = await db.fetch(`log_${channel.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await channel.guild.fetchAuditLogs({type: 'VOICE_CHANNEL_LEAVE'}).then(audit => audit.entries.first());
  
            let kanal;
  
      if (channel.type === "voice") kanal = `\`\`\`${channel.id}\`\`\``
      
  let embed = new Discord.MessageEmbed()
  
  .setDescription(`\`${entry.executor.tag}\` adlı kullanıcı <#${kanal}> adlı ses kanalından ayrıldı!`)
  
  .setColor("RANDOM")
 
  client.channels.cache.get(modlog).send(embed)
  
  })

  client.on("messageDelete", async (message) => {
  
    if (message.author.bot || message.channel.type == "dm") return;
  
    let log = message.guild.channels.cache.get(await db.fetch(`log_${message.guild.id}`));
  
    if (!log) return;
  
    const embed = new Discord.MessageEmbed()
  
    .setColor("RANDOM")
  
    .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
      .setTitle("Mesaj Silindi")
  
      .addField("Mesajı Silen", `${message.author.tag}`, true)

      .addField("ID", `${message.author.id}`, true)
  
      .addField("Mesaj: ", `\`\`\`${message.content}\`\`\``, false)

      .setTimestamp()
  
    log.send(embed)
  
  })
  
  client.on("messageUpdate", async (oldMessage, newMessage) => {
  
    let modlog = await db.fetch(`log_${oldMessage.guild.id}`);
  
    if (!modlog) return;
  
    let embed = new Discord.MessageEmbed()
  
    .setAuthor(`Mesaj Düzenleme`)
  
    .addField("Mesajın Düzenleyen", `${oldMessage.author.tag}`, true)
    
    .addField("ID", `${oldMessage.author.id}`, true)
  
    .addField("Eski Mesajı", `\`\`\`${oldMessage.content}\`\`\``, false)
  
    .addField("Yeni Mesajı", `\`\`\`${newMessage.content}\`\`\``, false)
  
    .setTimestamp()
  
    .setColor("RANDOM")
  
  .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
    client.channels.cache.get(modlog).send(embed)
  
  });
  
  client.on("channelCreate", async(channel) => {
  
    let modlog = await db.fetch(`log_${channel.guild.id}`);
  
      if (!modlog) return;
  
      const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  
      let kanal;
  
      if (channel.type === "text") kanal = `\`\`\`${channel.name}\`\`\``
  
      if (channel.type === "voice") kanal = `\`\`\`${channel.name}\`\`\``

      if (channel.type === "text") kanalid = `\`\`\`${channel.id}\`\`\``
  
      if (channel.type === "voice") kanalid = `\`\`\`${channel.id}\`\`\``
  
      let embed = new Discord.MessageEmbed()
  
      .setAuthor(`Kanal Oluşturma`)
  
      .addField("Oluşturan", `${entry.executor.tag}`, true)

      .addField("ID", `${entry.executor.id}`, true)
  
      .addField("Oluşturduğu Kanal", `${kanal}`, false)

      .addField("Oluşturulan ID", `${kanalid}`, false)
  
      .setTimestamp()
  
      .setColor("RANDOM")
  
      .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
      client.channels.cache.get(modlog).send(embed)
  
      })
  
  client.on("channelDelete", async(channel) => {
  
    let modlog = await db.fetch(`log_${channel.guild.id}`);
  
      if (!modlog) return;
  
      const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  
      let embed = new Discord.MessageEmbed()
  
      .setAuthor(`Kanal Silme`)
  
      .addField("Silen", `${entry.executor.tag}`, true)

      .addField("ID", `${entry.executor.id}`, true)
  
      .addField("Silinen Kanal", `\`\`\`${channel.name}\`\`\``, false)

      .addField("Silinen İD", `\`\`\`${channel.id}\`\`\``, false)
  
      .setTimestamp()
  
      .setColor("RANDOM")
  
      .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
      client.channels.cache.get(modlog).send(embed)
  
      })
  
  client.on("roleCreate", async(role) => {
  
  let modlog = await db.fetch(`log_${role.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(`Rol Oluşturma`)
  
  .addField("Oluşturan", `${entry.executor.tag}`, true)

  .addField("ID", `${entry.executor.id}`, true)
  
  .addField("Oluşturulan Rol", `\`\`\`${role.name}\`\`\``, false)

  .addField("Oluşturulan Rol ID", `\`\`\`${role.id}\`\`\``, false)
  
  .setTimestamp()
  
  .setColor("RANDOM")
  
  .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("roleDelete", async(role) => {
  
  let modlog = await db.fetch(`log_${role.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(`Rol Silme`)
  
  .addField("Silen", `${entry.executor.tag}`, true)

  .addField("ID", `${entry.executor.id}`, true)
  
  .addField("Silinen Rol", `\`\`\`${role.name}\`\`\``, false)

  .addField("Silinen Rol ID", `\`\`\`${role.id}\`\`\``, false)
  
  .setTimestamp()
  
  .setColor("RANDOM")
  
  .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("emojiCreate", async(emoji) => {
  
  let modlog = await db.fetch(`log_${emoji.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(`Emoji Oluşturma`)
  
  .addField("Oluşturan", `${entry.executor.tag}`, true)

  .addField("ID", `${entry.executor.id}`, true)
  
  .addField("Oluşturulan Emoji", `\`\`\`${emoji.name}\`\`\``, false)

  .addField("Oluşturulan Emoji ID", `\`\`\`${emoji.id}\`\`\``, false)
  
  .setTimestamp()
  
  .setColor("RANDOM")
  
  .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("emojiDelete", async(emoji) => {
  
  let modlog = await db.fetch(`log_${emoji.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(`Emoji Silme`)
  
  .addField("Silen", `${entry.executor.tag}`, true)

  .addField("ID", `${entry.executor.id}`, true)
  
  .addField("Silinen Emoji", `\`\`\`${emoji.name}\`\`\``, false)

  .addField("Silinen Emoji ID", `\`\`\`${emoji.id}\`\`\``, false)
  
  .setTimestamp()

  .setColor("RANDOM")
  
  .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("emojiUpdate", async(oldEmoji, newEmoji) => {
  
  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);
  
  if (!modlog) return;
  
  const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setAuthor(`Emoji Güncelleme`)
  
  .addField("Güncelleyen", `${entry.executor.tag}`, true)

  .addField("ID", `${entry.executor.id}`, true)
  
  .addField("Güncellenmeden önceki Emoji", `\`\`\`${oldEmoji.name}\`\`\``, false)
  
  .addField("Güncellendikten Sonraki Emoji", `\`\`\`${newEmoji.name}\`\`\``, false)
  
  .setTimestamp()
  
        .setColor("RANDOM")
  
  .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("guildBanAdd", async(guild, user) => {
  
  let modlog = await db.fetch(`log_${guild.id}`);
  
  if (!modlog) return;
  
  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
  .setAuthor(`Yasaklama`)
  
  .addField("Yasaklayan", `${entry.executor.tag}`, true)

  .addField("ID", `${entry.executor.id}`, true)
  
  .addField("Yasaklanan Kullanıcı", `\`\`\`${user.tag}\`\`\``, false)

  .addField("Yasaklanan ID", `\`\`\`${user.id}\`\`\``, false)
  
  .addField("Yasaklanma Sebebi", `\`\`\`${entry.reason}\`\`\``, false)
  
  .setTimestamp()
  
  .setColor("RANDOM")
  
  client.channels.cache.get(modlog).send(embed)
  
  })
  
  client.on("guildBanRemove", async(guild, user) => {
  
  let modlog = await db.fetch(`log_${guild.id}`);
  
  if (!modlog) return;
  
  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());
  
  let embed = new Discord.MessageEmbed()
  
  .setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  
  .setAuthor(`Yasak kaldırma`)
  
  .addField("Kaldıran", `${entry.executor.tag}`, true)

  .addField("ID", `${entry.executor.id}`, true)
  
  .addField("Yasağı Kaldırılan Kullanıcı", `\`\`\`${user.tag}\`\`\``, false)

  .addField("Yasağı Kaldırılan ID", `\`\`\`${user.id}\`\`\``, false)
  
  .setTimestamp()
  //
  .setColor("RANDOM")
  //
  //
  client.channels.cache.get(modlog).send(embed)
  
  })
  // MOD LOG

  // GİRİŞ ÇIKIŞ
client.on("guildMemberRemove", async member => {
    //let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
    //const canvaskanal = member.guild.channels.cache.get(resimkanal[member.guild.id].resim);
    
    if (db.has(`gçkanal_${member.guild.id}`) === false) return;
    var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
    if (!canvaskanal) return;
  
    const request = require("node-superfetch");
    const Canvas = require("canvas"),
      Image = Canvas.Image,
      Font = Canvas.Font,
      path = require("path");
  
    var randomMsg = ["Sunucusundan ayrıldı görüşürüz"];
    var randomMsg_integer =
      randomMsg[Math.floor(Math.random() * randomMsg.length)];
  
    let msj = await db.fetch(`cikisM_${member.guild.id}`);
    if (!msj) msj = `**${member.guild.name}** ${randomMsg_integer} {uye}`;
  
    const canvas = Canvas.createCanvas(640, 360);
    const ctx = canvas.getContext("2d");
  
    const background = await Canvas.loadImage(
      "GÖRÜŞÜRÜZ-PNG"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    let avatarURL = member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 });
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
  
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 250, 55, 110, 110);
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "güle-güle.png"
    );
  
      canvaskanal.send(attachment);
      canvaskanal.send(
        msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
      );
      if (member.user.bot)
        return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
    
  });
  
  client.on("guildMemberAdd", async member => {
    if (db.has(`gçkanal_${member.guild.id}`) === false) return;
    var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
  
    if (!canvaskanal || canvaskanal ===  undefined) return;
    const request = require("node-superfetch");
    const Canvas = require("canvas"),
      Image = Canvas.Image,
      Font = Canvas.Font,
      path = require("path");
  
    var randomMsg = ["Sunucusuna hoşgeldin"];
    var randomMsg_integer =
      randomMsg[Math.floor(Math.random() * randomMsg.length)];
      
    let paket = await db.fetch(`pakets_${member.id}`);
    let msj = await db.fetch(`cikisM_${member.guild.id}`);
    if (!msj) msj = `**${member.guild.name}** ${randomMsg_integer} {uye}`;
  
    const canvas = Canvas.createCanvas(640, 360);
    const ctx = canvas.getContext("2d");
  
    const background = await Canvas.loadImage(
      "HOŞGELDİN-PNG"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    let avatarURL = member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
  
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 250, 55, 110, 110);
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "hoşgeldin.png"
    );
  
    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
  });
  // GİRİŞ ÇIKIŞ

  //küfür engel //
const küfür = [
    "ABAZA",
    "Abaza",
    "abaza",
    "peç",
    "siktir",
    "fuck",
    "puşt",
    "pust",
    "piç",
    "sikerim",
    "sik",
    "yarra",
    "yarrak",
    "amcık",
    "orospu",
    "orosbu",
    "orosbucocu",
    "oç",
    ".oc",
    "ibne",
    "yavşak",
    "bitch",
    "dalyarak",
    "amk",
    "awk",
    "taşak",
    "taşşak",
    "daşşak",
    "sikm",
    "sikim",
    "sikmm",
    "skim",
    "skm",
    "sg",
"peç",
"p_ç",
"sikik"
  ];
client.on("messageUpdate", async (old, nev) => {

if (old.content != nev.content) {
let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
if (i) {
  
  if (küfür.some(word => nev.content.includes(word))) {
  if (nev.member.hasPermission("BAN_MEMBERS")) return ;
   //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
const embed = new Discord.MessageEmbed()         .setColor("RANDOM") .setDescription(`${nev.author} , **Mesajını Editleyerek Küfür Etmeye Çalıştı!**`)
        .addField("Küfür:",nev)
    
        nev.delete();
        const embeds = new Discord.MessageEmbed()         .setColor("RANDOM") .setDescription(`${nev.author} , **Mesajı Editleyerek Küfür Etmene İzin Veremem!**`) 
      client.channels.cache.get(y).send(embed)
        nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
      
  }
} else {
}
if (!i) return;
}
});

client.on("message", async msg => {

 
if(msg.author.bot) return;
if(msg.channel.type === "dm") return;
     let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);

let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
      if (i) {
          if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
            try {
             if (!msg.member.hasPermission("MANAGE_GUILD")) {
             //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
 msg.delete({timeout:750});
                msg.channel.send(`<@${msg.author.id}>, Bu Sunucuda Küfür **FİLTRESİ** Açık!`)
  msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
            const embed = new Discord.MessageEmbed()        .setColor("RANDOM") .setDescription(`${msg.author}, **Küfür Etmeye Çalıştı!**`) .addField("Mesajı:",msg)
           msg.channels.cache.get(y).send(embed)
              }              
            } catch(err) {
              console.log(err);
            }
          }
      }
     if(!i) return ;
});

// KÜFÜR ENGEL

//ROL VE KANAL KORUMA
client.on("roleCreate", async role => {
const entry = await role.guild
.fetchAuditLogs({ type: "ROLE_CREATE" })
.then(audit => audit.entries.first());
let rol = await db.fetch(`rolrol_${role.guild.id}`);
let kontrol = await db.fetch(`dil_${role.guild.id}`);
let kanal = await db.fetch(`rolk_${role.guild.id}`);
if (!kanal) return;
if (kontrol == "agayokaga") {
if (entry.executor.id == client.user.id) return;
if (entry.executor.id == role.guild.owner.id) return;
role.delete();

const embed = new Discord.MessageEmbed()
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  .setTitle(`Bir Rol Açıldı!`)
  .setColor("RANDOM")
  .addField(`Açan`, entry.executor.tag)
  .addField(`Açılan Rol`, role.name)
  .addField(`Sonuç`, `Rol Geri Silindi!`);
client.channels.cache.get(kanal).send(embed);
} else {
if (entry.executor.id == client.user.id) return;
if (entry.executor.id == role.guild.owner.id) return;
role.delete();

const embed = new Discord.MessageEmbed()
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  .setTitle(`Bir Rol Açıldı!`)
  .setColor("RANDOM")
  .addField(`Rolu Açan`, entry.executor.tag)
  .addField(`Açılan Rol`, role.name)
  .addField(`Sonuç`, `Açılan Rol Geri Silindi!`);
client.channels.cache.get(kanal).send(embed);
}
});

client.on("channelDelete", async channel => {
let kontrol = await db.fetch(`dil_${channel.guild.id}`);
let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
if (!kanal) return;
if (kontrol == "agayokaga") {
const entry = await channel.guild
  .fetchAuditLogs({ type: "CHANNEL_DELETE" })
  .then(audit => audit.entries.first());
if (entry.executor.id == client.user.id) return;
if (entry.executor.id == channel.guild.owner.id) return;
channel.guild.channels.create(channel.name, channel.type, [
  {
    id: channel.guild.id,
    position: channel.calculatedPosition
  }
]);

const embed = new Discord.MessageEmbed()
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  .setTitle(`Bir Kanal Silindi!`)
  .addField(`Silen`, entry.executor.tag)

  .addField(`Silinen Kanal`, channel.name)
  .addField(`Sonuç`, `Kanal Geri Açıldı!`)

  .setColor("RANDOM");
client.channels.cache.get(kanal).send(embed);
} else {
const entry = await channel.guild
  .fetchAuditLogs({ type: "CHANNEL_DELETE" })
  .then(audit => audit.entries.first());
if (entry.executor.id == client.user.id) return;
if (entry.executor.id == channel.guild.owner.id) return;
channel.guild.channels.create(channel.name, channel.type, [
  {
    id: channel.guild.id,
    position: channel.calculatedPosition
  }
]);

const embed = new Discord.MessageEmbed()
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  .setTitle(`Bir Kanal Silindi!`)
  .addField(`Kanalı Silen`, entry.executor.tag)
  .setColor("RANDOM")
  .addField(`Silinen Kanal`, channel.name)
  .addField(`Sonuç`, `Silinen Kanal Geri Açıldı!`);
client.channels.cache.get(kanal).send(embed);
}
});

client.on("channelCreate", async channel => {
let kontrol = await db.fetch(`dil_${channel.guild.id}`);
let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
if (!kanal) return;
if (kontrol == "agayokaga") {
const entry = await channel.guild
  .fetchAuditLogs({ type: "CHANNEL_CREATE" })
  .then(audit => audit.entries.first());
if (entry.executor.id == client.user.id) return;
if (entry.executor.id == channel.guild.owner.id) return;
channel.delete();
const embed = new Discord.MessageEmbed()
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  .setTitle(`Bir Kanal Açıldı!`)
  .setColor("RANDOM")
  .addField(`Açan`, entry.executor.tag)
  .addField(`Açılan Kanal`, channel.name)
  .addField(`Sonuç`, `Kanal Geri Silindi!`);
client.channels.cache.get(kanal).send(embed);
} else {
const entry = await channel.guild
  .fetchAuditLogs({ type: "CHANNEL_CREATE" })
  .then(audit => audit.entries.first());
if (entry.executor.id == client.user.id) return;
if (entry.executor.id == channel.guild.owner.id) return;
channel.delete();
const embed = new Discord.MessageEmbed()
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  .setTitle(`Bir Kanal Açıldı!`)
  .setColor("RANDOM")
  .addField(`Kanalı Açan`, entry.executor.tag)
  .addField(`Açılan Kanal`, channel.name)
  .addField(`Sonuç`, `Açılan Kanal Geri Silindi`);
client.channels.cache.get(kanal).send(embed);
}
});
// ROL KORUMA
client.on("roleDelete", async role => {
const entry = await role.guild
.fetchAuditLogs({ type: "ROLE_DELETE" })
.then(audit => audit.entries.first());
let rol = await db.fetch(`rolrol_${role.guild.id}`);
let kontrol = await db.fetch(`dil_${role.guild.id}`);
let kanal = await db.fetch(`rolk_${role.guild.id}`);
if (!kanal) return;
if (kontrol == "TR_tr") {
if (entry.executor.id == client.user.id) return;
if (entry.executor.id == role.guild.owner.id) return;
role.guild.roles
  .create({
    data: {
      name: role.name
    }
  })
  .then(r => r.setPosition(role.position));

const embed = new Discord.MessageEmbed()
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  .setTitle(`Bir Rol Silindi!`)
  .setColor("RANDOM")
  .addField(`Silen`, entry.executor.tag)
  .addField(`Silinen Rol`, role.name)
  .addField(`Sonuç`, `Rol Geri Açıldı!`);
client.channels.cache.get(kanal).send(embed);
} else {
if (entry.executor.id == client.user.id) return;
if (entry.executor.id == role.guild.owner.id) return;
role.guild.roles
  .create({
    data: {
      name: role.name
    }
  })
  .then(r => r.setPosition(role.position));

const embed = new Discord.MessageEmbed()
.setThumbnail(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`)
  .setTitle(`Bir Rol Silindi!`)
  .setColor("RANDOM")
  .addField(`Silen`, entry.executor.tag)
  .addField(`Silinen Rol`, role.name)
  .addField(`Sonuç`, `Silinen Rol Geri Açıldı!`);
client.channels.cache.get(kanal).send(embed);
}
});
// ROL VE KANAL KORUMA

// REKLAM KORUMA

const reklam = [
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    "net",
    ".rf",
    ".gd",
    ".az",
    ".party",
    ".gf",
".bot"
  ];
client.on("messageUpdate", async (old, nev) => {

if (old.content != nev.content) {
let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
if (i) {
  
  if (reklam.some(word => nev.content.includes(word))) {
  if (nev.member.hasPermission("BAN_MEMBERS")) return ;
   //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
const embed = new Discord.MessageEmbed()        .setColor("RANDOM").setDescription(`${nev.author} , **Mesajını Editleyerek Reklam Yapmaya Çalıştı!**`)
        .addField("Reklamı:",nev)
    
        nev.delete();
        const embeds = new Discord.MessageEmbed()        .setColor("RANDOM") .setDescription(`${nev.author} , **Mesajı Editleyerek Reklam Yapamana İzin Veremem!**`) 
      client.channels.cache.get(y).send(embed)
        nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
      
  }
} else {
}
if (!i) return;
}
});

client.on("message", async msg => {

 
if(msg.author.bot) return;
if(msg.channel.type === "dm") return;
     let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);

let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
      if (i) {
          if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
            try {
             if (!msg.member.hasPermission("MANAGE_GUILD")) {
             //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
 msg.delete({timeout:750});
                const embeds = new Discord.MessageEmbed()        .setColor("RANDOM") .setDescription(`<@${msg.author.id}>, Bu Sunucuda Reklam **FİLTRESİ** Açık!`)
  msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
            const embed = new Discord.MessageEmbed()        .setColor("RANDOM").setDescription(`${msg.author} , **Reklam Yapmaya Çalıştı!**`) .addField("Mesajı:",msg)
           client.channels.cache.get(y).send(embed)
              }              
            } catch(err) {
              console.log(err);
            }
          }
      }
     if(!i) return ;
});


// REKLAM KORUMA

// AFK
client.on('message', async message => {

let kullanıcı = message.mentions.users.first() || message.author
let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
let sebep = afkkullanıcı

if (message.author.bot) return;
if (message.content.includes(`afk`)) return;

if (message.content.includes(`<@${kullanıcı.id}>`)) {
if (afkdkullanıcı) {
  message.channel.send(`**${message.author.tag}** adlı kullanıcı artık AFK degil...`)
  db.delete(`afk_${message.author.id}`)
}
if (afkkullanıcı) return message.channel.send(new Discord.MessageEmbed()
                                              .setColor(`#fdcf5c`)
                                              .setDescription(`**${kullanıcı.tag}** şu anda AFK.\n Sebep : **${sebep}**`))
}

if (!message.content.includes(`<@${kullanıcı.id}>`)) {
if (afkdkullanıcı) {
  message.channel.send(`**${message.author.tag}** adlı kullanıcı artık AFK değil.`)
  db.delete(`afk_${message.author.id}`)
}
}
});
// AFK

//SAAS
client.on('message', async msg => {
    let mesajss = db.fetch(`SAASmesaj_${msg.guild.id}`)  || `${msg.author} Aleykümselam, **hoşgeldin!**`
  var mesajs = mesajss.replace('-sunucu-', `${msg.guild.name}`) .replace('-üye-',`${msg.author.tag}`) .replace('-üyeetiket-',`<@${msg.author.id}>`) .replace('-üyesayisi-',`${msg.guild.memberCount}`)
  
   let i = await  db.fetch(`SAAS_${msg.guild.id}`)
    if(i === 'açık') {
  if (msg.content.toLowerCase() === "sa") {
   msg.channel.send(mesajs);
     }
   }
   
    let s = await  db.fetch(`SAAS_${msg.guild.id}`)
    if(s === 'açık') {
    if (msg.content.toLowerCase() === "selam") {       
  msg.channel.send(mesajs);
   }
       }
   
      let o = await  db.fetch(`SAAS_${msg.guild.id}`)
         if(o === 'açık') {
    if (msg.content.toLowerCase() === "slm") {
  msg.channel.send(mesajs);
   }
           }
        let n = await  db.fetch(`SAAS_${msg.guild.id}`)
         if(n === 'açık') {
      if (msg.content.toLowerCase() === "sea") {
  msg.channel.send(mesajs);
   }
    }
   
          let t = await  db.fetch(`SAAS_${msg.guild.id}`)
                  if(t === 'açık') {
      if (msg.content.toLowerCase() === "selamınaleyküm") {
  msg.channel.send(mesajs);
   }
 }
     let b = await  db.fetch(`SAAS_${msg.guild.id}`)
                  if(b === 'açık') {
        if (msg.content.toLowerCase() === "selamın aleyküm") {
  msg.channel.send(mesajs);
          }
   }
 
 });
// SA AS