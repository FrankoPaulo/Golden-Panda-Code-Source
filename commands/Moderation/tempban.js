const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = (client, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const reason = (args.splice(1).join(' ') || "Aucune Raison Spécifiée");
  let banTime = (args[1] || '600s');
  let moderator = message.author.username

 const error = new MessageEmbed()
 .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
 .setColor("#870606")
 .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Tempban\`**\n\n**Niveau/Type de Permission Requises :** Niveau 3 (Modérateur/Administrateur)\n**Permission Requise :** \`BAN_MEMBERS\``)
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

 if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(error)
 user ? message.guild.member(user).ban(reason) : message.channel.send(error2)
 if (!user) message.channel.send(error3)

 setTimeout(() => {
  user.roles.remove(muterole.id);
  message.channel.send(`**${user.user.username} a été déban**`)
}, ms(banTime));

  const banembed = new MessageEmbed()
    .setTitle(`Utilisateur Ban : ${user.user.username} (${user.id})`)
    .setAuthor("**Ban Log**")
    .setColor("#B22222")
    .setDescription(`**Modérateur :** ${moderator}\n**Raison :** ${reason}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    client.channels.cache.get('ID DU SALON').send(banembed)
    user.user.send(`<:Warning:766722345280208927> **Vous été ban sur le serveur** ***${message.guild.name}*** **avec comme raison : __${reason}__**`)
    message.author.send(`**${author.user.username} a bien été ban du serveur**`)
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
  type: 'BAN_MEMBERS',
  args: true,
  profile: false
};