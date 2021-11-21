const { ShardingManager } = require('discord.js'); // Gerektiği Zaman Kullanınız!
// Gerektiği Zaman Kullanınız!
const bumbe = new ShardingManager('./bot.js', { // Gerektiği Zaman Kullanınız!
	totalShards: 1, // Auto yazılabilir veya farklı bir sayı yazabilirsiniz.
    token: "TOKEN" // Tokeninizi giriniz
}); // Gerektiği Zaman Kullanınız!
bumbe.spawn(); // Gerektiği Zaman Kullanınız!
// Gerektiği Zaman Kullanınız!
bumbe.on('shardCreate', shard => { // Gerektiği Zaman Kullanınız!
    console.log(`${shard.id} İDli shard başlatıldı!`); // Gerektiği Zaman Kullanınız!
}); // Gerektiği Zaman Kullanınız!