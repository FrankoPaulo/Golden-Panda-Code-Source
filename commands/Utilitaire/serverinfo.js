const { MessageEmbed} = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message, args) => {

  //TODO: Ajouter ou Changer des Données de Serveur (+ Redesign ?)

  const guild = message.guild;
  const embed = new MessageEmbed()
    .setTitle(`**Informations sur ${guild.name}**`)
    .setAuthor(`Commande invoqué par ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 128 }))
    .setColor('B4E0E0')
    .setThumbnail(guild.iconURL())
    .addFields(
      {name: "✨ **Nom**", value: `${guild.name}`, inline: true},
      {name: "🆔 **ID Du Serveur**", value: `${guild.id}`, inline: true},
      {name: "👑 **Propriétaire**", value: `${message.guild.owner ? message.guild.owner.user.tag : "Non Trouvé"} (${guild.ownerID})`, inline: true},
      {name: "🕛 **Serveur Crée le**", value: `${moment(guild.createdAt).format('LLL')} \`(${moment(guild.createdAt).startOf('day').fromNow()})\`}`, inline: true},
      {name: "🌍 **Région**", value: `${message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1)}`, inline: true},
      {name: "🚻 **Membres**", value: `${guild.memberCount} Membres`, inline: true},
      {name: "🎭 **Rôles**", value: `${guild.roles.cache.size} rôles`, inline: true},
      {name: "📰 **Salons**", value: `🖊️ ${guild.channels.cache.filter(ch => ch.type === "text").size} Salons Textuel\n🎤 ${guild.channels.cache.filter(ch => ch.type === "voice").size} Salons Vocaux`, inline: true},
      {name: '\u200b', value: `\u200b`, inline: true},
      {name: "🌠 **Boost Level**", value: `Niveau ${guild.premiumTier}`, inline: true},
      {name: "🌟 **Boost**", value: `${guild.premiumSubscriptionCount} Boost`, inline: true},
      {name: "🌀 **Partenaire**", value: `${guild.partnered ?  'Oui' : 'Non'}`, inline: true}
  

    );


  message.channel.send(embed)
};

module.exports.help = {
  name: "serverinfo",
  aliases: ['serverinfo', 'si'],
  category: 'utilitaire',
  description: "Permet de visualiser les informations du Serveur",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  permissionType: '',
  args: false,
  profile: false
};