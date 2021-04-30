const ms = require("ms")
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
  let moderator = message.author.username
  const reason = (args.splice(2).join(' ') || "Aucune Raison Spécifiée");

  const error = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
  .setColor("#870606")
  .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Mute\`**\n\n**Niveau/Type de Permission Requises :** Niveau 2 (Modérateur/Animateur/Chef Gestion)\n**Permission Requise :** \`MANAGE_ROLES\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  const error3 = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Mention**")
  .setColor("#870606")
  .setDescription(`**Syntaxe Incorrecte ! Vous devez mentionner un Utilisateur !**`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(error)
  if (!user) message.channel.send(error3)

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
  

  if (user.roles.cache.has(muterole.id)) return message.channel.send("<:Warning:766722345280208927> **Tu peux pas mute un utilisateur déjà mute !**")
  await user.roles.add(muterole.id);
  message.channel.send(`**${user.user.username} a été mute sur le serveur**`)


  const Muteembed = new MessageEmbed()
  .setTitle(`Utilisateur Mute : ${user.user.username} (${user.id})`)
  .setAuthor("Mute Log")
  .setColor("#B22222")
  .setDescription(`**Modérateur :** ${moderator}\n**Raison :** ${reason}`)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL());

client.channels.cache.get('ID DU SALON').send(Muteembed)
user.user.send(`<:Warning:766722345280208927> **Vous été mute sur le serveur** ***${message.guild.name}***`)
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
  type: 'MANAGE_ROLES',
  args: true,
  profile: false
};