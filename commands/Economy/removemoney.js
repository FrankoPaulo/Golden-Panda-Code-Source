const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, userInfo) => {
  const user = message.guild.member(message.mentions.users.first());
  const MoneyToRemove = parseInt(args[1]);
  const userToUpdate = await client.getUser(user);
  const newBalance = userToUpdate.money - MoneyToRemove;

  const error = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
  .setColor("#870606")
  .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Removemoney\`**\n\n**Niveau/Type de Permission Requises :**Niveau 2 (Modérateur/Animateur/Gestionnaire)\n**Permission Requise :** \`MANAGE_WEBHOOKS\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  if (!message.member.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(error)
  
  if (isNaN(MoneyToRemove)) return message.channel.send(`:warning: **Veuillez entrer un nombre Correct ${message.author} !**`);
  if (userInfo.money <= 0) return message.channel.send(`:warning: **${message.member} tu peux pas enlever des coins à une personne qui en as pas !**`);
  message.channel.send(`**Vous avez ajouté avec succès ${MoneyToRemove} Coins <:ServerMoney:830718232293146645> à ${user.user.username} !**`)
  client.updateUserInfo(user, {
    "users.$.money": newBalance
  });
  
};

module.exports.help = {
  name: "removemoney",
  aliases: ['removemoney'],
  category: 'economy',
  description: "Retire de la monnaie à un Utilisateur",
  cooldown: 4,
  usage: '<@Mention> <Nombre>',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 2 (Modérateur/Animateur/Gestionnaire)',
  type: 'MANAGE_WEBHOOKS',
  args: true,
  profile: false
};