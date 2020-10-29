  const Discord = require('discord.js');
const db = require("quick.db")
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  if(!message.member.roles.get("738309805063798845") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!!").then(m => m.delete(5000));

  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))

  if (!member) return message.channel.send('**Bir Kullanıcı Belirtmelisin!**').then(m =>m.delete(5000))

  if(!member.voiceChannel) return message.channel.send("**Belirtilen kullanıcı bir ses kanalında değil**").then(m =>m.delete(5000))
  
const voiceChannel =  message.mentions.channels.first() || message.guild.channels.get(args[1])

   if(!voiceChannel) return message.channel.send("**Bir Ses Kanalı Belirtmelisin!**").then(m => m.delete(5000));
  
  if(voiceChannel.type!=="voice") return message.channel.send("**Belirttiğin Kanal Bir Ses Kanalı Değil!**").then(m => m.delete(5000));
  var kullanıcıkanalı = member.voiceChannel.name
console.log(message.guild.channels.get("653620955695939605"))
  member.setVoiceChannel(voiceChannel);
   const voiceChannel1 = voiceChannel.name;

  let embed= new Discord.RichEmbed()
    .setColor("#000000")
    .setDescription(message.author+" **Tarafından** "+member+" **Kullanıcısı**\n\n`"+kullanıcıkanalı+"`** Sesli Kanalından **`"+voiceChannel1+"`** Sesli Kanalına Çekildi**")
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
   .setTimestamp()  
    message.channel.send(embed)
 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
}
exports.help = {
  name: 'taşı2',
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: 'kayıt isim yaş'
}

