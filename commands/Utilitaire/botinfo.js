const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  
  const embed = new MessageEmbed()
  .setColor('B4E0E0')
  .setAuthor(`💠 ${client.user.username}'s Info`, client.user.avatarURL())
  .addFields(
    { name: '🤖 Mémoire', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, inline: true},
    { name: '🕧 Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} `, inline: true},
    { name: '\u200b', value: `\u200b`, inline: true},
    { name: '🗂️ Serveurs', value: `${client.guilds.cache.size.toString()}`, inline: true},
    { name: '🗃️ Salons Enregistré', value: `${client.channels.cache.size.toString()} salons` && `(${client.channels.cache.filter(ch => ch.type === "text").size} Salons Textuel et ${client.channels.cache.filter(ch => ch.type === "voice").size} Salons Vocaux)`, inline: true},
    { name: '🤖 Utilisateurs', value: `${client.guilds.cache.map(g => g.memberCount).reduce((a,b) => a + b)} Utilisateurs dans la BDD (Base de Donnée)`, inline: true},
    { name: '🆚 Version du Bot', value: `**Version :** BêtaDev 21.11\n**Version de Discord** \`discord.js@12.3.1\``, inline: true},
    { name: '📓 Code Source', value: `\`Non Diffusé\``, inline: true},

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
  type: '',
  args: false,
  profile: false
};