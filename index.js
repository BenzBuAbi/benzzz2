const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const db = require('quick.db');
const ms = require('parse-ms')
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://sann-cemre-onur.glitch.me/`);
}, 280000);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
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
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


////////////////////////

client.elevation = message => {
  if(!message.guild) {
    return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


///////////////////////////////////////TAG///////////////////////////////////////////////////////
client.on("message", async message =>  {
   if(message.author.bot || message.channel.type === "dm") return;
  if(message.content ===".tag"||message.content ==="tag"||message.content ==="!tag"){
    message.channel.send(`**マ**`)
  }
})
///////////////////////////////BOT SES/////////////////////////////////////
client.on("message", async message =>  {
   if(message.author.bot || message.channel.type === "dm") return;
         if (message.content === '.join' && message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
           if(!message.member.voiceChannel) return message.channel.send("Bir ses kanalında olman lazım!").then(m => m.delete(9000));
        channel.join()
            
                message.reply("Bot odaya giriş yaptı.").then(m => m.delete(9000));

      }
           if (message.content === '.join' && !message.member.hasPermission("ADMINISTRATOR")) {
     message.reply("Bu komutu sadece yöneticiler kullanabilir!").then(m => m.delete(9000));
             return
      }
      if (message.content === '.leave' && message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
        if(!message.member.voiceChannel) return message.channel.send("Bir ses kanalında olman lazım!").then(m => m.delete(9000));
        channel.leave()
        
                message.reply("Bot odadan çıkış yaptı.").then(m => m.delete(9000));

      }
             if (message.content === '.leave' && !message.member.hasPermission("ADMINISTRATOR")) {
     message.reply("Bu komutu sadece yöneticiler kullanabilir!").then(m => m.delete(9000));
             return
      }
  
  })
/////////////////////KULLANICI DÜZENLEME//////////////////////////////
client.on("userUpdate", function(oldUser, newUser){

  let kanal =client.channels.get('634438768551526427')
     if(oldUser.username !== newUser.username) {
       const  takmaad =  client.guilds.get("634437923500195853").members.get(newUser.id).displayName

          
        if(!newUser.username.includes("☆")&& client.guilds.get("634437923500195853").members.get(newUser.id).roles.has("634438732006817800")) {
           if(!client.guilds.get("634437923500195853").members.get(newUser.id).removeRole("634438732006817800")) return newUser.guild.owner.send("ototag rolü olmadığı için rol alınamadı")
             client.guilds.get("634437923500195853").members.get(newUser.id).removeRole("634438732006817800")

            let değişeceksembol1 = takmaad.replace(/☆/g, "マ");
              client.guilds.get("634437923500195853").members.get(newUser.id).setNickname(değişeceksembol1)   
               if(!kanal) return newUser.guild.owner.send("ototag bilgi kanalı olmadığı için rol alındı ama kanala yazı yazılamadı")
          
            let embed1 = new Discord.RichEmbed()
            .setColor("#000002")
            .setDescription(`**${newUser}, tagı çıkardığı için Bot tarafından <@&634438732006817800> rolü alındı!**`)
            .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
            .setTimestamp()
            kanal.send(embed1)
                
       
        } 
         if(newUser.username.includes("☆")&& !client.guilds.get("634437923500195853").members.get(newUser.id).roles.has("634438732006817800")) {

           if(client.guilds.get("634437923500195853").members.get(newUser.id).roles.has("651163710705893386")) return;
           
                      if(client.guilds.get("634437923500195853").members.get(newUser.id).roles.has("634806986143301654")) return;

             if(!client.guilds.get("634437923500195853").members.get(newUser.id).addRole("634438732006817800"))   return newUser.guild.owner.send("ototag rolü olmadığı için rol verilemedi")
              client.guilds.get("634437923500195853").members.get(newUser.id).addRole("634438732006817800")
                let değişeceksembol2 = takmaad.replace(/★/g, "☆");
                 client.guilds.get("634437923500195853").members.get(newUser.id).setNickname(değişeceksembol2)    
                   if(!kanal) return newUser.guild.owner.send("ototag bilgi kanalı olmadığı için rol verirdi ama kanala yazı yazılamadı")
           
            let embed1 = new Discord.RichEmbed()
            .setColor("#000002")
            .setDescription(`**${newUser}, tagı aldığı için Bot tarafından <@&634438732006817800> rolü verildi!**`)
                
              .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
             .setTimestamp()
            kanal.send(embed1) 
         }
        }
      })
///////////////////////////////////////////LİNK////////////////////////////////////////////////////////////
client.on("message",async message => {
 if(message.channel.type === "dm" || message.author.bot) return
   if(message.content === "!link"||message.content === ".link"||message.content === "link") {
     message.channel.send("https://discord.gg/")
   }
})
////////////////////////////////////////////AFK///////////////////////////////////////////////////////////////
client.on("message",async message => {
   if (message.author.bot || message.channel.type === "dm") return;
 
  //return message.channel.send(`**${user_tag}** Şu anda afk.\nNedeni:${key.reason}`)
  //return message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
    var afklar =await db.fetch(`afk_${message.author.id}, ${message.guild.id}`)
    
  if(afklar){
    
    db.delete(`afk_${message.author.id}, ${message.guild.id}`)
    db.delete(`afk-zaman_${message.author.id}, ${message.guild.id}`)
    
    message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
       try{
    let takma_ad = message.member.nickname.replace("[AFK]", "")
    message.member.setNickname(takma_ad).catch(err => console.log(err));
       }catch(err){   

 console.log(err.message)
  }
  }
  var kullanıcı = message.mentions.users.first()
  if(!kullanıcı) return
   let zaman =  await db.fetch(`afk-zaman_${kullanıcı.id}, ${message.guild.id}`)
  
   
    var süre = ms(Date.now() - zaman)
    
    
   var sebep = await db.fetch(`afk_${kullanıcı.id}, ${message.guild.id}`)
  if(await db.fetch(`afk_${message.mentions.users.first().id}, ${message.guild.id}`)){
  if(süre.days !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.days}** Gün **${süre.hours}** Saat **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
  
  if(süre.hours !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.hours}** Saat **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
  if(süre.minutes !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
   if(süre.seconds !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **Bir Kaç Saniye** Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
  }

})
client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
   var Attachment = (message.attachments)
  if (Attachment){
     if(Attachment.array()[0]!==undefined) return
       
     
  }
  
  let sChannel2 = message.guild.channels.get("634438762860118029")
    if(!sChannel2) return
  const embed = new Discord.RichEmbed()
  .setColor("#000000")
  .setAuthor(`Mesaj silindi.`, message.author.avatarURL)
  .addField("**Kullanıcı Tag**", message.author.tag, true)
  .addField("**Kanal Adı**", message.channel.name, true)
  .addField("**Silinen Mesaj**", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
    .setTimestamp()  
  //.setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel2.send(embed);
 
});
///////////////////////MESAJ DÜZENLEME LOG///////////////////////
client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.get("634438762860118029")
  if (oldMessage.content == newMessage.content) return;
  if(!sChannel3) return
  let embed = new Discord.RichEmbed()
  .setColor("#ffffff")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("**Kullanıcı**", newMessage.author)
  .addField("**Kanal Adı**", newMessage.channel.name)
  .addField("**Eski Mesaj**", "```" +oldMessage.content+"```" , true)
  .addField("**Yeni Mesaj**", "```" +newMessage.content+"```" , true)
  
  .setThumbnail(newMessage.author.avatarURL)
    .setTimestamp()  
    sChannel3.send(embed)
});
client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  

  let sChannel3 = message.guild.channels.get("651474571014438935")
    if(!sChannel3) return

 var Attachment = (message.attachments)
  if (Attachment){
   if(Attachment.array()[0]!==undefined){

       let embed = new Discord.RichEmbed()
  .setColor("#210481")
  .setAuthor(`Foto Log `, message.author.avatarURL)
  .addField("**Kullanıcı**", message.author.tag,true)
  .addField("**Kanal Adı**", message.channel.name,true)
  .setImage(Attachment.array()[0].proxyURL)

    .setTimestamp()  
   sChannel3.send(embed)
   }
  }
});
client.on("message", async message =>  {
   if(message.author.bot || message.channel.type === "dm") return;
  if(message.content.toLowerCase() ==="sa"||message.content.toLowerCase() ==="sea"||message.content.toLowerCase() ==="selamün aleyküm"||message.content.toLowerCase() ==="selamun aleykum"){
    message.reply("**Aleyküm Selam Dostum Hoşgeldin** <a:109:650870381779091466>")
  }
})
client.login(process.env.BOT_TOKEN);

