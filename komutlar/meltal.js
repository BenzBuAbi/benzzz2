const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")
var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  if(message.author.bot || message.channel.type === "dm") return;
  if(!message.member.roles.get("635102585241731077") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!!").then(m => m.delete(5000));

  
  var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  var instrumental  = message.guild.roles.get("635070130962825227")
  
if(!user) return message.reply ("Lütfen bir kullanıcı etiketleyiniz").then(m => m.delete(5000));

  
        if(!instrumental) return message.channel.send ("instrumental Rolü Yok").then(m => m.delete(5000));


  if(!user.roles.has(instrumental.id)){
  
    await (user.addRole(instrumental.id))
    
  
   message.react('✅')
    let embed = new Discord.RichEmbed()
    .setColor(instrumental.color)
    .setDescription(`${user.user} Kullanıcısına <@&${instrumental.id}> Rolü Verildi.`)
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    message.channel.send(embed).then(message =>message.delete(10000))



  }
  else {
    
    await (user.removeRole(instrumental.id));
    
 

    
    message.react('✅')
     let embed0= new Discord.RichEmbed()
    .setColor(instrumental.color)
    .setDescription(`${user.user} Kullanıcısına <@&${instrumental.id}> Rolü Verildi.`)
   .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    message.channel.send(embed0).then(message =>message.delete(10000))

    
  }
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'instrumental',
  description: 'designer rolü verir.',
  usage: 'a!designer'
};
 