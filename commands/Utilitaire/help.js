const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands/');

module.exports.run = (client, message, args) => {
  message.delete()

  if (!args.length) {

    const embed = new MessageEmbed()
      .setAuthor("GoldenPanda Help", client.user.avatarURL())
      .setColor('RANDOM')
      .addField("Liste des commandes", `Voici une liste des commandes disponible pour \`Golden Panda\`\nLe Prefix du bot actuel est \`${client.config.PREFIX}\`\n\nPour plus d'information sur une commande, tappez \`${client.config.PREFIX}help <commande>\``)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL())

    for (const category of categoryList) {
      embed.addField(
        `${category}`,
        `\`${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join('\`・\`')}\``
      );
    };
    embed.addFields(
      {name: "> Serveur Principal", value: "https://discord.gg/55bTTYunK3", inline: true},
      {name: "> Serveur de Support", value: "https://discord.gg/uC4mvtBFct", inline: true,}
    )

    return message.channel.send(embed)
  } else {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

    const helpembed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Nom de la commande - \`${command.help.name}\``)
      .setDescription(`Quelques informations sur la commande \`${command.help.name}\``)
      .addFields(
        {name: "🔀 Alias", value: `${command.help.aliases.length > 1 ? command.help.aliases.join("・") : command.help.name}`, inline: true},
        {name: "❓ Description", value: `${command.help.description}`, inline: false},
        {name: "🖋️ Syntaxe", value: `\`${client.config.PREFIX}${command.help.name} ${command.help.usage}\``, inline: true},
        {name: "🌡️ Permission", value: `\`${command.help.permission}\` ${!command.help.type ? "" : `- \`(${command.help.type})\``}`, inline: true},
        {name: "⏱️ Cooldown", value: `${command.help.cooldown} seconde(s)`, inline: true}
      )

      return message.channel.send(helpembed)
  }
  
};


module.exports.help = {
  name: "help",
  aliases: ['help'],
  category: 'utilitaire',
  description: "Vous envois une message avec toute les commandes (ou car vous êtes paumé)",
  cooldown: 5,
  usage: '[commande]',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  permissionType: '',
  args: false,
  profile: false
};