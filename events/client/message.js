const { Collection, MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return
  if (message.author.bot) return;


  const data = await client.getGuild(message.guild);
  const position = data.users.map(e => e.id).indexOf(message.member.id);
  const userInfo = data.users[position];

  if (message.guild && position == -1) return client.createUserProfile(message.member, message.guild)



  const args = message.content.slice(data.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first()



  if (user && !args[1]) {
    if (user.id === client.user.id) message.channel.send(`Hello ! Je suis **${client.config.NAME}**, mon prefix actuel est \`${data.prefix}\``);
  }

  if (!message.content.startsWith(data.prefix)) return;



  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  console.log(client.commands);
  if (!command) return;


  const permError = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur de Permission**")
    .setColor("#870606")
    .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`${command.help.name}\`**\n\n**Niveau/Type de Permission Requises :** ${command.help.permission}\n**Permission Requise :** \`${command.help.permissionType}\``)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

  const argsError = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur de Syntaxe**")
    .setColor("#870606")
    .setDescription(`**Mauvaise Syntaxe pour cette Commande !**\n**Syntaxe Correcte :** \`${data.prefix}${command.help.name} ${command.help.usage}\`\n\n\`<>\` Obligatoire\n\`[]\` Optionnel`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())

  const isAdminError = new MessageEmbed()
    .setTitle("<:Warning:840521136701833226> **Erreur de Permission**")
    .setColor("#870606")
    .setDescription(`**Il est __Impossible__ D'utiliser la commande \`${command.help.name}\` sur cet utilisateur !**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL())




  if (command.help.permissions && command.help.permissionType == '') {
    return;
  } else if (command.help.permissions && !message.member.hasPermission(command.help.permissionType)) return message.channel.send(permError)



  if (command.help.args && !args.length) return message.channel.send(argsError);
  if (command.help.profile && !userInfo.class) return message.channel.send(`<:Warning:840521136701833226> **Tu n'as pas encore crée de Personnage !\nTape la commande \`setup\` pour créer ton Profil ! ${message.author}**`)
  if (command.help.isUserAdmin && message.guild.member(user).hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(isAdminError)
  


  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  }

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown) * 1000;
  console.log(client.cooldowns);

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow);
      const cooldownError = new MessageEmbed()
        .setTitle("<:Warning:840521136701833226> **Erreur de Cooldown**")
        .setColor("#870606")
        .setDescription(`**Wow wow wow ! On se calme, il te reste** **${Math.floor(timeLeft / (1000 * 60 * 60) % 24)}h${Math.floor(timeLeft / (1000 * 60) % 60)}min${Math.floor(timeLeft / (1000) % 60).toFixed(0)}s** **avant de utiliser à nouveau la commande \`${command.help.name}\` !**`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL())
      return message.channel.send(cooldownError)
    }
  }


  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);


  command.run(client, message, args, userInfo);
}

