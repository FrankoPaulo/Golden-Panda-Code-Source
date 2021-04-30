const { MessageEmbed } = require("discord.js")

module.exports.run = (client, message, args) => {
  // 764182015523553310 - 768145020427305010
  // 825063634039341066 - 830045078093299744
  const error = new MessageEmbed()
    .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
    .setColor("#870606")
    .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Staff\`**\n\n**Niveau/Type de Permission Requises :** Niveau 1 (Tout Staff)\n**Permission Requise :** \`VIEW_AUDIT_LOG\``)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())
  if (!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(error)

  if (!args.length) {
    const basicInfo = new MessageEmbed()
    .setTitle("<:Staff:817323748658118697> **Hub de la Commande Staff**")
    .setDescription(`Bienvenue dans le Hub de la commande \`Staff\`.\nCette commande à pour but de donner des informations oublié à tout membre du staff qu'il s'agisse de nouveau recrue ou de modérateur expérimenté.\n\nPour continuer, veuillez tapez une des sous-commandes disponible sous cette forme ci -> \`${client.config.PREFIX}staff [sous-commande]\``)
    .setFooter("Sous Commande Disponible : rôles - informations - permissions")

    // <@&${'753700632854265936'}>

  
  client.channels.cache.get('ID DU SALON').send(basicInfo)
  message.delete()
  };

  if (args[0] == "rôles") {
    const rôlesInfo = new MessageEmbed()
    .setTitle("<:Staff:817323748658118697> **Commande Staff - \`Rôles\`**")
    .setDescription("Voici les informations sur les rôles de Staff du Serveur !")
    .addFields(
      {name: "**Le Haut Staff**", value: `Il s'agit du Staff Important du serveur, ils s'occupent du Serveur entier, du Staff et des relations intérieur - extérieur ainsi que des affaires se situant dans le réseau.\n\n**<@&${'765650309962924043'}> :** Il s'agit du Fondateur du Serveur. Il possède toute les permissions et est aussi un des Membre du Conseil de la Mégalopole\n\n**<@&${'765650152702607370'}> :** Bras Droit du <@&${'765650309962924043'}>, ils possèdent toutes les permissions et s'occupent de gérer le Staff`, inline: false},

      {name: "**Staff de Modération**", value: `Les protecteurs du serveur. Ils s'occupent de faire regner l'ordre sur le serveur.\n\n**<@&${'765650466096545848'}> :** Les Gardiens sont les protecteurs du serveur. Ils possèdent la majorité des commandes de Modérations. Ils sont chargé de faire respecter le règlement et d'aider les membres en difficulté**\n\n**<@&${'822547689123086377'}> :** Ils occupent le même rôle que les Gardiens, mais leurs pouvoir s'applique lors des Events pour éviter aucun trouble lors des Events organisé par le Staff ou les Membres Créateurs`, inline: false},

      {name: "**Staff Animation/Event**", value: `Il s'agit d'une équipe importante du staff. Ils s'occupent de gérer les animations du serveur, des giveaways et de la grande majorité des Event organisé par les Membres Créateurs\n\n**<@&${'805495643912667208'}> :** Le/La Chef Animation s'occupe des Animations du Serveur et de son Staff. Ils prévois les plannings D'Events, les réunion inter-animateur et l'organisation des Event des Membres Créateurs\n\n**<@&${'771828021996158979'}> :** Les Animateurs s'occupent d'organiser des Animations, de gérer ceux des Membres Créateur et sont sous les ordres du <@&${'805495643912667208'}>`},

      {name: "**Staff Gestion**", value: `Il s'agit du staff qui s'occupe de gérer les différentes fonctions du serveur. Sans eux, le staff serai dans un débordement constant\n\n**<@&${'824652497741676569'}> :** Comme le/la <@&${'805495643912667208'}>. Il s'occupe de son Staff et gère la plus part des fonctions du serveur (recrutement, partenariat, stages, ect...)\n\n**<@&${'824652463684190208'}> :** Les membres possèdant ce rôle organisent le planning des Events de Staff et des Membres Créateurs. Ils ont la responsabilité de stock la grande majorité des Regex !\n\n**<@&${'822443280528179270'}> :** Les Gestionnaire de Stage s'occupent de superviser la formation des stagiaires.\n\n**<@&${'822443304955412529'}> :** Les Gestionnaires de recrutement s'occupent des candidatures et des entretiens d'embauche lors des périodes de recrutement !`}
    )
    .setTimestamp()

    message.channel.send(rôlesInfo)
  };

    
  if (args[0] == "informations") {
    message.channel.send("**Comming Soon !**")
  };


  if (args[0] == "permissions") {
    const permInfo = new MessageEmbed()
    .setTitle("<:Staff:817323748658118697> **Commande Staff - \`Permissions\`**")
    .setDescription("Voici les informations sur les permissions de chaque rôle de staff du Serveur !")
    .addFields(
      {name: "**Le Haut Staff**", value: `**<@&${'765650309962924043'}> :** Toutes les Commandes\n\n**<@&${'765650152702607370'}> :** Toutes les Commandes`, inline: false},

      {name: "**Staff de Modération**", value: `**<@&${'765650466096545848'}> :** Addmoney - RemoveMoney - AddCoin - RemoveCoin - Ban - Blacklist - Kick - Mute - Prune - Purge - TempBan - Tempmute - Unmute - Warn\n\n**<@&${'822547689123086377'}> :** Addmoney - RemoveMoney - AddCoin - RemoveCoin - Ban - Blacklist - Kick - Mute - Prune - Purge - TempBan - Tempmute - Unmute - Warn`, inline: false},

      {name: "**Staff Animation/Event**", value: `**<@&${'805495643912667208'}> :** AddMoney - RemoveMoney - AddCoin - RemoveCoin - Kick - Mute - Prune - Purge - Unmute - Warn\n\n**<@&${'771828021996158979'}> :** AddMoney - RemoveMoney - AddCoin - RemoveCoin - Mute - Prune - Purge - Unmute - Warn`},

      {name: "**Staff Gestion**", value: `**<@&${'824652497741676569'}> :** AddMoney - RemoveMoney - AddCoin - RemoveCoin - Kick - Mute - Prune - Purge - Unmute - Warn\n\n**<@&${'824652463684190208'}> :** AddMoney - RemoveMoney - AddCoin - RemoveCoin - Mute - Prune - Purge - Unmute - Warn\n\n**<@&${'822443280528179270'}> :** AddMoney - RemoveMoney - AddCoin - RemoveCoin - Mute - Prune - Purge - Unmute - Warn\n\n**<@&${'822443304955412529'}> :** AddMoney - RemoveMoney - AddCoin - RemoveCoin - Mute - Prune - Purge - Unmute - Warn`},

      {name: "Autres Rôles", value: `**<@&${'765650647902715957'}> :** Prune - Purge - Warn`}
    )
    .setTimestamp()

    message.channel.send(permInfo)
  }
};

module.exports.help = {
  name: "staff",
  aliases: ['staff'],
  category: 'moderation',
  description: "Renvois des Informations pour l'équipe de Modération",
  cooldown: 5,
  usage: '',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 1 (Tout Staff)',
  type: 'VIEW_AUDIT_LOG',
  args: false,
  profile: false
};