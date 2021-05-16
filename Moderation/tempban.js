const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = (client, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const reason = (args.splice(1).join(' ') || "Aucune Raison Spécifiée");
  let banTime = (args[1] || '600s');
  let moderator = message.author.username


  const error = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur d'Utilisateur**")
    .setColor("#870606")
    .setDescription(`**L'utilisateur mentionné existe pas !**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

  const error2 = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur de Mention**")
    .setColor("#870606")
    .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Utilisateur !**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

  user ? message.guild.member(user).ban(reason) : message.channel.send(error)
  if (!user) message.channel.send(error2)

  setTimeout(() => {
    message.guild.members.unban(user);
    message.channel.send(`**${user.user.username} a été déban**`)
  }, ms(banTime));

  const banembed = new MessageEmbed()
    .setTitle("Ban Log")
    .setColor("#B22222")
    .setDescription(`**Utilisateur Ban :** ${user.user.username} (${user.id})\n**Modérateur :** ${moderator}\n**Raison :** ${reason}\n**Temps :** ${bantime}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  // 825063634039341066 - 768200404521320468
  client.channels.cache.get('825063634039341066').send(banembed)
  if (!user.user.bot) user.user.send(`<:Warning:840521136701833226> **Vous été ban sur le serveur** ***${message.guild.name}*** **avec comme raison : __${reason}__**`)
  message.author.send(`**${user.user.username} a bien été ban du serveur**`)
};

module.exports.help = {
  name: "tempban",
  aliases: ['tempban'],
  category: 'moderation',
  description: "Permet de bannir un Utilisateur pour une certaine durée",
  cooldown: 3,
  usage: '<@Utilisateur> <Temps> [Raison]',
  isUserAdmin: true,
  permissions: true,
  permission: 'Niveau 3 (Modérateur/Administrateur)',
  permissionType: 'BAN_MEMBERS',
  args: true,
  profile: false
};