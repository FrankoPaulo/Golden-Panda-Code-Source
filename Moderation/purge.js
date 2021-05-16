const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  let moderator = message.author.username
  if (isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return message.channel.send(`<:Warning:840521136701833226> **Il faut spécifier un __nombre__ entre 1 et 100 ! ${message.author}**`)

  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  });

  message.delete();
  await message.channel.bulkDelete(messages);


  const purgeembed = new MessageEmbed()
    .setTitle("**Purge Log**")
    .setAuthor(`Utilisateur : ${moderator}`, message.author.avatarURL())
    .setColor("#B22222")
    .setDescription(`**Modérateur : ${moderator}**\n **Action :** \`Purge\`\n**Nombre de Message Purgé :** ${args[0]}\n**Salon Purgé :** ${message.channel}`)

    // 825063634039341066 - 768200404521320468
    client.channels.cache.get('825063634039341066').send(purgeembed)
};

module.exports.help = {
  name: "purge",
  aliases: ['purge', 'clear'],
  category: 'moderation',
  description: "Purge les Messages d'un Salon",
  cooldown: 3,
  usage: '<Nombre>',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 1 (Tout Staff)',
  permissionType: 'VIEW_AUDIT_LOG',
  args: true,
  profile: false
};