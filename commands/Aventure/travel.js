const zones = require("../../assets/zone/zone.json");
const { calculateUserAttributs } = require("../../functions/userAttributs");

module.exports.run = async (client, message, args, userInfo) => {
  const player = await client.getUser(message.member)
  const playerStats = await calculateUserAttributs(client, message);
  const position = zones.map(e => e.name).indexOf(args[0]);
  const zone = zones[position];
  if (userInfo.isBattle === true) return message.channel.send(`${message.member} **Tu peux pas travel en combat !**`);

  if (playerStats.hp <= 0) return message.channel.send(`**Tu est mort ! Tu ne peux pas changer de zone ! Utile la commande ${client.config.PREFIX}heal pour te récussiter !**`)
  if (zone.admin === true) return message.channel.send(`**Cette zone n'est pas disponible dans cette version ! Attendez la prochaine Mise à Jour !**`)
  if (player.level < 3) return message.channel.send(`**Vous avez pas le niveau requis pour utiliser cette commande !** \n**(Niveau Requis : 3)**`);
  if (!args.length) return message.channel.send(`**${message.author.username} Voici les différente zone disponible dans le monde\n- Spawn\n- Plaine\n- Forêt\n- Désert\n- Volcan**\n\n**Note : Vous devez écrire les nom __correctement__ !**\n**Vous êtes actuellement dans la zone __${player.zone}__**`);
  if (position == -1) return message.channel.send(`**Cette zone n'existe pas !**`);

  if (player.level < zone.requiredLevel && args[0] === "Plaine") return message.channel.send(`**Vous avez pas le niveau requis pour aller dans cette zone !** \n**(Niveau Requis : ${zone.requiredLevel})**`);
  if (player.level < zone.requiredLevel && args[0] === "Forêt") return message.channel.send(`**Vous avez pas le niveau requis pour aller dans cette zone !** \n**(Niveau Requis : ${zone.requiredLevel})**`);
  if (player.level < zone.requiredLevel && args[0] === "Désert") return message.channel.send(`**Vous avez pas le niveau requis pour aller dans cette zone !** \n**(Niveau Requis : ${zone.requiredLevel})**`);
  if (player.level < zone.requiredLevel && args[0] === "Volcan") return message.channel.send(`**Vous avez pas le niveau requis pour aller dans cette zone !** \n**(Niveau Requis : ${zone.requiredLevel})**`);

  if (player.zone == args[0]) return  message.channel.send(`**Tu est déjà dans cette zone !**`);

  client.updateUserInfo(message.member, {
    "users.$.zone": args[0]
  });
  message.channel.send(`**Vous avez changé de zone ! Vous êtes maintenant dans ${args[0]}**`)
  

};

module.exports.help = {
  name: "travel",
  aliases: ['travel'],
  category: 'aventure',
  description: "Permet de changer de zone sur la map",
  cooldown: 2,
  usage: '<Lieu>',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: true
};