//////////////////////////////KARANTİNA////////////////
client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("Birkaç Saniye Önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
   var rol = member.guild.roles.get("679400775226621952")
   var kayıtsız = member.guild.roles.get("679400764988194826")
   member.addRole(rol)
member.user.send('Hesabınız 7 Günden Önce Açıldığı İçin Otomatik Olarak Cezalıya Atıldınız, Yetkililere Bildirerek Açtırabilirsiniz Ayrıca Unutmayın Her Şey Siz Değerli Üyelerimizin Güvenliği İçin.')
setTimeout(() => {

        member.removeRole(kayıtsız.id);

}, 1000)


    
   }
        else {

        }  
    });
//////////////////////////FAKE GÜVENİLİR/////////////////////////////////////////////
client.login(ayarlar.token);

client.on("guildMemberAdd", (member, message, guild) => {
  if (member.guild.id !== "736933524795555841") return; 
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
   var tagdakiler = 0;
  let aylar = aylartoplam;
  let user = client.users.get(member.id);
  require("moment-duration-format");
  let eskiNick = member.user.username;
 const id = "736933525327970386"; 
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (gün < 7) kontrol = "Fake Hesap";
  if (gün > 7) kontrol = "Güvenilir Hesap";
    let count = 0;
   var embed = new Discord.RichEmbed()
    .setDescription(`Sunucumuza Hoşgeldin ${member}, Seninle Beraber **${member.guild.memberCount}** Kişiyiz. \nKaydının yapılması için **sesli odaya** gelip **ses** vermen gerek \nHesabın oluşturulma tarihi: ${moment( user.createdAt ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment( user.createdAt ).format("YYYY HH:mm:ss")} \nHesabınız: **${kontrol}** \n<@&roleid> seninle ilgilenecektir.`)
    .setFooter(`created by clasus`)
   member.guild.channels.get(id).send(embed) 
})
/////////////YASAKLI TAG///////////////////
client.on("guildMemberAdd", member => {

if(member.user.username.includes("☨","ァ")){
member.addRole("767786549009055794")
member.removeRole("769620074519855115")
member.removeRole("767786569285238816")
member.send("Sunucumuzun Yasaklı Tagında Bulundugundan Dolayı Cezalıya Atıldın")
}
})
///otorol
client.on('guildMemberAdd', member  => {
  let rol = "767786569285238816"
  client.channels.get("770358938910064640").send(`${member} Adlı Kullanıya Başarıyla Otorol Verıldı`)
  member.addRole(rol)
})
/////OTOİSİM
client.on('guildMemberAdd', member => {  
 member.setNickname('• İsim | Yaş')////YENI GELENLERE VERILCEK ISIM
})