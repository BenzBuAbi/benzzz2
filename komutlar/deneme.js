const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const prefix = ayarlar.prefix;
const fs = require('fs');
let yazı = JSON.parse(fs.readFileSync("./database.json", "utf8"));
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel
      .send("Bu Komutu Kullanmaya Yetkin Yok :x:")
      .then(msg => msg.delete(9000));
  let onlineUsers1 = message.guild.members.filter(m =>(!m.displayName.includes("☆") ||
        m._roles.indexOf("634438732006817800") === -1) &&
      m.user.username.includes("☆") &&
      m._roles.indexOf("651163710705893386") === -1 &&
      m._roles.indexOf("634806986143301654") === -1 &&(m._roles.indexOf("651157245484072975")!==-1||m._roles.indexOf("651157722070515724")!== -1)
  )
   let onlineUsers11 = message.guild.members.filter(m =>(m.displayName.includes("☆") ||
        m._roles.indexOf("634438732006817800") !== -1) &&
      !m.user.username.includes("☆") &&!m.user.bot
       )

let liste = [];


  let kanal = message.guild.channels.get("635178221012385812");
  onlineUsers1.forEach(async function(muteli) {
        liste += `<@${muteli.id}> **,** `;
  
   muteli.addRole("634438732006817800");

  const takmaad = muteli.displayName;
  
  
      let değişeceksembol2 = takmaad.replace(/★/g, "☆");
  
     muteli.setNickname(değişeceksembol2);
  
});
  kanal.send(`**Tag ' a komut ile katılan üyeler: **${liste}`)
  let liste2 = [];
onlineUsers11.forEach(async function(muteli) {
   liste2 += `<@${muteli.id}> **,** `;
     muteli.removeRoles(["634438732006817800"]);

  const takmaad = muteli.displayName;
  
  
      let değişeceksembol2 = takmaad.replace(/☆/g, "★");
  
     muteli.setNickname(değişeceksembol2);
  
})
  kanal.send(`**Tagdan komut ile çıkarılan üyeler: **${liste2}`)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "tagver",
  description: "Komutlar hakkında bilgi verir.",
  usage: "&yardım"
};
