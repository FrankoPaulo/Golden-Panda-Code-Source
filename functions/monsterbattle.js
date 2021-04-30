const classes = require("../assets/rpg/classes.json");

const battle = async (client, message, playerStats, player, hostile) => {
  if (playerStats.hp <= 0) return message.channel.send(`**Tu est mort ! Tu ne peux pas combattre ! Utile la commande ${client.config.PREFIX}heal pour te récussiter !**`)
  let monsterHealth = hostile.attributs.hp;
  const position = classes.map(e => e.name).indexOf(player.class);
  const classe = classes[position];
  var playerDefense = playerStats.attaque -= hostile.attributs.defense;
  var monsterDefense = hostile.attributs.attaque -= playerStats.defense;
  // let lootAfterBattle = Math.floor(Math.random() * 100) + 1;

  client.updateUserInfo(message.member, {
    "users.$.isBattle": true
  });

  const randomDialog = ["La Bataille fait rage", "Il pleut sur le terrain", "Le Tonerre gronde", "Le soleil illumine le champ de bataille", "Des spectateurs regardent la scène", "Le vent se lève", "Le vent se couche", "La pluis s'arrete...", "Le terrain est gelé", "Le terrain est brûlant", "Le terrain est aride"];

  const battleMessage = await message.channel.send(`**La Bataille commence...**`)

  for (var i = 1; monsterHealth > 0; i++) {
    const randomReplies = Math.floor(Math.random() * randomDialog.length);
    monsterHealth -= playerStats.attaque;
    playerStats.hp -= hostile.attributs.attaque;

    if (playerDefense < 0) playerDefense = 0
    if (monsterDefense < 0) monsterDefense = 0

    // --------------------------------------------------------------------------------------------------------------------

    if (playerStats.hp <= 0) {
      if (player.level <= 4) {
        const lostMoney = hostile.money;
        const lostExp = hostile.experience;
        let expLoss = Math.floor(Math.random(lostExp) * 100) + 10;
        let moneyLoss = Math.floor(Math.random(lostMoney) * 10) + 1;
        player.experience -= expLoss
        player.money -= moneyLoss

        if (player.experience < 0) {
          player.experience = 0
        }
        if (player.money < 0) {
          player.money = 0
        }
  
        const userStats = classe.attributs;
        userStats["hp"] = playerStats.hp = 0;
  
        client.updateUserInfo(message.member, {
          "users.$.attributs": userStats,
          "users.$.zone": "Spawn",
          "users.$.money": player.money,
          "users.$.experience": player.experience,
          "users.$.deaths": player.deaths += 1,
          "users.$.isBattle": false
        });
  
        var playerDefense = playerStats.attaque += hostile.attributs.defense;
        var monsterDefense = hostile.attributs.attaque += playerStats.defense;
  
        return message.channel.send(`**[${message.member}]** | Dommage !, Tu est mort durant la bataille après **${i} Tours**, tu perd **${moneyLoss} <:ServerMoney:830718232293146645>** et **${expLoss} <:XP:830717484406669332>** !`)
      };

      if (player.level <= 8) {
        const lostMoney = hostile.money;
        const lostExp = hostile.experience;
        let expLoss = Math.floor(Math.random(lostExp) * 1000) + 100;
        let moneyLoss = Math.floor(Math.random(lostMoney) * 100) + 10;
        player.experience -= expLoss
        player.money -= moneyLoss

        if (player.experience < 0) {
          player.experience = 0
        }
        if (player.money < 0) {
          player.money = 0
        }
  
        const userStats = classe.attributs;
        userStats["hp"] = playerStats.hp = 0;
  
        client.updateUserInfo(message.member, {
          "users.$.attributs": userStats,
          "users.$.zone": "Spawn",
          "users.$.money": player.money,
          "users.$.experience": player.experience,
          "users.$.deaths": player.deaths += 1,
          "users.$.isBattle": false
        });
  
        var playerDefense = playerStats.attaque += hostile.attributs.defense;
        var monsterDefense = hostile.attributs.attaque += playerStats.defense;
  
        return message.channel.send(`**[${message.member}]** | Dommage !, Tu est mort durant la bataille après **${i} Tours**, tu perd **${moneyLoss} <:ServerMoney:830718232293146645>** et **${expLoss} <:XP:830717484406669332>** !`)
      };

      if (player.level <= 14) {
        const lostMoney = hostile.money;
        const lostExp = hostile.experience;
        let expLoss = Math.floor(Math.random(lostExp) * 3000) + 500;
        let moneyLoss = Math.floor(Math.random(lostMoney) * 300) + 30;
        player.experience -= expLoss
        player.money -= moneyLoss
        if (player.experience < 0) {
          player.experience = 0
        }
        if (player.money < 0) {
          player.money = 0
        }
  
        const userStats = classe.attributs;
        userStats["hp"] = playerStats.hp = 0;
  
        client.updateUserInfo(message.member, {
          "users.$.attributs": userStats,
          "users.$.zone": "Spawn",
          "users.$.money": player.money,
          "users.$.experience": player.experience,
          "users.$.deaths": player.deaths += 1,
          "users.$.isBattle": false
        });
  
        message.channel.send(`**[${message.member}]** | Dommage !, Tu est mort durant la bataille après **${i} Tours**, tu perd **${moneyLoss} <:ServerMoney:830718232293146645>** et **${expLoss} <:XP:830717484406669332>** !`)

        var playerDefense = playerStats.attaque += hostile.attributs.defense;
        var monsterDefense = hostile.attributs.attaque += playerStats.defense;
      };
    };

    // --------------------------------------------------------------------------------------------------------------------


    if (monsterHealth <= 0) {
      const lootMoney = hostile.money;
      const lootExp = hostile.experience;
      const randomLoot = Math.floor(Math.random() * 100) + 0;

      if (hostile.name === 'Noob') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 3) + 1;
        var rewardExp = Math.floor(Math.random(lootExp) * 15) + 1;
        var rewardExp = lootExp 
        var loot = ['Tête de Noob', 'Dirt'];
        if (randomLoot >= 0 && randomLoot <= 50) {
          var randomLootChoise = Math.floor(Math.random() * loot.length);
          var rewardLoot = loot[randomLootChoise];
          player.inventory.push(rewardLoot);
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        player.money += rewardMoney;
        player.experience += rewardExp;
      }
      else if (hostile.name === 'Bélier') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 5) + 1;
        var rewardExp = Math.floor(Math.random(lootExp) * 20) + 1;
        var loot = ['Laine de Bélier', 'Langue de Bélier'];
        if (randomLoot >= 0 && randomLoot <= 30) {
          var randomLootChoise = Math.floor(Math.random() * loot.length);
          var rewardLoot = loot[randomLootChoise];
          player.inventory.push(rewardLoot);
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === 'Livre') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 6) + 1;
        var rewardExp = Math.floor(Math.random(lootExp) * 24) + 2;
        var loot = ['Livre', 'Bout de Papier', 'Bout de Parchemin'];
        var uncommonLoot = ['Parchemin'];
        if (randomLoot >= 21 && randomLoot <= 46) {
          var randomLootChoise = Math.floor(Math.random() * loot.length);
          var rewardLoot = loot[randomLootChoise];
          player.inventory.push(rewardLoot);
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        if (randomLoot >= 0 && randomLoot <= 20) {
          var randomLootChoise = Math.floor(Math.random() * uncommonLoot.length);
          var rewardLoot = uncommonLoot[randomLootChoise];
          player.inventory.push(rewardLoot);
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === 'SDF') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 10) + 5;
        var rewardExp = Math.floor(Math.random(lootExp) * 40) + 10;
        var loot = ['Tissue', 'Bout de Tissue', 'Bouteille de Vin'];
        var uncommonLoot = ['Vieille Piece'];
        if (randomLoot >= 11 && randomLoot <= 26) {
          var randomLootChoise = Math.floor(Math.random() * loot.length);
          var rewardLoot = loot[randomLootChoise];
          player.inventory.push(rewardLoot);
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        if (randomLoot >= 0 && randomLoot <= 10) {
          var randomLootChoise = Math.floor(Math.random() * uncommonLoot.length);
          var rewardLoot = uncommonLoot[randomLootChoise];
          player.inventory.push(rewardLoot);
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        if (randomLoot === 50 || randomLoot === 10) {
          var rewardEC = 2
          client.updateUserInfo(player, {
            "users.$.eventcoins": 2,
          });
        }
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

// -----------------------------------------------------------------

      else if (hostile.name === 'Mouton') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 6) + 3;
        var rewardExp = Math.floor(Math.random(lootExp) * 35) + 7;
        var loot = ['Bave de Mouton', 'Viande Crue']
        var uncommonLoot = ['Laine de Mouton'];
        if (randomLoot >= 11 && randomLoot <= 41) {
          var randomLootChoise = Math.floor(Math.random() * loot.length)
          var rewardLoot = loot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        if (randomLoot >= 0 && randomLoot <= 10) {
          var randomLootChoise = Math.floor(Math.random() * uncommonLoot.length)
          var rewardLoot = uncommonLoot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === 'Voleur') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 12) + 5;
        var rewardExp = Math.floor(Math.random(lootExp) * 43) + 10;
        var loot = ['Poison', 'Sac de Pièce', 'Fumigènes']
        var uncommonLoot = ['Dague de Voleur', 'Capuche du Voleur', 'Manteau du Voleur']
        var rareLoot = ['Gros Sac de Pièce']
        if (randomLoot >= 17 && randomLoot <= 37) {
          var randomLootChoise = Math.floor(Math.random() * loot.length)
          var rewardLoot = loot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        if (randomLoot >= 6 && randomLoot <= 16) {
          var randomLootChoise = Math.floor(Math.random() * uncommonLoot.length)
          var rewardLoot = uncommonLoot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        if (randomLoot >= 0 && randomLoot <= 5) {
          var randomLootChoise = Math.floor(Math.random() * rareLoot.length)
          var rewardLoot = rareLoot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === 'Aventurier') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 25) + 11;
        var rewardExp = Math.floor(Math.random(lootExp) * 60) + 25;
        var loot = ['Lunettes D\'Explorateur', 'Minerai de Fer']
        var uncommonLoot = ['Bouclier Usé', 'Ceinture du Savoir', 'Bottes Usées']
        if (randomLoot >= 8 && randomLoot <= 23) {
          var randomLootChoise = Math.floor(Math.random() * loot.length)
          var rewardLoot = loot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        if (randomLoot >= 0 && randomLoot <= 7) {
          var randomLootChoise = Math.floor(Math.random() * uncommonLoot.length)
          var rewardLoot = uncommonLoot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === 'Bandit') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 30) + 15;
        var rewardExp = Math.floor(Math.random(lootExp) * 60) + 20;
        var loot = ['Bout de Bois', 'Charbon', 'Cuir de Mouton', 'Sac de Pomme']
        var rareLoot = ['Sabre Rouillé']
        if (randomLoot >= 11 && randomLoot <= 21) {
          var randomLootChoise = Math.floor(Math.random() * loot.length)
          var rewardLoot = loot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        if (randomLoot >= 0 && randomLoot <= 5) {
          var randomLootChoise = Math.floor(Math.random() * rareLoot.length)
          var rewardLoot = rareLoot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === 'Taureau') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 45) + 18;
        var rewardExp = Math.floor(Math.random(lootExp) * 100) + 50;
        var epicLoot = ['Lame du Taureau']
        if (randomLoot >= 0 && randomLoot <= 3) {
          var randomLootChoise = Math.floor(Math.random() * epicLoot.length)
          var rewardLoot = epicLoot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        if (randomLoot === 3 || randomLoot === 50) {
          var rewardEC = 5
          client.updateUserInfo(player, {
            "users.$.eventcoins": 5,
          });
        }
        player.money += rewardMoney;
        player.experience += rewardExp;
      message.channel.send("**Vous avez battus le Taureau, il avait l'air féroce**")
      }

// -----------------------------------------------------------------

      else if (hostile.name === 'Sanglier') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 30) + 10;
        var rewardExp = Math.floor(Math.random(lootExp) * 70) + 30;
        var loot = ['Aile de Cochon Volant', 'Griffe Pointu', 'Queue de Cochon Volant']
        var uncommonLoot = ['Crâne de Cochon'];
        if (randomLoot >= 11 && randomLoot <= 31) {
          var randomLootChoise = Math.floor(Math.random() * loot.length)
          var rewardLoot = loot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        if (randomLoot >= 0 && randomLoot <= 10) {
          var randomLootChoise = Math.floor(Math.random() * uncommonLoot.length)
          var rewardLoot = uncommonLoot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === 'Champignon') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 50) + 32;
        var rewardExp = Math.floor(Math.random(lootExp) * 120) + 65;
        var loot = ['Champignon Acide', 'Spore Magique']
        var uncommonLoot = ['Crâne de Cochon'];
        if (randomLoot >= 0 && randomLoot <= 30) {
          var randomLootChoise = Math.floor(Math.random() * loot.length)
          var rewardLoot = loot[randomLootChoise]
          player.inventory.push(rewardLoot)
          client.updateUserInfo(player, {
            "users.$.inventory": player.inventory,
          });
        };
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Brigant") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 30) + 13;
        var rewardExp = Math.floor(Math.random(lootExp) * 85) + 35;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Biche") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 45) + 19;
        var rewardExp = Math.floor(Math.random(lootExp) * 100) + 45;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Chasseur") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 60) + 24;
        var rewardExp = Math.floor(Math.random(lootExp) * 120) + 60;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Robin") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 70) + 30;
        var rewardExp = Math.floor(Math.random(lootExp) * 140) + 85;
        player.money += rewardMoney;
        player.experience += rewardExp;
        message.channel.send("**Vous avez battus Robin Hood, il avait qu'a payer ses taxes !**")
      }

