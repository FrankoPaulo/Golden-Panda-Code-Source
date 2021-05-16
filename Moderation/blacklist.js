const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const reason = (args.splice(1).join(' ') || "Aucune Raison Spécifiée");
  let blacklistrole = message.guild.roles.cache.find(r => r.name === "Blacklisted");
  let moderator = message.author.username;

  const error = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur de Mention**")
    .setColor("#870606")
    .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Utilisateur !**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

  if (!user) message.channel.send(error)

  if (user.roles.cache.has(blacklistrole)) return;
  await user.roles.add(blacklistrole);
  message.channel.send(`**${user.user.username} a été blacklisté sur le serveur !**`)


  const Blackembed = new MessageEmbed()
    .setTitle("Blacklist Log")
    .setColor("#B22222")
    .setDescription(`**Utilisateur Blacklisté :** ${user.user.username} (${user.id})\n**Modérateur :** ${moderator}\n**Raison :** ${reason}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  // 825063634039341066 - 768200404521320468
  client.channels.cache.get('768200404521320468').send(Blackembed)
  if (!user.user.bot) user.user.send(`<:Warning:840521136701833226> **Vous avez été blacklisté sur le serveur** ***${message.guild.name}***\n**Si vous recevez la moindre plainte (warn, mute ,ect...) vous serrez automatiquement bannit !**`)
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
  permissionType: 'BAN_MEMBERS',
  args: true,
  profile: false
};