const { battle } = require("../../functions/monsterbattle");
const { calculateUserAttributs } = require("../../functions/userAttributs");
const hostile = require("../../assets/npc/basic.json");
// const { newbattle } = require("../../functions/playerbattle");
// const newPlayerStats = await levelUserAttributs(client, message);

module.exports.run = async (client, message, args, userInfo) => {
  const player = await client.getUser(message.member)
  const playerStats = await calculateUserAttributs(client, message);  
  const position = hostile.map(e => e.name).indexOf(args[0]);
  const monster = hostile[position];

  if (player.isBattle === true) return message.channel.send(`${message.member} **Tu est déjà en combat !**`);

  if (player.zone == "Spawn") {
    if (!args.length) return message.channel.send(`**${message.author.username} Voici les ennemis disponible dans cette zone :\n- Noob\n- Bélier\n- Livre\n- SDF (Boss)**\n\n**Note :** Vous devez écrire les nom __correctement__ !`);

  if (playerStats.defense >= 1.5 && args[0] == "Noob" || player.level >= 3 && args[0] == "Bélier") return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 4 && args[0] == "Bélier" || player.level >= 4 && args[0] == "Bélier") return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 7 && args[0] == "Livre" || player.level >= 5 && args[0] == "Livre") return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 9 && args[0] == "SDF" || player.level >= 6 && args[0] == "SDF") return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  };


  if (player.zone === "Plaine") {
    if (!args.length) return message.channel.send(`**${message.author.username} Voici les ennemis disponible dans cette zone :\n\n- Mouton\n- Voleur\n- Aventurier\n- Bandit\n- Taureau (Boss)**\n\n**Note :** Vous devez écrire les nom __correctement__ !`);

  if (playerStats.defense >= 21 && args[0] == "Mouton" && player.level >= 7) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 31 && args[0] == "Voleur" && player.level >= 8) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 33 && args[0] == "Aventurier" && player.level >= 9) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 36 && args[0] == "Bandit" && player.level >= 10) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 40.5 && args[0] == "Taureau" && player.level >= 11) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  };


  if (player.zone === "Forêt") {
    if (!args.length) return message.channel.send(`**${message.author.username} Voici les ennemis disponible dans cette zone :\n\n- Sanglier\n- Champignon\n- Brigant\n- Biche\n- Chasseur\n- Robin (Boss)**\n\n**Note :** Vous devez écrire les nom __correctement__ !`);

  if (playerStats.defense >= 32 && args[0] == "Sanglier" && player.level >= 10) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 35 && args[0] == "Champignon" && player.level >= 11) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 40 && args[0] == "Brigant" && player.level >= 12) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 27 && args[0] == "Biche" && player.level >= 13) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 30 && args[0] == "Chasseur" && player.level >= 14) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 40 && args[0] == "Robin" && player.level >= 15) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  };


  if (player.zone === "Désert") {
    if (!args.length) return message.channel.send(`**${message.author.username} Voici les ennemis disponible dans cette zone :\n\n- Serpent\n- Pilleur\n- Golem\n- Momie\n- Orcs\n- Maraudeurs (Boss)**\n\n**Note :** Vous devez écrire les nom __correctement__ !`);

  if (playerStats.defense >= 45 && args[0] == "Serpent" && player.level >= 10) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 35 && args[0] == "Pilleur" && player.level >= 11) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 40 && args[0] == "Golem" && player.level >= 12) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 43 && args[0] == "Momie" && player.level >= 13) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 50 && args[0] == "Orcs" && player.level >= 14) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 75 && args[0] == "Maraudeurs" && player.level >= 15) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  };

  if (player.zone === "Volcan") {
    if (!args.length) return message.channel.send(`**${message.author.username} Voici les ennemis disponible dans cette zone :\n\n- Salamandre\n- Nécromantien\n- Ange\n- Minotaure\n- Démon**\n\n**Note :** Vous devez écrire les nom __correctement__ !`);

  if (playerStats.defense >= 45 && args[0] == "Salamandre" && player.level >= 16) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 55 && args[0] == "Nécromantien" && player.level >= 17) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 57 && args[0] == "Ange" && player.level >= 18) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 64 && args[0] == "Minotaure" && player.level >= 19) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  if (playerStats.defense >= 80 && args[0] == "Démon" && player.level >= 20) return message.channel.send("**Votre Niveau ou Votre Défense est trop élevé pour combattre cet ennemis !**");
  };

  if (position == -1) return message.channel.send(`${message.member} **Cet ennemis n'existe pas ou vérifiez son orthographe ! (vérifiez les Majuscules !)**`);
  if (player.zone !== monster.zone) return message.channel.send(`**Cet ennemis est indisponible dans cette zone !**`);

battle(client, message, playerStats, player, monster)
};

module.exports.help = {
  name: "battle",
  aliases: ['battle', 'combat'],
  category: 'aventure',
  description: "Permet de lancer un combat !",
  cooldown: 1,
  usage: '<Nom de L\'Ennemis>',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: true
};