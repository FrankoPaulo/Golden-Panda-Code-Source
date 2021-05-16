const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
  let moderator = message.author.username

  const error = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur de Permission**")
    .setColor("#870606")
    .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Unmute\`**\n\n**Niveau/Type de Permission Requises :** Niveau 3 (Modérateur/Administrateur)\n**Permission Requise :** \`KICK_MEMBERS\``)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

  const error2 = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur de Mention**")
    .setColor("#870606")
    .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Utilisateur !**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

  if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(error)
  if (!user) message.channel.send(error2)

  if (!user.roles.cache.has(muterole.id)) return message.channel.send("<:Warning:840521136701833226> **Tu peux pas unmute un utilisateur non-mute !**")
  user.roles.remove(muterole.id);
  message.channel.send(`**${user.user.username} a été démute par ${moderator}**`)

  const Muteembed = new MessageEmbed()
    .setTitle("**Unmute Log**")
    .setColor("#B22222")
    .setDescription(`**Utilisateur Unmute :** ${user.user.username} (${user.id})\n**Modérateur :** ${moderator}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  // 825063634039341066 - 768200404521320468
  client.channels.cache.get('825063634039341066').send(Muteembed)
  if (!user.user.bot) user.user.send(`<:Warning:840521136701833226> **Vous été mute sur le serveur** ***${message.guild.name}***`)
  message.author.send(`**${user.user.username} a bien été mute sur le serveur **`)
};


module.exports.help = {
  name: "unmute",
  aliases: ['unmute'],
  category: 'moderation',
  description: "Permet de Démute un Utilisateur",
  cooldown: 3,
  usage: '<@Utilisateur>',
  isUserAdmin: true,
  permissions: true,
  permission: 'Niveau 3 (Modérateur/Administrateur)',
  permissionType: 'KICK_MEMBERS',
  args: true,
  profile: false
};