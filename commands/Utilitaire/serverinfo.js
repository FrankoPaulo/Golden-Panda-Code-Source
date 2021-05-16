const { MessageEmbed} = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message, args) => {
   const guild = message.guild;
  
  const embed = new MessageEmbed()
    .setTitle(`Server Info`)
    .setColor('B4E0E0')
    .setThumbnail(guild.iconURL())
    .addFields(
      {name: "✨ **Nom**", value: `${guild.name}`, inline: true},
      {name: "🆔 **ID Du Serveur**", value: `${guild.id}`, inline: true},
      //{name: "👑 **Propriétaire**", value: `${guild.owner.user.tag} (${guild.ownerID})`, inline: true},
      {name: "🕛 **Serveur Crée le**", value: `${moment(guild.createdAt).format('DD/MM/YYYY')} à ${moment(guild.createdAt).format('HH:MM')}`, inline: true},
      {name: "🌍 **Région**", value: `Europe`, inline: true},
      {name: "🚻 **Membres**", value: `${guild.memberCount -1} Membres`, online: true},
      {name: "🎭 **Rôles**", value: `${guild.roles.cache.size} rôles`, inline: true},
      {name: "📰 **Salons**", value: `🖊️ ${guild.channels.cache.filter(ch => ch.type === "text").size} Salons Textuel\n🎤 ${guild.channels.cache.filter(ch => ch.type === "voice").size} Salons Vocaux`, inline: true},
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