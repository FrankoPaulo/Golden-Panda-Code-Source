const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const reason = (args.splice(1).join(' ') || "Aucune Raison Spécifiée");
  let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
  let moderator = message.author.username


  const error = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur de Mention**")
    .setColor("#870606")
    .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Utilisateur !**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

  if (!user) message.channel.send(error)

  if (!muterole) {
    muterole = await message.guild.roles.create({
      data: {
        name: 'Muted',
        color: '#818386',
        permissions: []
      }
    });

    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false
      });
    });
  }


  if (user.roles.cache.has(muterole.id)) return message.channel.send("<:Warning:840521136701833226> **Tu peux pas mute un utilisateur déjà mute !**")
  await user.roles.add(muterole.id);
  message.channel.send(`**${user.user.username} a été mute sur le serveur**`)


  const Muteembed = new MessageEmbed()
    .setTitle("Mute Log")
    .setColor("#B22222")
    .setDescription(`**Utilisateur Mute :** ${user.user.username} (${user.id})\n**Modérateur :** ${moderator}\n**Raison :** ${reason}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  // 825063634039341066 - 768200404521320468
  client.channels.cache.get('825063634039341066').send(Muteembed)
  if (!user.user.bot) user.user.send(`<:Warning:840521136701833226> **Vous été mute sur le serveur** ***${message.guild.name}***`)
  message.author.send(`**${user.user.username} a bien été mute sur le serveur **`)

};

module.exports.help = {
  name: "mute",
  aliases: ['mute'],
  category: 'moderation',
  description: "Mute un Utilisateur du Serveur",
  cooldown: 3,
  usage: '<@Utilisateur> [Raison]',
  isUserAdmin: true,
  permissions: true,
  permission: 'Niveau 2 (Modérateur/Animateur/Chef Gestion)',
  permissionType: 'MANAGE_ROLES',
  args: true,
  profile: false
};