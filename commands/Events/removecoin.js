const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, userInfo) => {
const user = message.guild.member(message.mentions.users.first());
const ECToRemove = parseInt(args[1]);
const removeEventCoins = userInfo.eventcoins - ECToRemove

const error = new MessageEmbed()
.setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
.setColor("#870606")
.setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Removecoin\`**\n\n**Niveau/Type de Permission Requises :**Niveau 2 (Modérateur/Animateur/Gestionnaire)\n**Permission Requise :** \`MANAGE_WEBHOOKS\``)
.setTimestamp()
.setFooter(message.author.username, message.author.avatarURL())

if (!message.member.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(error)

if (isNaN(ECToRemove)) return message.channel.send(`:warning: **Veuillez entrer un nombre Correct ${message.author} !**`);
if (userInfo.eventcoins <= 0) return message.channel.send(`:warning: **${message.member} tu peux pas enlever des eventcoins à une personne qui en as pas !**`);
message.channel.send(`**Vous avez retiré avec succès ${ECToRemove} Event Coins <:EventCoin:766726888915075142> à ${user.user.username} !**`)
client.updateUserInfo(user, {
  "users.$.eventcoins": removeEventCoins
});

};

module.exports.help = {
  name: "removecoin",
  aliases: ['removecoin'],
  category: 'events',
  description: "Permet de Retirer des EventCoins à un Utilisateur",
  cooldown: 4,
  usage: '',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 2 (Modérateur/Animateur/Gestionnaire)',
  type: 'MANAGE_WEBHOOKS',
  args: true,
  profile: false
};