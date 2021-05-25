//Idée Design par Paudb09, merci à lui !

const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message, args) => {
  moment.locale('fr');
  
  const embed = new MessageEmbed()
  .setColor('B4E0E0')
  .setTitle(`💠 Informations sur ${client.user.username}`)
  .setThumbnail(client.user.avatarURL())
  .setAuthor(`Commande invoqué par ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 128 }))
  .setDescription(`Golden Panda est un bot [open source](https://github.com/FrankoPaulo/Golden-Panda-Code-Source) développé par [FrankoPaulo](https://github.com/FrankoPaulo).
  Celui-ci est principalement conçu pour le serveur [Event Games](https://discord.gg/55bTTYunK3). Vous pouvez inviter le bot avec [ce lien](https://discord.com/api/oauth2/authorize?client_id=764180988082651138&permissions=8&scope=bot) pour pouvoir le tester de votre côté !
  
  🆔 \`Id\`  764180988082651138
  🕐 \`Compte Crée le\`  ${moment(message.client.user.createdTimestamp).format('LLL')} **(${moment(message.client.user.createdTimestamp).startOf('day').fromNow()})**

  `)



  .addField("> __**Statistiques du Bot**__", `
  🤖 \`Mémoire\`  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
  🕧 \`Uptime du Bot\`  ${Math.floor(client.uptime / 1000 / 60).toString()} minutes
  🗂️ \`Présent sur\`  ${client.guilds.cache.size.toString()} Serveur(s)
  🤖 \`Utilisateurs\`  ${client.guilds.cache.map(g => g.memberCount).reduce((a,b) => a + b)}
  🗃️ \`Salons Enregistré\`  \n${client.channels.cache.size.toString()} Salons enregistrés \n${client.channels.cache.filter(ch => ch.type === "text").size} Salons Textuel\n${client.channels.cache.filter(ch => ch.type === "voice").size} Salons Vocaux
  🆚 \`Version\`  BêtaDev 21.12 
  `, true)

  .addField("> __**Informations sur le Bot**__", `
  💻 \`Développeur\`  <@${'550251727698264064'}>
  🆚 \`Langage Utilisé\`  Discord.js \`(discord.js@12.3.1)\`
  🗃️ \`Nombre de Commandes\`  ${message.client.commands.size} commandes
  ☁️ \`Hébergeur\`  [NSO Hosting](https://nso-hosting.fr)
  `, true)

  .addField("> __**Code Source**__", `
  **License du Bot:** GPL 3.0 (General Public License)
  Le Code Source du Bot est disponible sur [GitHub](https://github.com/FrankoPaulo/Golden-Panda-Code-Source)
  Si vous souhaitez utiliser une partie du code dans vos projets, vous en avez l'autorisation à condition de me créditer quelque part !
  `)

  message.channel.send(embed)

};

module.exports.help = {
  name: "botinfo",
  aliases: ['botinfo', 'bi'],
  category: 'utilitaire',
  description: "Commande qui permet de visualiser les informations sur Golden Panda",
  cooldown: 5,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  permissionType: '',
  args: false,
  profile: false
};
