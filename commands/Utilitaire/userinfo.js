const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message, args, userInfo) => {
   let member = message.member;
   if (args[0]) member = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) ? message.guild.members.cache.get(args[0]) : null;
   let user = member.user;
  
  const embed = new MessageEmbed()
    .setTitle(`**${member.user.tag}**`, message.author.avatarURL())
    .setColor('B4E0E0')
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      {name: "📄 **Surnom**", value: `${!member.nickname ? 'Aucun Surnom' : `${member.nickname}`}`, inline: true},
      {name: "🤖 **Bot**", value: `${user.bot ? 'Cet Utilisateur est un Bot' : 'Cet Utilisateur n\'est pas un Bot'}`, inline: true},
      {name: "🆔 **ID**", value: `${member.id}`, inline: true},
      {name: "🕐 **Compte Crée le**", value: `${moment(user.createdAt).format('\`DD/MM/YYYY | hh:mm\`')}`, inline: true},
      {name: "🕐 **A Rejoins le**", value: `${moment(member.joinedAt).format('\`DD/MM/YYYY | hh:mm\`')}`, inline: true},
      {name: '\u200b', value: `\u200b`, inline: true},
      {name: "❗ **Nombre de Warn**", value: `${userInfo.warnlevel} Warns sur le serveur`, inline: true},
      {name: "✨ **Boost Serveur**", value: `${member.premiumSince ? `Depuis le ${member.premiumSinceTimestamp}` : "N'a pas Boost le Serveur"}`, inline: true},
      {name: "🎭 **Rôles**", value: `${member.roles.cache.map(roles => `\`${roles.name}\``).join(', ')}`, inline: false},
     
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