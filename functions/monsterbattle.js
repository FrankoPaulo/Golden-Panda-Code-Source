const classes = require("../assets/rpg/classes.json");

const battle = async (client, message, playerStats, player, hostile) => {

  //TODO: Ajouter les dernier Loos restant + les ajouter dans le shop.json - Modifier le Système de Bataille (Plus Tard) - Ajouter les propriété de l'esprit et l'intelligence - Ajouter des chances de coup critique ou esquive

  if (playerStats.hp <= 0) return message.channel.send(`**Tu est mort ! Tu ne peux pas combattre ! Utile la commande \`${client.config.PREFIX}drink\` pour te récussiter !**`);
  const position = classes.map(e => e.name).indexOf(player.class);
  const classe = classes[position];
  const playerInventory = player.inventory;
  var playerDefense = playerStats.attaque - hostile.attributs.defense;
  var monsterDefense = hostile.attributs.attaque - playerStats.defense;
  let monsterHealth = hostile.attributs.hp;

  client.updateUserInfo(message.member, {
    "users.$.isBattle": true
  });

  const randomDialog = ["La Bataille fait rage", "Il pleut sur le terrain", "Le Tonerre gronde", "Le soleil illumine le champ de bataille", "Des spectateurs regardent la scène", "Le vent se lève", "Le vent se couche", "La pluis s'arrete...", "Le terrain est gelé", "Le terrain est brûlant", "Le terrain est aride"];
  const battleMessage = await message.channel.send(`**La Bataille commence...**`);

  for (var i = 1; monsterHealth > 0; i++) {
    const randomReplies = Math.floor(Math.random() * randomDialog.length);


    if (playerDefense < 0) {
      playerDefense = 0;

      var escapeChance = Math.floor(Math.random() * 15) + 1;
      if (escapeChance == 5) {
        const userStats = classe.attributs;
        userStats["hp"] = Math.floor(Math.round(playerStats.hp / 1.7));

        client.updateUserInfo(message.member, {
          "users.$.attributs": userStats,
          "users.$.isBattle": false
        });

        return message.channel.send(`**[${message.member}]** | Tu remarque que l'ennemis en face est bien trop puissant... Tu réussis à t'en échapper mais tu en laisse des blessures douleureuses...`);
      };
    };

    if (monsterDefense < 0) {
      monsterDefense = 0;

      var escapeChance = Math.floor(Math.random() * 15);
      if (escapeChance == 5) {
        const userStats = classe.attributs;
        userStats["hp"] = playerStats.hp;

        client.updateUserInfo(message.member, {
          "users.$.attributs": userStats,
          "users.$.isBattle": false
        });

        return message.channel.send(`**[${message.member}]** | Ton ennemis remarqua ta puissance grandiose et décida de s'enfuir sans que tu puisse le rattraper...`);
      };
    };

    monsterHealth -= playerDefense;
    playerStats.hp -= monsterDefense;


    // --------------------------------------------------------------------------------------------------------------------

    if (playerStats.hp <= 0) {

      const lossFactor = Math.floor(Math.random() * (2.5 * 100 - 1.1 * 100) + 1 * 100) / (1 * 100);
      const lostXp = Math.floor(Math.round(player.experience /= lossFactor));
      const lostMoney = Math.floor(Math.round(player.money /= lossFactor));

      if (player.experience < 0) {
        player.experience = 0;
      };
      if (player.money < 0) {
        player.money = 0;
      };

      const userStats = classe.attributs;
      userStats["hp"] = playerStats.hp = 0;

      client.updateUserInfo(message.member, {
        "users.$.attributs": userStats,
        "users.$.zone": "Spawn",
        "users.$.money": lostMoney,
        "users.$.experience": lostXp,
        "users.$.deaths": player.deaths += 1,
        "users.$.isBattle": false
      });


      await battleMessage.edit(`**[${message.member}]** | **Tour ${i} :** ${randomDialog[randomReplies]}. **${hostile.battlename}** vous attaque et vous inflige **${monsterDefense} dégats :crossed_swords:**. Vous ripostez et infligez **${playerDefense} dégats :crossed_swords:** !\n**HP Restant :** ***${hostile.battlename} :*** ${monsterHealth} <:HP:823174991428059136> - ***Vous :*** ${playerStats.hp} <:HP:823174991428059136>`);

      return message.channel.send(`**[${message.member}]** | Dommage !, Tu est mort durant la bataille après **${i} Tours**, tu perd **${lostMoney} <:ServerMoney:830718232293146645>** et **${lostXp} <:XP:830717484406669332>** !`);

    };

    // --------------------------------------------------------------------------------------------------------------------


    if (monsterHealth <= 0) {
      const randomMoney = Math.floor(Math.random() * hostile.maxMoney) + hostile.minMoney;
      const randomXp = Math.floor(Math.random() * hostile.maxXp) + hostile.minXp;
      const randomLoot = Math.floor(Math.random() * 100) + 0;

      if (randomLoot == 0 && hostile.type == 'boss') {
        var rewardEC = hostile.eventcoins ? hostile.eventcoins : null;
      };

      // Common Loot
      if (randomLoot >= hostile.minLootNumber && randomLoot <= hostile.maxLootNumber) {
        var randomLootChoise = Math.floor(Math.random() * hostile.loot.length);
        var rewardLoot = hostile.loot[randomLootChoise];
      };

      // Uncommon Loot
      if (randomLoot >= hostile.minUnLootNumber ? hostile.minUnLootNumber : null && randomLoot <= hostile.maxUnLootNumber ? hostile.maxUnLootNumber : null) {
        var randomLootChoise = Math.floor(Math.random() * hostile.uncommonLoot.length);
        var rewardLoot = hostile.loot[randomLootChoise];
      };

      if (randomLoot >= hostile.minRalootNumber ? hostile.minRalootNumber : null && randomLoot <= hostile.maxRalootNumber ? hostile.maxRalootNumber : null) {
        var randomLootChoise = Math.floor(Math.random() * hostile.rareLoot.length);
        var rewardLoot = hostile.loot[randomLootChoise];
      };

      player.money += randomMoney;
      player.experience += randomXp;

      const userStats = classe.attributs;
      userStats["hp"] = playerStats.hp;


      if (player.experience >= parseInt(Math.pow(player.level, 1.8) * 50 * 2)) {
        player.experience -= parseInt(Math.pow(player.level, 1.8) * 50 * 2);
        player.level += 1;

        if (player.level == 20) {
          randomXp = 0;
          player.experience = 0;
        };

        client.updateUserInfo(message.member, {
          "users.$.level": player.level,
          "users.$.experience": player.experience,
        });

        const levelMessage = message.channel.send(`**[${message.member}]** | Bravo à toi, tu viens de monter niveau ***${player.level}*** !`);
        if (player.level == 3) levelMessage.edit(`**[${message.member}]** | Bravo à toi, tu viens de monter niveau ***${player.level}*** !\n**Vous avez débloqué la commande \`${client.config.PREFIX}travel\` et la Plaine**`);
        if (player.level == 6) levelMessage.edit(`**[${message.member}]** | Bravo à toi, tu viens de monter niveau ***${player.level}*** !\n**Vous avez débloqué la Forêt !**`);
        if (player.level == 10) levelMessage.edit(`**[${message.member}]** | Bravo à toi, tu viens de monter niveau ***${player.level}*** !\n**Vous avez débloqué le Désert !**`);
        if (player.level == 15) levelMessage.edit(`**[${message.member}]** | Bravo à toi, tu viens de monter niveau ***${player.level}*** !\n**Vous avez débloqué le Volcan !**`);
        if (player.level == 20) levelMessage.edit(`**[${message.member}]** | Bravo à toi, tu viens de monter niveau ***${player.level}*** !\n**Vous avez atteins le niveau maximum !**`);

      };

      if (playerInventory.length > 15) {
        client.updateUserInfo(message.member, {
          "users.$.attributs": userStats,
          "users.$.money": player.money,
          "users.$.experience": player.experience,
          "users.$.kills": player.kills += 1,
          "users.$.isBattle": false
        });
        message.channel.send(`**[${message.member}] Votre inventaire est plein !**`);

      } else {
        if (rewardLoot != null) {
          playerInventory.push(rewardLoot);
        };

        if (rewardEC != null) {
          client.updateUserInfo(message.member, {
            "users.$.eventcoins": rewardEC
          });
        };

        client.updateUserInfo(message.member, {
          "users.$.attributs": userStats,
          "users.$.money": player.money,
          "users.$.inventory": player.inventory,
          "users.$.experience": player.experience,
          "users.$.kills": player.kills += 1,
          "users.$.isBattle": false
        });
      };


      await battleMessage.edit(`**[${message.member}]** | **Tour ${i} :** ${randomDialog[randomReplies]}. **${hostile.battlename}** vous attaque et vous inflige **${monsterDefense} dégats :crossed_swords:**. Vous ripostez et infligez **${playerDefense} dégats :crossed_swords:** !\n**HP Restant :** ***${hostile.battlename} :*** ${monsterHealth} <:HP:823174991428059136> - ***Vous :*** ${playerStats.hp} <:HP:823174991428059136>`);

      return message.channel.send(`**[${message.member}]** | Félicitation, la bataille est terminée après **${i} Tours**, il te reste **${playerStats.hp} <:HP:823174991428059136>**\n\n**Loot :** **${randomMoney} <:ServerMoney:830718232293146645>**\n**${randomXp} <:XP:830717484406669332>** ${rewardEC ? `\n**${rewardEC}** <:EventCoins:830718231945674763>` : ""} ${rewardLoot ? `\n**${rewardLoot}**` : ""}`);

    }


    // --------------------------------------------------------------------------------------------------------------------

    await battleMessage.edit(`**[${message.member}]** | **Tour ${i} :** ${randomDialog[randomReplies]}. **${hostile.battlename}** vous attaque et vous inflige **${monsterDefense} dégats :crossed_swords:**. Vous ripostez et infligez **${playerDefense} dégats :crossed_swords:** !\n**HP Restant :** ***${hostile.battlename} :*** ${monsterHealth} <:HP:823174991428059136> - ***Vous :*** ${playerStats.hp} <:HP:823174991428059136>`);
  };
};

module.exports = {
  battle
}