const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let user = message.guild.member(message.mentions.users.first());
  let moderator = message.author.username

  if (isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return message.reply('**Il faut spécifier un __nombre__ entre 1 et 100 !**')

  const messages = (await message.channel.messages.fetch({
    limit: 100,
    before: message.id,
  })).filter(a => a.author.id === user.id).array();
  messages.length = Math.min(args[1], messages.length);


  const error = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur de Mention**")
    .setColor("#870606")
    .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Utilisateur !**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())
  if (!user) message.channel.send(error)

  if (messages.length === 0) return message.channel.send(`<:Warning:840521136701833226> **Aucun Message est à supprimer sur cet utilisateur !**`);
  if (messages.length === 1) await messages[0].delete();
  else await message.channel.bulkDelete(messages);

  message.delete();


  const purgeembed = new MessageEmbed()
    .setTitle("**Prune Log**")
    .setAuthor(`Utilisateur : ${moderator}`, message.author.avatarURL())
    .setColor("#B22222")
    .setDescription(`**Modérateur : ${moderator}**\n **Action :** \`Prune\`\n**Nombre de Message Purgé :** ${args[1]}\n**Salon Purgé :** ${message.channel}\n**Utilisateur Purgé :** ${args[0]}`)

  // 825063634039341066 - 768200404521320468
  client.channels.cache.get('825063634039341066').send(purgeembed)
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
  permissionType: 'VIEW_AUDIT_LOG',
  args: true,
  profile: false
};