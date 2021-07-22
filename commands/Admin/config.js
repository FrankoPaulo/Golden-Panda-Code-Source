const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  //TODO: Refaire la commande et les configs + refaire la database pour les configs


  const settings = await client.getGuild(message.guild);
  const getSetting = args[0];
  const newSetting = args.slice(1).join(" ");

  const error = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur de Permission**")
    .setColor("#870606")
    .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Config\`**\n\n**Niveau/Type de Permission Requises :** Niveau 5 (Propriétaire)\n**Permission Requise :** \`ADMINISTRATOR\``)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

  if (message.author.id !== "550251727698264064") return message.channel.send(error)

  switch (getSetting) {
    case "prefix": {
      if (newSetting) {
        await client.updateGuild(message.guild, { prefix: newSetting });
        return message.channel.send(`Le Prefix a été mis à jour : \n\n\`Ancien Prefix : ${settings.prefix}\` -> \`Nouveau Prefix : ${newSetting}\``);
      }
      message.channel.send(`Prefix Actuel : \`${settings.prefix}\``);
      break;
    }
  };
}

module.exports.help = {
  name: "config",
  aliases: ['config'],
  category: 'admin',
  description: "Permet de configurer le Bot",
  cooldown: 10,
  usage: '<Configuration> <Nouveau Paramètre>',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 5 (Propriétaire)',
  permissionType: 'ADMINISTRATOR',
  args: true,
  profile: false
};