const { battle } = require("../../functions/monsterbattle");
const { calculateUserAttributs } = require("../../functions/userAttributs");
const hostile = require("../../assets/npc/basic.json");
// const { newbattle } = require("../../functions/playerbattle");

//TODO: Faire en sorte que les battle soit aléatoire ?

module.exports.run = async (client, message, args, userInfo) => {
  const player = await client.getUser(message.member);
  const playerStats = await calculateUserAttributs(client, message);
  const q = args.slice(0).join(" ");
  const position = hostile.map(e => e.name.toLowerCase()).indexOf(q.toLowerCase());
  const monster = hostile[position];

  if (player.isBattle === true) return message.channel.send(`${message.member} **Tu est déjà en combat !**`);

  if (q && position !== -1) {
    battle(client, message, playerStats, player, monster);
  } else {
    if (player.zone == "Spawn") {
      if (!args.length) return message.channel.send(`**${message.author.username} Voici les ennemis disponible dans cette zone :\n- Noob\n- Bélier\n- Livre\n- SDF (Boss)**\n\n**Note :** Vous devez écrire les nom __correctement__ !`);
    };

    if (player.zone == "Plaine") {
      if (!args.length) return message.channel.send(`**${message.author.username} Voici les ennemis disponible dans cette zone :\n\n- Mouton\n- Voleur\n- Aventurier\n- Bandit\n- Taureau (Boss)**\n\n**Note :** Vous devez écrire les nom __correctement__ !`);
    };

    if (player.zone == "Forêt") {
      if (!args.length) return message.channel.send(`**${message.author.username} Voici les ennemis disponible dans cette zone :\n\n- Sanglier\n- Champignon\n- Brigant\n- Biche\n- Chasseur\n- Robin (Boss)**\n\n**Note :** Vous devez écrire les nom __correctement__ !`);
    };

    if (player.zone == "Désert") {
      if (!args.length) return message.channel.send(`**${message.author.username} Voici les ennemis disponible dans cette zone :\n\n- Serpent\n- Pilleur\n- Golem\n- Momie\n- Orcs\n- Maraudeurs (Boss)**\n\n**Note :** Vous devez écrire les nom __correctement__ !`);
    };

    if (player.zone == "Volcan") {
      if (!args.length) return message.channel.send(`**${message.author.username} Voici les ennemis disponible dans cette zone :\n\n- Salamandre\n- Nécromantien\n- Ange\n- Minotaure\n- Démon**\n\n**Note :** Vous devez écrire les nom __correctement__ !`);
    };
  };

  if (position == -1) return message.channel.send(`${message.member} **Cet ennemis n'éxiste pas ou alors vérifiez son ortographe, si vous ne savez pas de quel ennemis il s'agit, faites la commande \`zone\`**`);
  if (player.zone !== monster.zone) return message.channel.send(`**Cet ennemis n'éxiste pas dans cette zone !**`);
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
  permissionType: '',
  args: false,
  profile: true
};