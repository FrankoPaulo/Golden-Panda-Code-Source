const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  let blacklistrole = message.guild.roles.cache.find(r => r.name === "Blacklisted");
  const reason = (args.splice(1).join(' ') || "Aucune Raison Spécifiée");
  let moderator = message.author.username;

  const error = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
  .setColor("#870606")
  .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Blacklist\`**\n\n**Niveau/Type de Permission Requises :** Niveau 3 (Modérateur/Administrateur)\n**Permission Requise :** \`BAN_MEMBERS\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())


  const error3 = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Mention**")
  .setColor("#870606")
  .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Utilisateur !**`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(error)
  if (!user) message.channel.send(error3)


  if (user.roles.cache.has(blacklistrole)) return;
  await user.roles.add(blacklistrole);
  message.channel.send(`**${user.user.username} a été blacklisté sur le serveur !**`)


  const Blackembed = new MessageEmbed()
  .setTitle(`Utilisateur Blacklisté : ${user.user.username} (${user.id})`)
  .setAuthor("Blacklist Log")
  .setColor("#B22222")
  .setDescription(`**Modérateur :** ${moderator}\n**Raison :** ${reason}`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL());

client.channels.cache.get('ID DU SALON').send(Blackembed)
user.user.send(`<:Warning:766722345280208927> **Vous avez été blacklisté sur le serveur** ***${message.guild.name}***\n**Si vous recevez la moindre plainte (warn, mute ,ect...) vous serrez automatiquement bannit !**`)
    message.author.send(`**${user.user.username} a bien été blacklisté sur le serveur **`)

};


module.exports.help = {
  name: "blacklist",
  aliases: ['blacklist'],
  category: 'moderation',
  description: "Met un Utilisateur sur la Blacklist !",
  cooldown: 3,
  usage: '<@Utilisateur> [Raison]',
  isUserAdmin: true,
  permissions: true,
  permission: 'Niveau 3 (Modérateur/Administrateur)',
  type: 'BAN_MEMBERS',
  args: true,
  profile: false
};