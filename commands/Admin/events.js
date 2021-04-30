const { MessageEmbed } = require("discord.js")

module.exports.run = (client, message, args) => {
  const error = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
  .setColor("#870606")
  .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Events\`**\n\n**Niveau/Type de Permission Requises :** Niveau 4 (Administrateur)\n**Permission Requise :** \`ADMINISTRATOR\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(error)
    
    const event = args.splice(0).join(' ')
    
    const Eventembed = new MessageEmbed()
    .setTitle("<a:Event:817323771495972945> Event Time !")
    .setColor("#FBF004")
    .setDescription(`${event} `)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get('ID DU SALON').send(Eventembed)
  client.channels.cache.get('ID DU SALON').send(`<a:BotPing:817323773497442334> **Mention :** <@&${'814457480758820904'}>`)
  message.delete()
    
};

module.exports.help = {
  name: "event",
  aliases: ['event'],
  category: 'admin',
  description: "Permet d'envoyer une annonce d'event dans le salon dédié",
  cooldown: 3,
  usage: '<Annonce>',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 4 (Administrateur)',
  type: 'ADMINISTRATOR',
  args: true,
  profile: false
};