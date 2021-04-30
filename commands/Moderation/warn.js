const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, userInfo) => {

const user = message.guild.member(message.mentions.users.first());
const reason = (args.splice(1).join(' ') || "Aucune Raison Spécifiée");
let moderator = message.author.username
const warnLevel = userInfo.warnlevel + 1

const error = new MessageEmbed()
.setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
.setColor("#870606")
.setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Warn\`**\n\n**Niveau/Type de Permission Requises :** Niveau 1 (Tout Staff)\n**Permission Requise :** \`VIEW_AUDIT_LOG\``)
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

client.updateUserInfo(message.member, {
  "users.$.warnlevel": warnLevel,
});


message.channel.send(`**${user.user.username} à été warn par ${moderator} pour raison : ${reason}**\n**Il a Maintenant ${userInfo.warnlevel} warn(s)**`)

  const Warnembed = new MessageEmbed()
    .setTitle(`Utilisateur Warn : ${user.user.username} (${user.id})`)
    .setAuthor("Warn Log")
    .setColor("#B22222")
    .setDescription(`**Modérateur :** ${moderator}\n**Raison :** ${reason}\n **Nombre de Warn :** ${userInfo.warnlevel}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  client.channels.cache.get('ID DU SALON').send(Warnembed)
  user.user.send(`<:Warning:766722345280208927> **Vous été warn sur le serveur** ***${message.guild.name}*** **avec comme raison ${reason}**\n**Vous avez maintenant ${userInfo.warnlevel} warn(s)**`)
  message.author.send(`**${user.user.username} a bien été warn sur le serveur**`)

};

module.exports.help = {
  name: "warn",
  aliases: ['warn'],
  category: 'moderation',
  description: "Permet d'avertir un Utilisateur",
  cooldown: 3,
  usage: '<@Utilisateur> [Raison]',
  isUserAdmin: true,
  permissions: true,
  permission: 'Niveau 1 (Tout Staff)',
  type: 'VIEW_AUDIT_LOG',
  args: true,
  profile: false
};