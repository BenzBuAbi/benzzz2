const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  if(!message.member.roles.get("402590424155553792") &&!message.member.roles.get("518456368538058783") &&!message.member.roles.get("") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!").then(m => m.delete(5000));

   var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]) || message.author);
 if(user._roles.indexOf("402590424155553792")===-1 && user._roles.indexOf("518456368538058783")===-1 && user._roles.indexOf("")===-1) return message.channel.send("**Etiketlenen Kullanıcının Bilgileri Bulunamadı!**").then(m => m.delete(10000));

  let SesMutesi = await db.fetch(`MuteSesSayısı_${user.id}`)
 
    let Mute = await db.fetch(`MuteSayısı_${user.id}`)
   
      let Karantina = await db.fetch(`KarantinaSayısı_${user.id}`)

          
  if(!SesMutesi) SesMutesi = 0
  
    if(!Mute) Mute = 0
  
      if(!Karantina) Karantina = 0
    //  if(!LeaveKayıt) LeaveKayıt = 0

                 
    let embed = new Discord.RichEmbed()
    .setColor('#00e6d3')
    .setAuthor('Riverdale Yetkili Bilgi', `${user.user.displayAvatarURL}`)
    .setDescription(`**Ses Mutesi : \`${SesMutesi}\`
Chat Mutesi : \`${Mute}\`
Karantina : \`${Karantina}\`**
`)
    .setFooter(`${message.author.tag
    .setTimestamp()}` , `${message.author.displayAvatarURL}`)
  message.channel.send(embed)
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'designer rolü verir.',
  usage: 'a!designer'
};
 
