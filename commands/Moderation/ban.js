const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const reason = (args.splice(1).join(' ') || "Aucune Raison Spécifiée");
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

  user ? message.guild.member(user).ban() : message.channel.send(error)
  if (!user) message.channel.send(error2)
  

  const banembed = new MessageEmbed()
    .setTitle("Ban Log")
    .setColor("#B22222")
    .setDescription(`**Utilisateur Ban :** ${user.user.username} (${user.id})\n**Modérateur :** ${moderator}\n**Raison :** ${reason}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    // 825063634039341066 - 768200404521320468
    client.channels.cache.get('825063634039341066').send(banembed)
    if (!user.user.bot) user.user.send(`<:Warning:840521136701833226> **Vous été ban sur le serveur** ***${message.guild.name}*** **avec comme raison : __${reason}__**`)
    message.author.send(`**${user.user.username} a bien été ban du serveur**`)
};

module.exports.help = {
  name: "ban",
  aliases: ['ban'],
  category: 'moderation',
  description: "Permet de bannir un Utilisateur",
  cooldown: 3,
  usage: '<@Utilisateur> [Raison]',
  isUserAdmin: true,
  permissions: true,
  permission: 'Niveau 3 (Modérateur/Administrateur)',
  permissionType: 'BAN_MEMBERS',
  args: true,
  profile: false
};