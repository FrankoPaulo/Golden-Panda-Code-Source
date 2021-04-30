const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first());
  if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.reply('**Il faut spécifier un __nombre__ entre 1 et 100 !**')

  const messages = (await message.channel.messages.fetch({
    limit: 100,
    before: message.id,
  })).filter(a => a.author.id === user.id).array();

  messages.length = Math.min(args[1], messages.length);

  const error = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
  .setColor("#870606")
  .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`¨Prune\`**\n\n**Niveau/Type de Permission Requises :** Niveau 1 (Tout Staff)\n**Permission Requise :** \`VIEW_AUDIT_LOG\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  const error3 = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Mention**")
  .setColor("#870606")
  .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Utilisateur !**`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  if (!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(error)
  if (!user) message.channel.send(error3)

  if (messages.length === 0) return message.channel.send(`<:Warning:766722345280208927> **Aucun Message est a supprimer sur cet utilisateur !**`);

  if (messages.length === 1) await messages[0].delete();
  else await message.channel.bulkDelete(messages);

  message.delete();

  let moderator = message.author.username

  const purgeembed = new MessageEmbed()
    .setTitle("**Prune Log**")
    .setAuthor(`Utilisateur : ${moderator}`, message.author.avatarURL())
    .setColor("#B22222")
    .setDescription(`**Modérateur : ${moderator}**\n **Action :** \`Prune\`\n**Nombre de Message Purgé :** ${args[1]}\n**Salon Purgé :** ${message.channel}\n**Utilisateur Purgé :** ${args[0]}`)

    client.channels.cache.get('ID DU SALON').send(purgeembed)
};

module.exports.help = {
  name: "prune",
  aliases: ['prune'],
  category: 'moderation',
  description: "Purge les Messages d'un Utilisateur dans un salon",
  cooldown: 3,
  usage: '<@Utilisateur> <Nombre>',
  isUserAdmin: true,
  permissions: true,
  permission: 'Niveau 1 (Tout Staff)',
  type: 'VIEW_AUDIT_LOG',
  args: true,
  profile: false
};