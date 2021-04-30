const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.channel.send(`<:Warning:766722345280208927> **Il faut spécifier un __nombre__ entre 1 et 100 ! ${message.author}**`)

  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  });

  const error = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
  .setColor("#870606")
  .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Purge\`**\n\n**Niveau/Type de Permission Requises :** Niveau 1 (Tout Staff)\n**Permission Requise :** \`VIEW_AUDIT_LOG\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())


  if (!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(error)

  message.delete();
  await message.channel.bulkDelete(messages);

  let moderator = message.author.username

  const purgeembed = new MessageEmbed()
    .setTitle("**Purge Log**")
    .setAuthor(`Utilisateur : ${moderator}`, message.author.avatarURL())
    .setColor("#B22222")
    .setDescription(`**Modérateur : ${moderator}**\n **Action :** \`Purge\`\n**Nombre de Message Purgé :** ${args[0]}\n**Salon Purgé :** ${message.channel}`)

    client.channels.cache.get('ID DU SALON').send(purgeembed)
};

module.exports.help = {
  name: "purge",
  aliases: ['purge', 'clear'],
  category: 'moderation',
  description: "Purge les Messages d'un Salon",
  cooldown: 3,
  usage: '<Nombre>',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 1 (Tout Staff)',
  type: 'VIEW_AUDIT_LOG',
  args: true,
  profile: false
};