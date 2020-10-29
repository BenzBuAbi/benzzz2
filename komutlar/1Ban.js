const Discord = require('discord.js')
const db = require("quick.db")
const ms = require('parse-ms');
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (bot , message, args) => {

  if(!message.member.roles.get("634438724406476801") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Bu Komutu Kullanmaya Yetkin Yok ❌").then(msg => msg.delete(9000))
    
  let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
   
  let sebep = args.slice(1).join(' ');
   
  let sChannel = message.guild.channels.get("634438752910966795")
   
  if(!kullanıcı) return message.reply("Lütfen Banlanacak Bir Kullanıcı Etiketleyiniz.").then(msg => msg.delete(9000))
   
  if(kullanıcı.hasPermission("ADMINISTRATOR")) return message.reply("Yöneticileri Banlayamazsın!").then(msg => msg.delete(9000))
    
  if(message.author.id === kullanıcı.user.id) return message.reply("Kendini Banlayamazsın!").then(msg => msg.delete(9000))
   
  if(!sebep) return message.reply("Lütfen Neden Banladığınızı Belirtiniz.").then(msg => msg.delete(9000))
   
   if (!yazı[message.author.id]) yazı[message.author.id] = {
        kisi:message.author.id,
     banlar:{
       sayı:0,
       bantarihi:0
     },
     kayıtlar:{
        erkek: 0,
        kız: 0,
        sahte:0,
     },
      muteler:{
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
     cezalar:{
        esmutesi:0,
        chatmute:0,
        karantina:0,
      },
        isim:0,
      };
  
   await yazı[message.author.id].banlar.sayı++;
     
  
  //db.add(`BanSayısı_${message.author.id}`,1)        
   
 // let sayı = await db.fetch(`BanSayısı_${message.author.id}`)
   
 
  
  let sayı = await yazı[message.author.id].banlar.sayı

   let banlimiti = 3

let banaralıgı = 600000

  var tarih = Date.now() 

  if(sayı === 1){
  yazı[message.author.id].banlar.bantarihi=tarih;
  // db.set(`Banmatarihi_${message.author.id}`,tarih)   
    
  }
  let userInfo = yazı[message.author.id]
   
  let ilkbantarihi =  await yazı[message.author.id].banlar.bantarihi
   
if(sayı>banlimiti && tarih-ilkbantarihi <=banaralıgı) {

var süre = ms((ilkbantarihi+banaralıgı)-tarih)

 if(süre.minutes !== 0){
   
     message.channel.send("Ban Atabilemek İçin **"+süre.minutes+" Dakika** Beklemelisin.").then(m => m.delete(5000));
     
   fs.writeFile("./database.json", JSON.stringify(yazı), (x) => {
        if (x) console.error(x)
      });
   
   return
   }
   if(süre.seconds !== 0){
     message.channel.send("Ban Atabilemek İçin **"+süre.seconds+" Saniye** Beklemelisin.").then(m => m.delete(5000));
        fs.writeFile("./database.json", JSON.stringify(yazı), (x) => {
        if (x) console.error(x)
      });
     return
   }
     fs.writeFile("./database.json", JSON.stringify(yazı), (x) => {
        if (x) console.error(x)
      });
  return
}
  
  if(tarih-ilkbantarihi >=banaralıgı){
  
     yazı[message.author.id].banlar.sayı=0
   // db.set(`BanSayısı_${message.author.id}`,0)
      yazı[message.author.id].banlar.bantarihi=0
   // db.set(`Banmatarihi_${message.author.id}`,0) 
    
      let embed1 = new Discord.RichEmbed()
      .setColor('#f73737')
      .setDescription(kullanıcı.user+" Kullanıcısı "+message.guild.name+" Sunucusundan **"+sebep+"** Sebebiyle Yasaklandınız.")
   
      kullanıcı.send(embed1)

     let embed3 = new Discord.RichEmbed()
  .addField(`**Ban Bilgi**`, `**Banlayan : ** ${message.author}  (${message.author.id}) \n **Banlanan:** ${kullanıcı.user.tag}  (${kullanıcı.id})\n **Sebep :** ${sebep} `)
  .setImage('https://cdn.discordapp.com/attachments/635254940251717633/652534501355814913/ImmenseLeftLcont-size_restricted.gif')
         .setFooter(`**Adalet Mülkün Temelidir.**`)
        setTimeout(() => {
      message.guild.member(kullanıcı).ban(`${message.author.tag} | ${sebep}`).catch(err => message.reply("Banlama Yetkim Yok.").then(m => m.delete(5000)))  
        },500)
          message.react('✅')
      

    message.channel.send(embed3).then(m => m.delete(15000));
     yazı[message.author.id].banlar.sayı++
   //   db.add(`BanSayısı_${message.author.id}`,1)        
//db.set(`Banmatarihi_${message.author.id}`,tarih)   
     yazı[message.author.id].banlar.bantarihi=tarih
    let embed = new Discord.RichEmbed()
    .setColor('#f73737')
    .setDescription(kullanıcı.user+ " Kullanıcısı **"+sebep+"** Sebebiyle Yasaklanmıştır.")
    .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
    .setTimestamp()  
     if(!sChannel || sChannel === null) return
    sChannel.send(embed)
    fs.writeFile("./database.json", JSON.stringify(yazı), (x) => {
        if (x) console.error(x)
      });
    return
 }
  
   let embed1 = new Discord.RichEmbed()
   .setColor('RANDOM')
  .setDescription(kullanıcı.user+" Kullanıcısı "+message.guild.name+" Sunucusundan **"+sebep+"** Sebebiyle Yasaklandınız.")
   kullanıcı.send(embed1)
  

   setTimeout(() => {
  message.guild.member(kullanıcı).ban(`${message.author.tag} | ${sebep}`).catch(err => message.reply("Banlama Yetkim Yok.").then(m => m.delete(5000)))  
   },500)
     message.react('✅')
     let embed3 = new Discord.RichEmbed()
  .addField(`**Ban Bilgi**`, `**Banlayan : ** ${message.author}  (${message.author.id}) \n **Banlanan:** ${kullanıcı.user.tag} (${kullanıcı.id})\n **Sebep :** ${sebep} `)
  .setImage('https://cdn.discordapp.com/attachments/635254940251717633/652534501355814913/ImmenseLeftLcont-size_restricted.gif')

    message.channel.send(embed3).then(m => m.delete(15000));        
  
   let embed = new Discord.RichEmbed()
   .setColor('#f73737')
   .setDescription(kullanıcı.user+ " Kullanıcısı **"+sebep+"** Sebebiyle Yasaklanmıştır.")
   .setFooter(`${message.author.tag}` , `${message.author.displayAvatarURL}`)
   .setTimestamp()  
   if(!sChannel || sChannel === null) return
  sChannel.send(embed)
     fs.writeFile("./database.json", JSON.stringify(yazı), (x) => {
        if (x) console.error(x)
      });

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Kullanıcıyı sunucudan yasaklar.',
  usage: '&ban'
};