const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  
  const embed = new MessageEmbed()
  .setColor('B4E0E0')
  .setAuthor(`💠 ${client.user.username}'s Info`, client.user.avatarURL())
  .addFields(
    { name: '🤖 Mémoire', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: true},
    { name: '🕧 Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true},
    { name: '\u200b', value: `\u200b`, inline: true},
    { name: '🗂️ Serveurs', value: `${client.guilds.cache.size.toString()} Serveur(s) Enregistrés`, inline: true},
    { name: '🗃️ Salons Enregistré', value: `${client.channels.cache.size.toString()} Salons enregistrés \n${client.channels.cache.filter(ch => ch.type === "text").size} Salons Textuel\n${client.channels.cache.filter(ch => ch.type === "voice").size} Salons Vocaux`, inline: true},
    { name: '🤖 Utilisateurs', value: `${client.guilds.cache.map(g => g.memberCount).reduce((a,b) => a + b)} Utilisateurs Enregistrés`, inline: true},
    { name: '🆚 Version du Bot', value: `**Version :** BêtaDev 21.12\n**Version de Discord** \`discord.js@12.3.1\``, inline: true},
    { name: '📓 Code Source', value: `Le Code Source du Bot est disponible sur [GitHub](https://github.com/FrankoPaulo/Golden-Panda-Code-Source)\n**Licence :** GPL 3.0`, inline: true},
    { name: '\u200b', value: `\u200b`, inline: true}

  )

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