// -----------------------------------------------------------------

      else if (hostile.name === "Serpent") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 65) + 36;
        var rewardExp = Math.floor(Math.random(lootExp) * 125) + 65;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Pilleur") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 80) + 40;
        var rewardExp = Math.floor(Math.random(lootExp) * 145) + 90;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Golem") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 100) + 50;
        var rewardExp = Math.floor(Math.random(lootExp) * 160) + 95;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Momie") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 110) + 60;
        var rewardExp = Math.floor(Math.random(lootExp) * 175) + 105;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Orcs") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 125) + 75;
        var rewardExp = Math.floor(Math.random(lootExp) * 190) + 120;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Maraudeurs") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 160) + 100;
        var rewardExp = Math.floor(Math.random(lootExp) * 235) + 150;
        player.money += rewardMoney;
        player.experience += rewardExp;
        message.channel.send("**Vous avez battus un Maraudeur, il était riche dis moi !**")
      }

// -----------------------------------------------------------------

      else if (hostile.name === "Salamandre") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 120) + 70;
        var rewardExp = Math.floor(Math.random(lootExp) * 180) + 110;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Nécromantien") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 130) + 85;
        var rewardExp = Math.floor(Math.random(lootExp) * 200) + 115;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === "Ange") {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 145) + 100;
        var rewardExp = Math.floor(Math.random(lootExp) * 215) + 125;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === 'Minotaure') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 160) + 110;
        var rewardExp = Math.floor(Math.random(lootExp) * 230) + 140;
        player.money += rewardMoney;
        player.experience += rewardExp;
      }

      else if (hostile.name === 'Démon') {
        var rewardMoney = Math.floor(Math.random(lootMoney) * 200) + 140;
        var rewardExp = Math.floor(Math.random(lootExp) * 300) + 190;
        player.money += rewardMoney;
        player.experience += rewardExp;
        message.channel.send("**Bravo vous avez battus le Démon... Bah vous avez finis le rpg pour le moment quoi xD**")
      }

      const userStats = classe.attributs;
      userStats["hp"] = playerStats.hp;
    
  

      if (player.experience >= parseInt(Math.pow(player.level, 1.8) * 50 * 2)) {
        player.experience -= parseInt(Math.pow(player.level, 1.8) * 50 * 2);
        player.level += 1
        client.updateUserInfo(message.member, {
          "users.$.level": player.level,
          "users.$.experience": player.experience,
        });
        message.reply(`Bravo à toi, tu viens de monter niveau ***${player.level}*** !`);
      if (player.level == 3) message.channel.send("**Vous avez Débloqué la Plaine !**")
      if (player.level == 6) message.channel.send("**Vous avez Débloqué la Forêt !**")
      if (player.level == 10) message.channel.send("**Vous avez Débloqué le Désert !**")
      if (player.level == 15) message.channel.send("**Vous avez Débloqué le Volcan !**")
      if (player.level == 20) message.channel.send("**Vous êtes Niveau Max ! Mais vous pouvez tj level up !**")

      };

      client.updateUserInfo(message.member, {
        "users.$.attributs": userStats,
        "users.$.money": player.money,
        "users.$.experience": player.experience,
        "users.$.kills": player.kills += 1,
        "users.$.isBattle": false
      });


      // if (lootAfterBattle >= 0 && lootAfterBattle <= 100) {

      //     const position = commonLoot.map(e => e.name.toLowerCase()).indexOf(commonLoot.toLowerCase())
      //     const item = commonLoot[position];
      //     let randomItem = [item.item]
      //     const userInventory = player.inventory
      //     const randomGive = Math.floor(Math.random() * randomItem.length)

      //     userInventory.push(randomGive)
      //     client.updateUserInfo(message.member, {
      //       "users.$.inventory": randomGive,
      //     });
      //     message.channel.send(`Oh ! Vous avez trouvé ${randomGive}`)

      // };

      await battleMessage.edit(`**[${message.member}]** | **Tour ${i} :** ${randomDialog[randomReplies]}. **${hostile.battlename}** vous attaque et vous inflige **${monsterDefense} dégats :crossed_swords:**. Vous ripostez et infligez **${playerDefense} dégats :crossed_swords:** !\n**HP Restant :** ***${hostile.battlename} :*** ${monsterHealth} <:HP:823174991428059136> - ***Vous :*** ${playerStats.hp} <:HP:823174991428059136>`)
      message.channel.send(`**[${message.member}]** | Félicitation, la bataille est terminée après **${i} Tours**, il te reste **${playerStats.hp} <:HP:823174991428059136>**\n\n**Loot :** **${rewardMoney} <:ServerMoney:830718232293146645>**\n**${rewardExp} <:XP:830717484406669332>** ${rewardEC ? `\n**${rewardEC}** <:EventCoins:830718231945674763>` : ""} ${rewardLoot ? `\n**${rewardLoot}**` : ""}`)

      var playerDefense = playerStats.attaque += hostile.attributs.defense;
      var monsterDefense = hostile.attributs.attaque += playerStats.defense;
    }


    // --------------------------------------------------------------------------------------------------------------------

        await battleMessage.edit(`**[${message.member}]** | **Tour ${i} :** ${randomDialog[randomReplies]}. **${hostile.battlename}** vous attaque et vous inflige **${monsterDefense} dégats :crossed_swords:**. Vous ripostez et infligez **${playerDefense} dégats :crossed_swords:** !\n**HP Restant :** ***${hostile.battlename} :*** ${monsterHealth} <:HP:823174991428059136> - ***Vous :*** ${playerStats.hp} <:HP:823174991428059136>`)
  };
};

module.exports = {
  battle
}