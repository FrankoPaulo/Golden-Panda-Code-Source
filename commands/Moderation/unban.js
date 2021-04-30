const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  const user = await client.users.fetch(args[0]);
  if (!user) return message.channel.send("<:Warning:766722345280208927> **L'utilisateur mentionné existe pas !**");
  message.guild.members.unban(user);
  let moderator = message.author.username

const error = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
  .setColor("#870606")
  .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Unban\`**\n\n**Niveau/Type de  Permission Requises :** Niveau 4 (Administrateur)\n**Permission Requise :** \`ADMINISTRATOR\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

const error3 = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Mention**")
  .setColor("#870606")
  .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Identifiant (ID) !**`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

 if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(error)
 if (!user) message.channel.send(error3)

  const banembed = new MessageEmbed()
    .setTitle(`Utilisateur Déban : ${user.username} (${user.id})`)
    .setAuthor("**Unban Log**")
    .setColor("#B22222")
    .setDescription(`**Modérateur :** ${moderator}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    client.channels.cache.get('ID DU SALON').send(banembed)
    user.user.send(`:gear: **Vous été unban sur le serveur** ***${message.guild.name}***`)
    message.author.send(`**${user.user.username} a bien été unban du serveur**`)
};

module.exports.help = {
  name: "unban",
  aliases: ['unban'],
  category: 'moderation',
  description: "Permet de Débannir un Utilisateur",
  cooldown: 3,
  usage: '<ID de L\'Utilisateur>',
  isUserAdmin: true,
  permissions: true,
  permission: 'Niveau 4 (Administrateur)',
  type: 'ADMINISTRATOR',
  args: true,
  profile: false
};