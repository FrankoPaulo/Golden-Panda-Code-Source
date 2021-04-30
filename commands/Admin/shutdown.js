const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
    const error = new MessageEmbed()
    .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
    .setColor("#870606")
    .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Shutdown\`**\n\n**Niveau/Type de Permission Requises :** Niveau 5 (Propriétaire)\n**Permission Requise :** \`ADMINISTRATOR\``)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())
  
    if (message.author.id !== "550251727698264064") return message.channel.send(error)
    await message.delete();
    await message.channel.send(":gear: **Le bot est en train de s'éteindre**")
    process.exit();
};

module.exports.help = {
    name: "shutdown",
    aliases: ['shutdown'],
    category: 'admin',
    description: "Permet d'éteindre le Bot (Faisable que par le Propriétaire du Bot !)",
    cooldown: 1,
    usage: '',
    isUserAdmin: false,
    permissions: true,
    permission: 'Niveau 5 (Propriétaire)',
    type: 'ADMINISTRATOR',
    args: false,
    profile: false
  };