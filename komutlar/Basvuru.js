const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")
var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {

  if(!message.member.roles.get("634438732006817800")) return message.reply("Başvuru Yapabilmek İçin İlk Önce <@&634438732006817800> Rolüne Sahip Olmalısın. <a:129:650870745848872971>\n`☆` Sembolünü Alarak Bu Role Sahip Olabilirsin.").then(m => m.delete(10000));

  if(message.channel.id !== "646685361661149194") return message.reply("**Başvuru Yapabilmek İçin <#646685361661149194> Kanalından Yazmalısın. <a:129:650870745848872971>**").then(m => m.delete(10000));
  
  var user1 = message.guild.members.get("248511019150868480")
  
  var user2 = message.guild.members.get("450725107086655488")
    
  var user3 = message.guild.members.get("473829263888351233")
  
    var user4 = message.guild.members.get("467024825618137089")
    
      var user5 = message.guild.members.get("217743076855250946")
      
            var user6 = message.guild.members.get("416604533754429441")
  
  user1.send(`${message.author}** ( ${message.author.tag} ) ( ${message.author.id} ) Yetkili Olmak İçin Başvuru Yaptı.**`)
  
  user2.send(`${message.author}** ( ${message.author.tag} ) ( ${message.author.id} ) Yetkili Olmak İçin Başvuru Yaptı.**`)
  
  user3.send(`${message.author}** ( ${message.author.tag} ) ( ${message.author.id} ) Yetkili Olmak İçin Başvuru Yaptı.**`)
  
   user4.send(`${message.author}** ( ${message.author.tag} ) ( ${message.author.id} ) Yetkili Olmak İçin Başvuru Yaptı.**`)
  
   user5.send(`${message.author}** ( ${message.author.tag} ) ( ${message.author.id} ) Yetkili Olmak İçin Başvuru Yaptı.**`)
  
   user6.send(`${message.author}** ( ${message.author.tag} ) ( ${message.author.id} ) Yetkili Olmak İçin Başvuru Yaptı.**`)
  
  message.react('634472545898332220')
  
  message.reply("**Başvurunuz Başarıyla İletilmiştir.**").then(m=>m.react('634472545898332220'))

 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Başvuru"],
  permLevel: 0
};

exports.help = {
  name: 'başvuru',
  description: 'designer rolü verir.',
  usage: 'a!designer'
};
 
