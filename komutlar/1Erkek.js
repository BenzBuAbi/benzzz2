const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
  const db = require("quick.db")
var prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  if(message.author.bot || message.channel.type === "dm") return;

  if(!message.member.roles.get("731983741118840872") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok!!").then(m => m.delete(5000));

  var user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    var erkek = message.guild.roles.get("731983741114646607")
        var erkek2= message.guild.roles.get("731983741114646607")
      var kız = message.guild.roles.get("731983741118840872")
         var kız2 = message.guild.roles.get("731983741118840872")
        var kayıtsız = message.guild.roles.get("731983741114646602")
         

        
  if(!user) return message.reply ("Lütfen bir kullanıcı etiketleyiniz").then(m => m.delete(5000));
    let reason = args.slice(1).join(" ")
      if(!reason) return message.channel.send("Lütfen Bir İsim Yazınız.").then(m => m.delete(5000));
        if(!erkek) return message.channel.send ("Erkek Rolü Yok").then(m => m.delete(5000));
  
  if(!kız) return message.channel.send ("Kız Rolü Yok").then(m => m.delete(5000));
    if(!kayıtsız) return message.channel.send ("Kayıtsız Rolü Yok").then(m => m.delete(5000));
   
   let sChannel = message.guild.channels.get("733411501666336789")
      if (!yazı[message.author.id]) yazı[message.author.id] = {
        kisi:message.author.id,
     banlar:{
       sayı:0,
       bantarihi:0
     },
     kayıtlar:{
       sayı:0,
        erkek: 0,
        kız: 0,
        sahte:0,
        kayıteden:[],
        kayıtedilen:[]
     },
      cezalar:{
        sesmutesi:0,
        chatmute:0,
        karantina:0,
      },
      yetenekler:{
        beatboxer:0,
        vip:0,
        vokal:0,
        yazar:0,
        yazılım:0,
        youteber:0,
        ins:0,
        ressam:0,
        voceactor:0,
        dj:0,
        sevgilimvar:0,
        meltal:0,
      },
        isim:0,
      };
   
 if(user.roles.has(kayıtsız.id) && sChannel){
        setTimeout(function(){
   let embed = new Discord.RichEmbed()
    .setColor("#05022e")
    .setDescription(user.user+ " Aramıza Hoş Geldin , Senle Beraber **`"+ message.guild.memberCount +"`** Üyeye Ulaştık.")

 
     if(sChannel){
    sChannel.send(embed)
   }
        },1000)
 let KayıtEdilen = await yazı[message.author.id].kayıtlar.kayıtedilen//await db.fetch(`KayıtEdilen_${message.author.id}`)

   await yazı[message.author.id].kayıtlar.kayıteden.push(message.author.id)
   
  // db.push(`KayıtEden_${message.guild.id}`,message.author.id)
  
    db.add(`KayıtSayısı_${message.author.id}`,1)
   db.add(`ErkekSayısı_${message.author.id}`,1)
    if(KayıtEdilen[0]){

    if(KayıtEdilen.indexOf(user.id)!==-1){
   
      db.add(`SahteKayıt_${message.author.id}`,-1)
   
    }
      else {

    db.push(`KayıtEdilen_${message.author.id}`,user.id)
      
    db.set(`KayıtEden2_${user.id}`,message.author.id)
    }
    
    }  else {

    db.push(`KayıtEdilen_${message.author.id}`,user.id)
      
 //   db.set(`KayıtEden2_${user.id}`,message.author.id)
    }
    
  }
  
 if(user.user.username.includes("☆")){
      await user.setNickname("☆ " + reason);(e => console.log(e.message))
    }
    else if(!user.user.username.includes("☆")){
      await user.setNickname("★ " + reason);(e => console.log(e.message))
    }

    await (user.addRole(erkek.id));
   await (user.addRole(erkek2.id));
      await user.removeRole(kayıtsız.id).catch(e => console.log(e.message))
        await user.removeRole(kız.id).catch(e => console.log(e.message))
      await user.removeRole(kız2.id).catch(e => console.log(e.message))
 setTimeout(() => {
   let embed = new Discord.RichEmbed()
    .setColor(erkek.color)
   .setThumbnail(user.user.avatarURL)
   .setTitle('Kayıt Başarılı')
    .setDescription(`**Kayıt edilen kullanıcı : ${user}
Kayıt işleminde verilen rol : <@&${erkek.id}>
Yeni Kullanıcı Adı : \`${user.displayName}\`
**`)
   .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
  .setTimestamp()  
    message.channel.send(embed)
   },1000)

    
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'erkek',
  description: 'erkek rolü verir.',
  usage: 'a!man'
};
 