const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  const user = await client.users.fetch(args[0]);
  if (!user) return message.channel.send("<:Warning:840521136701833226> **L'utilisateur ne se trouve pas dans la liste des bannis**");
  message.guild.members.unban(user);
  let moderator = message.author.username


const error3 = new MessageEmbed()
  .setTitle("<:Warning:840521136701833226> **Erreur de Mention**")
  .setColor("#870606")
  .setDescription(`**Syntaxe Incorrecte ! Vous devez mettre un Identifiant (ID) !**`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

 if (!user) message.channel.send(error3)

  const banembed = new MessageEmbed()
    .setTitle("Unban Log")
    .setColor("#B22222")
    .setDescription(`**Utilisateur Déban :** ${user.username} (${user.id})\n**Modérateur :** ${moderator}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    // 825063634039341066 - 768200404521320468
    client.channels.cache.get('825063634039341066').send(banembed)
    message.author.send(`**${user.username} a bien été unban du serveur**`)
};

module.exports.help = {
  name: "unban",
  aliases: ['unban'],
  category: 'moderation',
  description: "Permet de Débannir un Utilisateur",
  cooldown: 3,
  usage: '<ID de L\'Utilisateur>',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 4 (Administrateur)',
  permissionType: 'ADMINISTRATOR',
  args: true,
  profile: false
};