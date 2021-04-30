const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, userInfo) => {
const user = message.guild.member(message.mentions.users.first());
const ECToAdd = parseInt(args[1]);
const addEventCoins = userInfo.eventcoins + ECToAdd

const error = new MessageEmbed()
.setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
.setColor("#870606")
.setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Addcoin\`**\n\n**Niveau/Type de Permission Requises :**Niveau 2 (Modérateur/Animateur/Gestionnaire)\n**Permission Requise :** \`MANAGE_WEBHOOKS\``)
.setTimestamp()
.setFooter(message.author.username, message.author.avatarURL())

if (!message.member.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send(error)

if (isNaN(ECToAdd)) return message.channel.send(`:warning: **Veuillez entrer un nombre Correct ${message.author} !**`); x
if (userInfo.money < 0) return message.channel.send(`:warning: **${message.member} tu peux pas ajouter des eventcoins avec une valeur négative !**`);
message.channel.send(`**Vous avez ajouté avec succès ${ECToAdd} Event Coins <:EventCoin:766726888915075142> à ${user.user.username} !**`)
client.updateUserInfo(user, {
  "users.$.eventcoins": addEventCoins
});

};

module.exports.help = {
  name: "addcoin",
  aliases: ['addcoin'],
  category: 'events',
  description: "Permet d'ajouter des EventCoins à un Utilisateur",
  cooldown: 4,
  usage: '<@Mention> <Nombre>',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 2 (Modérateur/Animateur/Gestionnaire)',
  type: 'MANAGE_WEBHOOKS',
  args: true,
  profile: false
};