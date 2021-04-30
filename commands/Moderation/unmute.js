const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
  let moderator = message.author.username

  const error = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
  .setColor("#870606")
  .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Unmute\`**\n\n**Niveau/Type de Permission Requises :** Niveau 3 (Modérateur/Administrateur)\n**Permission Requise :** \`KICK_MEMBERS\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  const error3 = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Mention**")
  .setColor("#870606")
  .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Utilisateur !**`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(error)
  if (!user) message.channel.send(error3)

  if (!user.roles.cache.has(muterole.id)) return message.channel.send("<:Warning:766722345280208927> **Tu peux pas unmute un utilisateur non-mute !**")
user.roles.remove(muterole.id);
  message.channel.send(`**${user.user.username} a été démute par ${moderator}**`)

  const Muteembed = new MessageEmbed()
  .setTitle("**Unmute Log**")
  .setAuthor(`Utilisateur Unmute : ${user.user.username} (${user.id})`)
  .setColor("#B22222")
  .setDescription(`**Modérateur :** ${moderator}`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL());

client.channels.cache.get('ID DU SALON').send(Muteembed)
user.user.send(`:gear: **Vous été démute sur le serveur** ***${message.guild.name}***`)
message.author.send(`**${user.user.username} a bien été démute du serveur**`)
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
  type: 'KICK_MEMBERS',
  args: true,
  profile: false
};