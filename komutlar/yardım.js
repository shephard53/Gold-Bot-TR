const Discord = require("discord.js");
const config = require("../config.json");
const db = require('quick.db');

exports.run = async (client, message, args) => {
    let prefix = await db.fetch(`prefix_${message.guild.id}`) || config.prefix
    if(args[0]) return message.channel.send(new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`BOTADI - Yardım`, client.user.avatarURL({format:"png",size:2048,dynamic:true}))
    .setThumbnail(client.user.avatarURL({format:"png",size:2048,dynamic:true}))
    .setDescription(`**BOTADI** Rolünü En Yukarıya Çekiniz Yoksa \`Otorol\`, \`Sayaç\`, \`Giriş Çıkış\` Sistemleri Çalışmaz`)
    .addField("[1]EĞLENCE", `${prefix}yardım eğlence`, true)
    .addField("[2]GENEL", `${prefix}yardım genel`, true)
    .addField("[3]YAPILANDIRMA", `${prefix}yardım yapılandır`, true)
    .addField("[4]YETKİLİ", `${prefix}yardım yetkili`, true)
    .addField("[5]KORUMA", `${prefix}yardım koruma`, true)
    .addField("[6]OYUN", `${prefix}yardım oyun`, true)
    .setImage('') // Resim Linki Koyunuz!
    .setFooter(`BOTADI Yardım Menüsü Ufqzyn#0147 Tarafından Kodlanmıştır`, client.user.avatarURL({format:"png",size:2048,dynamic:true})))
    if(args[0] === "eğlence"){ return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`BOTADI - Eğlence`, client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setThumbnail(client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setDescription(
            `**${prefix}öp** = Mua Mua.
**${prefix}kral-ol** = Kral Oldun qw.
**${prefix}şekerye** = Şeker ye al.
**${prefix}ara155** = Polisi Ararsın (GERÇEK DEĞİLDİR).
**${prefix}ara112** = Ambulansı Ararsın (GERÇEK DEĞİLDİR).
**${prefix}ara110** = İtfaiyeyi Ararsın (GERÇEK DEĞİLDİR).
**${prefix}espri** = Sen Espri Yapma.
**${prefix}kaç-cm** = ಠ⌣ಠ.
**${prefix}efkarım** = Efkarım.
**${prefix}hesapla** = Sayısal Mantıkçı.
**${prefix}rbw** = Robert b Weide.`
            )
        .setImage('') // Resim Linki Koyunuz!
        .setFooter(`BOTADI Yardım Menüsü Ufqzyn#0147 Tarafından Kodlanmıştır`, client.user.avatarURL({format:"png",size:2048,dynamic:true})))
    }
    if(args[0] === "genel"){ return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`BOTADI - Genel`, client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setThumbnail(client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setDescription(
            `**${prefix}afk** = AFK Olursun.
**${prefix}atatürk** = Atamız İzindeyiz.
**${prefix}kullanıcı-bilgi** = Belirtilen Kullanıcının Bilgilerini Gösterir.
**${prefix}sunucu-bilgi** = Sunucunun Bilgilerini Gösterir.
**${prefix}sunucu** = Sunucu İcon Ve Banner Resimlerini Gösterir.
**${prefix}listele** = Sunucudaki Emojileri Listeler.
**${prefix}avatar** = Kullanıcının Avatarını Gösterir.`
            )
        .setImage('') // Resim Linki Koyunuz!
        .setFooter(`BOTADI Yardım Menüsü Ufqzyn#0147 Tarafından Kodlanmıştır`, client.user.avatarURL({format:"png",size:2048,dynamic:true})))
    }
    if(args[0] === "yapılandır"){ return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`BOTADI - Yapılandırma`, client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setThumbnail(client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setDescription(
            `**${prefix}resimli-grşçkş-ayarla** = Resimli Giriş Çıkış Ayarlarsın.
**${prefix}resimli-grşçkş-sıfırla** = Resimli Giriş Çıkış Sıfırlarsın.
**${prefix}otorol-ayarla** = Otomatik Rol Sistemi Ayarlarsın.
**${prefix}otorol-sıfırla** = Otomatik Rol Sistemi Sıfırlarsın.
**${prefix}otorol-mesaj** = Otomatik Rol Sistemi Giriş Mesajı Ayarlarsın.
**${prefix}sayaç ayarla** = Sayaç Sistemi Ayarlarsın.
**${prefix}sayaç sıfırla** = Sayaç Sistemi Sıfırlarsın.
**${prefix}sa-as** = SA AS Sistemi Açarsın.
**${prefix}sa-as-mesaj** = SA AS Sistemi Mesajı Ayarlarsın.`
            )
        .setImage('') // Resim Linki Koyunuz!
        .setFooter(`BOTADI Yardım Menüsü Ufqzyn#0147 Tarafından Kodlanmıştır`, client.user.avatarURL({format:"png",size:2048,dynamic:true})))
    }
    if(args[0] === "yetkili"){ return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`BOTADI - Yetkili`, client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setThumbnail(client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setDescription(
            `**${prefix}ban** = Belirtilen Kullanıcıyı Sunucudan Yasaklar.
**${prefix}ban-koruma** = Ban Koruma Sistemi Ayarlar.
**${prefix}ban-koruma-sıfırla** = Ban Koruma Sistemi Sıfırlar.
**${prefix}mute** = Belirtilen Kullanıcıyı Sunucuda Susturur.
**${prefix}mute-yetkili-rol** = Kullanıcıyı Susturabilecek Yetkili Rolü.
**${prefix}mute-rol** = Susturulan Kişinin Rolü.
**${prefix}kick** = Belirtilen Kullanıcıyı Sunucudan Atar.
**${prefix}mod-log** = Log Sistemi Açarsın.
**${prefix}kurulum** = Flitre Sistemlerini Tamamiyle Kurar.
**${prefix}ayarlar** = Sunucudaki Sistemlerin Açık/Kapalı Olduğunu Gösterir.
**${prefix}ayrıl** = Botu Sunucudan Atar (SAKINCALI BİR KOMUTTUR).`
            )
        .setImage('') // Resim Linki Koyunuz!
        .setFooter(`BOTADI Yardım Menüsü Ufqzyn#0147 Tarafından Kodlanmıştır`, client.user.avatarURL({format:"png",size:2048,dynamic:true})))
    }
    if(args[0] === "koruma"){ return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`BOTADI - Koruma`, client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setThumbnail(client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setDescription(
            `**${prefix}kanal-koruma** = Kanal Koruma Sistemini Ayarlar.
**${prefix}kanal-koruma-sıfırla** = Kanal Koruma Sistemini Sıfırlar.
**${prefix}rol-koruma** = Rol Koruma Sistemini Ayarlar.
**${prefix}rol-koruma-sıfırla** = Rol Koruma Sistemini Sıfırlar.
**${prefix}küfür-engel** = Küfür Filtresini Açar.
**${prefix}link-engel** = Link Filtresini Açar.
**${prefix}napim-engel** = Napim Filtresini Açar.`
            )
        .setImage('') // Resim Linki Koyunuz!
        .setFooter(`BOTADI Yardım Menüsü Ufqzyn#0147 Tarafından Kodlanmıştır`, client.user.avatarURL({format:"png",size:2048,dynamic:true})))
    }
    if(args[0] === "oyun"){ return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`BOTADI - Oyun`, client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setThumbnail(client.user.avatarURL({format:"png",size:2048,dynamic:true}))
        .setDescription(
            `**${prefix}adamasmaca** = Adam Asmaca oyunu.
**${prefix}doğruluk-cesaret** = Dogruluk Cesaretlilik.
**${prefix}emoji-yakalamaca** = Emoji Yakalama Oyunu.
**${prefix}uzay-savaşı** = StarWars Filmi Çekiyoruz :).
**${prefix}xox** = XoX Oyunu.
**${prefix}yaz-kazan** = İlk Yazan Kazanır Dostum.`
            )
        .setImage('') // Resim Linki Koyunuz!
        .setFooter(`BOTADI Yardım Menüsü Ufqzyn#0147 Tarafından Kodlanmıştır`, client.user.avatarURL({format:"png",size:2048,dynamic:true})))
    }
};

exports.conf = {
    aliases: ["yardım", "help"],
    permLevel: 0
};
exports.help = {
    name: "yardım"
};
