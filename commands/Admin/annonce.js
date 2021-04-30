const { MessageEmbed } = require("discord.js")

module.exports.run = (client, message, args) => {
  const error = new MessageEmbed()
    .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
    .setColor("#870606")
    .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Annonce\`**\n\n**Niveau/Type de Permission Requises :** Niveau 4 (Administrateur)\n**Permission Requise :** \`ADMINISTRATOR\``)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(error)
    
    const annonce = args.splice(0).join(' ')
    const Annoncembed = new MessageEmbed()
    .setTitle("<:BotAnnounce:817323749656625162> Annonce Golden Panda")
    .setColor("#FBF004")
    .setDescription(`${annonce} `)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get('ID DU SALON').send(Annoncembed)
  message.delete()
    
};

module.exports.help = {
  name: "annonce",
  aliases: ['annonce'],
  category: 'admin',
  description: "Permet d'envoyer une annonce dans le salon dédié",
  cooldown: 3,
  usage: '<Annonce>',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 4 (Administrateur)',
  type: 'ADMINISTRATOR',
  args: true,
  profile: false
};