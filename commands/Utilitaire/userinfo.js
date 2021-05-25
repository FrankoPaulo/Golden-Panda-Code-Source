const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message, args, userInfo) => {

  //TODO: Ajouter/Changer/Supprimer des données de user

   let member = message.member;
   if (args[0]) member = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) ? message.guild.members.cache.get(args[0]) : null;
   let user = member.user;
   moment.locale('fr');
  
  const embed = new MessageEmbed()
    .setTitle(`**Informations sur ${member.user.tag}**`)
    .setAuthor(`Commande invoqué par ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 128 }))
    .setColor('B4E0E0')
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .addFields(
      {name: "📄 **Surnom**", value: `${!member.nickname ? 'Aucun Surnom' : `${member.nickname}`}`, inline: true},
      {name: "🤖 **Bot**", value: `${user.bot ? 'Cet Utilisateur est un Bot' : 'Cet Utilisateur n\'est pas un Bot'}`, inline: true},
      {name: "🆔 **ID**", value: `${member.id}`, inline: true},
      {name: "🕐 **Compte Crée le**", value: `${moment(user.createdAt).format('LLL')} \`(${moment(user.createdAt).startOf('day').fromNow()})\``, inline: true},
      {name: "🕐 **A Rejoins le**", value: `${moment(member.joinedAt).format('LLL')} \`(${moment(member.joinedAt).startOf('day').fromNow()})\``, inline: true},
      {name: '\u200b', value: `\u200b`, inline: true},
      {name: "❗ **Nombre de Warn**", value: `${userInfo.warnlevel} Warns sur le serveur`, inline: true},
      {name: "✨ **Boost Serveur**", value: `${member.premiumSince ? `Depuis le ${member.premiumSinceTimestamp}` : "N'a pas Boost le Serveur"}`, inline: true},
      {name: "🎭 **Rôles**", value: `${member.roles.cache.map(roles => `<@&${roles.id}>`).join(', ')}`, inline: false},
     
    )


  message.channel.send(embed)
};

module.exports.help = {
  name: "userinfo",
  aliases: ['userinfo', 'ui'],
  category: 'utilitaire',
  description: "Permet de visualiser vos Informations ou celle d'un utilisateur",
  cooldown: 5,
  usage: '[@Utilisateur]',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  permissionType: '',
  args: false,
  profile: false
};