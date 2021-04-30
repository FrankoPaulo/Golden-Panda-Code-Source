const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const reason = (args.splice(1).join(' ') || "Aucune Raison Spécifiée");
  let moderator = message.author.username

  const error = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
  .setColor("#870606")
  .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Kick\`**\n\n**Niveau/Type de Permission Requises :** Niveau 3 (Modérateur/Administrateur)\n**Permission Requise :** \`KICK_MEMBERS\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  const error2 = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur d'Utilisateur**")
  .setColor("#870606")
  .setDescription(`**L'utilisateur mentionné existe pas !**`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  const error3 = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Mention**")
  .setColor("#870606")
  .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Utilisateur !**`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(error)
  user ? message.guild.member(user).kick(reason) : message.channel.send(error2)
  if (!user) message.channel.send(error3)

  const Kickembed = new MessageEmbed()
    .setTitle(`Utilisateur Kick : ${user.user.username} (${user.id})`)
    .setAuthor("**Kick Log**", user.avatarURL())
    .setColor("#B22222")
    .setDescription(`**Modérateur :** ${moderator}\n**Raison :** ${reason}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    client.channels.cache.get('ID DU SALON').send(Kickembed)
    
    user.user.send(`<:Warning:766722345280208927> **Vous été kick sur le serveur** ***${message.guild.name}*** **avec comme raison ${reason}**`)
    message.author.send(`**${user.user.username} a bien été kick du serveur**`)
};

module.exports.help = {
  name: "kick",
  aliases: ['kick'],
  category: 'moderation',
  description: "Kick un Utilisateur du Serveur",
  cooldown: 3,
  usage: '<@Utilisateur> [Raison]',
  isUserAdmin: true,
  permissions: true,
  permission: 'Niveau 3 (Modérateur/Administrateur)',
  type: 'KICK_MEMBERS',
  args: true,
  profile: false
};