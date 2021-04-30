const { MessageEmbed } = require("discord.js")
const { capitalize } = require("../../functions/string");

module.exports.run = async (client, message, args, userInfo) => {
  const items = [];
  const shop = require("../../assets/shop/shop.json");
  const q = args.slice(1).join(" ");
  const position = shop.map(e => e.name.toLowerCase()).indexOf(q.toLowerCase());

  const item = shop[position];

  const userInventory = userInfo.inventory
  const user = message.author.username


  // ------------------------------------------------------------------------------------------------


  if (userInfo.zone == "Spawn") {

    if (q && position == -1) message.channel.send(`:warning: **${user} cet objet n'éxiste pas ! Vérifiez si celui-ci se trouve encore dans le shop ou vérifiez l'ortographe de celui-ci !**`)


    const Shopembed = new MessageEmbed()
      .setTitle("Spawn Shop de Event Games")
      .setFooter(message.author.username, message.author.avatarURL())


    if (q && position !== -1) {
      if (args[0] == "show") {
        if (item.type == "Loot") return message.channel.send(`**Cet Item n'est pas à vendre au shop ! Pour voir ses stats, veuillez faire \`${client.config.PREFIX}inventaire show Item\``)
        const Showembed = new MessageEmbed()
          .setTitle(`**Nom :** ${item.name} | **Type D'Item :** ${item.type}`)
          .setColor(item.color)
          .setThumbnail(item.icon)
          .setDescription(`${item.description}`)
          .addFields(
            { name: "__**Rareté**__", value: item.rarity, inline: true },
            { name: "__**Prix**__", value: item.prix + " <:ServerMoney:830718232293146645>", inline: true },
            { name: '\u200b', value: `\u200b`, inline: true },
            { name: "__**Niveau Requis**__", value: `${item.requireLevel ? `\n**Niveau ${item.requireLevel}**` : "Pas de Niveau Requis"}`, inline: true },
            { name: "__**Stats Données**__", value: `${item.attributs ? Object.entries(item.attributs).map(([key, value]) => `**${capitalize(key)}**: ${value}`).join("\n") : "Cet Item ne donne Aucune Stats !"}`, inline: true },
            { name: '\u200b', value: `\u200b`, inline: true },
          )

        message.channel.send(Showembed)
      };


      if (args[0] == "buy") {
        try {
          if (item.canBuy === false) return message.channel.send(`:warning: **${user} Vous ne pouvez pas acheter cet objet !**`)
          message.channel.send(`**Confirmez-vous L'Achat de \`${item.name.toLowerCase()}\` pour \`${item.prixAchat}\` <:ServerMoney:830718232293146645> ?** (oui ou non)`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });

          if (userEntry.first().content.toLowerCase() === "oui") {
            if (userInfo.level < item.requireLevel) return message.channel.send(`:warning: **${user} Vous n'avez pas le niveau requis pour cet item ! (Niveau Requis : ${item.requireLevel})**`)
            if (userInfo.money < item.prix) return message.channel.send(`:warning: **${user} Vous n'avez pas assez d'argent ! (Votre Balance Actuel : ${userInfo.money}**)`)
            const userMoney = userInfo.money - item.prixAchat;
            client.updateUserInfo(message.member, {
              "users.$.money": userMoney,
            });

            message.channel.send(`**Item Acheté** | Merci de votre achat ! Il vous reste \`${userInfo.money - item.prix}\` <:ServerMoney:830718232293146645> !`)

            userInventory.push(item.item)
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory,
            });
          } else if (userEntry.first().content.toLowerCase() === "non") {
            message.channel.send("**Achat Annulé !**")
          }
        } catch (e) {
          message.channel.send("**Achat Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
        };
      };


      if (args[0] == "sell") {
        try {
          const check = userInventory.indexOf(capitalize(q));
          if (check == -1) return message.channel.send(`:warning: **${user} Vous ne possédez pas cet objet dans votre Inventaire !**`)
          if (item.canSell === false) return message.channel.send(`:warning: **${user} Vous ne pouvez pas vendre cet objet !**`)
          message.channel.send(`**Confirmez-vous la Vente de \`${item.name.toLowerCase()}\` pour \`${item.prixVente}\` <:ServerMoney:830718232293146645> ?** (oui ou non)`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });

          if (userEntry.first().content.toLowerCase() === "oui") {
            const userMoney = userInfo.money + item.prixVente;
            client.updateUserInfo(message.member, {
              "users.$.money": userMoney,
            });

            message.channel.send(`**Item Vendu** | Merci de votre vente ! Vous avez maintenant \`${userInfo.money + item.prixVente}\` <:ServerMoney:830718232293146645> !`)

            userInventory.splice(check, 1)
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory,
            });
          } else if (userEntry.first().content.toLowerCase() === "non") {
            message.channel.send("**Vente Annulé !**")
          }
        } catch (e) {
          message.channel.send("**Vente Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
        };
      };


    } else {
      Shopembed.addFields(
        { name: "__**Set du Novice**__", value: `Bandana de Novice\n**- Prix :** 120 <:ServerMoney:830718232293146645>\nBracelet de Novice\n**- Prix :** 100 <:ServerMoney:830718232293146645>\nSandales du SDF\n**- Prix :** 105 <:ServerMoney:830718232293146645>\nBranche\n**- Prix :** 110 <:ServerMoney:830718232293146645>`, inline: true },
        { name: "__**Set en Bois**__", value: `Casque en Bois\n**- Prix :** 180 <:ServerMoney:830718232293146645>\nPlastron en Bois\n**- Prix :** 200 <:ServerMoney:830718232293146645>\nJambières en Bois\n**- Prix :** 190 <:ServerMoney:830718232293146645>\nEpée en Bois\n**- Prix :** 210 <:ServerMoney:830718232293146645>`, inline: true },
        { name: '\u200b', value: `\u200b`, inline: true },
        { name: "__**Set en Cuir**__", value: `Chapeau en Cuir\n**- Prix :** 250 <:ServerMoney:830718232293146645>\nPlastron en Cuir\n**- Prix :** 270 <:ServerMoney:830718232293146645>\nPantalon en Cuir\n**- Prix :** 255 <:ServerMoney:830718232293146645>\nGant en Cuir\n**- Prix :** 230 <:ServerMoney:830718232293146645>\nBottes en Cuir\n**- Prix :** 245 <:ServerMoney:830718232293146645>\nBouclier Basique\n**- Prix :** 300 <:ServerMoney:830718232293146645>`, inline: true },
        { name: "__**Set du Hérisson Métalique**__", value: `Casque Cornu\n**- Prix :** 340 <:ServerMoney:830718232293146645>\nPlastron en Fer\n**- Prix :** 360 <:ServerMoney:830718232293146645>\nJambières en Fer\n**- Prix :** 340 <:ServerMoney:830718232293146645>\nGant en Fer\n**- Prix :** 300 <:ServerMoney:830718232293146645>\nBottes en Fer\n**- Prix :** 310 <:ServerMoney:830718232293146645>\nEpée en Feraille\n**- Prix :** 340 <:ServerMoney:830718232293146645>`, inline: true },
        { name: '__**Consommable**__', value: `Potion de Soin\n**- Prix :** 20 <:ServerMoney:830718232293146645>`, inline: true }
      )
      Shopembed.setDescription(`**Noob :** BoNjOuR. VoIcI mOn MaGaSiN !\n**Petite Aide :** \`!shop buy <Item>\`\n\n${items.map(item => `${item}`).join('\n')}`);
      Shopembed.setFooter("Sous-Commande Disponible : Show - Buy - Sell");
      message.channel.send(Shopembed);
    };
  };


  // ------------------------------------------------------------------------------------------------


  if (userInfo.zone == "Plaine") {

    if (q && position == -1) message.channel.send(`:warning: **${user} cet objet n'éxiste pas ! Vérifiez si celui-ci se trouve encore dans le shop ou vérifiez l'ortographe de celui-ci !**`)


    const Shopembed = new MessageEmbed()
      .setTitle("Shop de la Forêt de Contribourg")
      .setFooter(message.author.username, message.author.avatarURL())


    if (q && position !== -1) {
      if (args[0] == "show") {
        if (item.type == "Loot") return message.channel.send(`**Cet Item n'est pas à vendre au shop ! Pour voir ses stats, veuillez faire \`${client.config.PREFIX}inventaire show Item\``)
        const Showembed = new MessageEmbed()
          .setTitle(`**Nom :** ${item.name} | **Type D'Item :** ${item.type}`)
          .setColor(item.color)
          .setThumbnail(item.icon)
          .setDescription(`${item.description}`)
          .addFields(
            { name: "__**Rareté**__", value: item.rarity, inline: true },
            { name: "__**Prix**__", value: item.prix + " <:ServerMoney:830718232293146645>", inline: true },
            { name: '\u200b', value: `\u200b`, inline: true },
            { name: "__**Niveau Requis**__", value: `${item.requireLevel ? `\n**Niveau ${item.requireLevel}**` : "Pas de Niveau Requis"}`, inline: true },
            { name: "__**Stats Données**__", value: `${item.attributs ? Object.entries(item.attributs).map(([key, value]) => `**${capitalize(key)}**: ${value}`).join("\n") : "Cet Item ne donne Aucune Stats !"}`, inline: true },
            { name: '\u200b', value: `\u200b`, inline: true },
          )

        message.channel.send(Showembed)
      };


      if (args[0] == "buy") {
        try {
          if (item.canBuy === false) return message.channel.send(`:warning: **${user} Vous ne pouvez pas acheter cet objet !**`)
          message.channel.send(`**Confirmez-vous L'Achat de \`${item.name.toLowerCase()}\` pour \`${item.prixAchat}\` <:ServerMoney:830718232293146645> ?** (oui ou non)`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });

          if (userEntry.first().content.toLowerCase() === "oui") {
            if (userInfo.level < item.requireLevel) return message.channel.send(`:warning: **${user} Vous n'avez pas le niveau requis pour cet item ! (Niveau Requis : ${item.requireLevel})**`)
            if (userInfo.money < item.prix) return message.channel.send(`:warning: **${user} Vous n'avez pas assez d'argent ! (Votre Balance Actuel : ${userInfo.money}**)`)
            const userMoney = userInfo.money - item.prixAchat;
            client.updateUserInfo(message.member, {
              "users.$.money": userMoney,
            });

            message.channel.send(`**Item Acheté** | Merci de votre achat ! Il vous reste \`${userInfo.money - item.prix}\` <:ServerMoney:830718232293146645> !`)

            userInventory.push(item.item)
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory,
            });
          } else if (userEntry.first().content.toLowerCase() === "non") {
            message.channel.send("**Achat Annulé !**")
          }
        } catch (e) {
          message.channel.send("**Achat Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
        };
      };


      if (args[0] == "sell") {
        try {
          const check = userInventory.indexOf(capitalize(q));
          if (check == -1) return message.channel.send(`:warning: **${user} Vous ne possédez pas cet objet dans votre Inventaire !**`)
          if (item.canSell === false) return message.channel.send(`:warning: **${user} Vous ne pouvez pas vendre cet objet !**`)
          message.channel.send(`**Confirmez-vous la Vente de \`${item.name.toLowerCase()}\` pour \`${item.prixVente}\` <:ServerMoney:830718232293146645> ?** (oui ou non)`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });

          if (userEntry.first().content.toLowerCase() === "oui") {
            const userMoney = userInfo.money + item.prixVente;
            client.updateUserInfo(message.member, {
              "users.$.money": userMoney,
            });

            message.channel.send(`**Item Vendu** | Merci de votre vente ! Vous avez maintenant \`${userInfo.money + item.prixVente}\` <:ServerMoney:830718232293146645> !`)

            userInventory.splice(check, 1)
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory,
            });
          } else if (userEntry.first().content.toLowerCase() === "non") {
            message.channel.send("**Vente Annulé !**")
          }
        } catch (e) {
          message.channel.send("**Vente Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
        };
      };



    } else {
      Shopembed.addFields(
        { name: "__**Set du Mouton**__", value: `Chapeau du Mouton\n**- Prix :** 520 <:ServerMoney:830718232293146645>\nCape du Mouton\n**- Prix :** 545 <:ServerMoney:830718232293146645>\nPoings du Mouton\n**- Prix :** 510 <:ServerMoney:830718232293146645>\nBottes du Mouton\n**- Prix :** 525 <:ServerMoney:830718232293146645>\nMarteau du Mouton\n**- Prix :** 550 <:ServerMoney:830718232293146645>`, inline: true },
        { name: "__**Set du Paysan**__", value: `Bob du Paysan\n**- Prix :** 1090 <:ServerMoney:830718232293146645>\nSac du Paysan\n**- Prix :** 1155 <:ServerMoney:830718232293146645>\nCulotte du Paysan\n**- Prix :** 1100 <:ServerMoney:830718232293146645>\nBrassard du Paysan\n**- Prix :** 1050 <:ServerMoney:830718232293146645>\nBottes du Paysan\n**- Prix :** 1080 <:ServerMoney:830718232293146645>\nFaux du Paysan\n**- Prix :** 1200 <:ServerMoney:830718232293146645>`, inline: true },
        { name: "__**Consommable**__", value: `Potion de Soin\n**- Prix :** 50 <:ServerMoney:830718232293146645>\nPotion d'Experience\n**- Prix :** 1000 <:ServerMoney:830718232293146645>`, inline: true}
      )
      Shopembed.setDescription(`**Berger :** Bienvenue dans le marché de Contribourg ! Voici ce que nous avons en stock dans notre magasin ! Prenez votre temps, la boutique ferme que durant les pleine lunes rouge !\n\n${items.map(item => `${item}`).join('\n')}`);
      Shopembed.setFooter("Sous-Commande Disponible : Show - Buy - Sell");
      message.channel.send(Shopembed);
    };
  };


  // ------------------------------------------------------------------------------------------------


  if (userInfo.zone == "Forêt") {

    if (q && position == -1) message.channel.send(`:warning: **${user} cet objet n'éxiste pas ! Vérifiez si celui-ci se trouve encore dans le shop ou vérifiez l'ortographe de celui-ci !**`)


    const Shopembed = new MessageEmbed()
      .setTitle("Shop de la Forêt de Courtebois")
      .setFooter(message.author.username, message.author.avatarURL())


    if (q && position !== -1) {
      if (args[0] == "show") {
        if (item.type == "Loot") return message.channel.send(`**Cet Item n'est pas à vendre au shop ! Pour voir ses stats, veuillez faire \`${client.config.PREFIX}inventaire show Item\``)
        const Showembed = new MessageEmbed()
          .setTitle(`**Nom :** ${item.name} | **Type D'Item :** ${item.type}`)
          .setColor(item.color)
          .setThumbnail(item.icon)
          .setDescription(`${item.description}`)
          .addFields(
            { name: "__**Rareté**__", value: item.rarity, inline: true },
            { name: "__**Prix**__", value: item.prix + " <:ServerMoney:830718232293146645>", inline: true },
            { name: '\u200b', value: `\u200b`, inline: true },
            { name: "__**Niveau Requis**__", value: `${item.requireLevel ? `\n**Niveau ${item.requireLevel}**` : "Pas de Niveau Requis"}`, inline: true },
            { name: "__**Stats Données**__", value: `${item.attributs ? Object.entries(item.attributs).map(([key, value]) => `**${capitalize(key)}**: ${value}`).join("\n") : "Cet Item ne donne Aucune Stats !"}`, inline: true },
            { name: '\u200b', value: `\u200b`, inline: true },
          )

        message.channel.send(Showembed)
      };


      if (args[0] == "buy") {
        try {
          if (item.canBuy === false) return message.channel.send(`:warning: **${user} Vous ne pouvez pas acheter cet objet !**`)
          message.channel.send(`**Confirmez-vous L'Achat de \`${item.name.toLowerCase()}\` pour \`${item.prixAchat}\` <:ServerMoney:830718232293146645> ?** (oui ou non)`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });

          if (userEntry.first().content.toLowerCase() === "oui") {
            if (userInfo.level < item.requireLevel) return message.channel.send(`:warning: **${user} Vous n'avez pas le niveau requis pour cet item ! (Niveau Requis : ${item.requireLevel})**`)
            if (userInfo.money < item.prix) return message.channel.send(`:warning: **${user} Vous n'avez pas assez d'argent ! (Votre Balance Actuel : ${userInfo.money}**)`)
            const userMoney = userInfo.money - item.prixAchat;
            client.updateUserInfo(message.member, {
              "users.$.money": userMoney,
            });

            message.channel.send(`**Item Acheté** | Merci de votre achat ! Il vous reste \`${userInfo.money - item.prix}\` <:ServerMoney:830718232293146645> !`)

            userInventory.push(item.item)
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory,
            });
          } else if (userEntry.first().content.toLowerCase() === "non") {
            message.channel.send("**Achat Annulé !**")
          }
        } catch (e) {
          message.channel.send("**Achat Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
        };
      };


      if (args[0] == "sell") {
        try {
          const check = userInventory.indexOf(capitalize(q));
          if (check == -1) return message.channel.send(`:warning: **${user} Vous ne possédez pas cet objet dans votre Inventaire !**`)
          if (item.canSell === false) return message.channel.send(`:warning: **${user} Vous ne pouvez pas vendre cet objet !**`)
          message.channel.send(`**Confirmez-vous la Vente de \`${item.name.toLowerCase()}\` pour \`${item.prixVente}\` <:ServerMoney:830718232293146645> ?** (oui ou non)`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });

          if (userEntry.first().content.toLowerCase() === "oui") {
            const userMoney = userInfo.money + item.prixVente;
            client.updateUserInfo(message.member, {
              "users.$.money": userMoney,
            });

            message.channel.send(`**Item Vendu** | Merci de votre vente ! Vous avez maintenant \`${userInfo.money + item.prixVente}\` <:ServerMoney:830718232293146645> !`)

            userInventory.splice(check, 1)
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory,
            });
          } else if (userEntry.first().content.toLowerCase() === "non") {
            message.channel.send("**Vente Annulé !**")
          }
        } catch (e) {
          message.channel.send("**Vente Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
        };
      };


    } else {
      shop.map(e => {
        if (e.zone === "Forêt") {
          Shopembed.addField("\n" + "- **" + e.name + " - " + e.prix + "**" + "<:ServerMoney:830718232293146645>", e.description)
        };
      });
      Shopembed.setDescription(`**Chasseur :** Désolé, la boutique est en construction !\n\n${items.map(item => `${item}`).join('\n')}`);
      Shopembed.setFooter("Sous-Commande Disponible : Show - Buy - Sell");
      message.channel.send(Shopembed);
    };
  };


  // ------------------------------------------------------------------------------------------------


  if (userInfo.zone == "Désert") {

    if (q && position == -1) message.channel.send(`:warning: **${user} cet objet n'éxiste pas ! Vérifiez si celui-ci se trouve encore dans le shop ou vérifiez l'ortographe de celui-ci !**`)


    const Shopembed = new MessageEmbed()
      .setTitle("Shop du Désert Aride")
      .setFooter(message.author.username, message.author.avatarURL())


    if (q && position !== -1) {
      if (args[0] == "show") {
        const Showembed = new MessageEmbed()
          .setTitle(`${item.name} | (Type : ${item.type})`)
          .setColor(item.color)
          .setThumbnail(item.icon)
          .setDescription(`${item.description}\n\n**Prix :** ${item.prix} <:ServerMoney:830718232293146645>\n**Niveaux Requis :** ${item.requireLevel}`)
          .addField("Attributs :", `${Object.entries(item.attributs).map(([key, value]) => `**${capitalize(key)}**: ${value}`).join("\n")}`)

        message.channel.send(Showembed)
      };


      if (args[0] == "buy") {
        try {
          if (item.canBuy === false) return message.channel.send(`:warning: **${user} Vous ne pouvez pas acheter cet objet !**`)
          message.channel.send(`**Confirmez-vous L'Achat de \`${item.name.toLowerCase()}\` pour \`${item.prixAchat}\` <:ServerMoney:830718232293146645> ?** (oui ou non)`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });

          if (userEntry.first().content.toLowerCase() === "oui") {
            if (userInfo.level < item.requireLevel) return message.channel.send(`:warning: **${user} Vous n'avez pas le niveau requis pour cet item ! (Niveau Requis : ${item.requireLevel})**`)
            if (userInfo.money < item.prix) return message.channel.send(`:warning: **${user} Vous n'avez pas assez d'argent ! (Votre Balance Actuel : ${userInfo.money}**)`)
            const userMoney = userInfo.money - item.prixAchat;
            client.updateUserInfo(message.member, {
              "users.$.money": userMoney,
            });

            message.channel.send(`**Item Acheté** | Merci de votre achat ! Il vous reste \`${userInfo.money - item.prix}\` <:ServerMoney:830718232293146645> !`)

            userInventory.push(item.item)
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory,
            });
          } else if (userEntry.first().content.toLowerCase() === "non") {
            message.channel.send("**Achat Annulé !**")
          }
        } catch (e) {
          message.channel.send("**Achat Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
        };
      };


      if (args[0] == "sell") {
        try {
          const check = userInventory.indexOf(capitalize(q));
          if (check == -1) return message.channel.send(`:warning: **${user} Vous ne possédez pas cet objet dans votre Inventaire !**`)
          if (item.canSell === false) return message.channel.send(`:warning: **${user} Vous ne pouvez pas vendre cet objet !**`)
          message.channel.send(`**Confirmez-vous la Vente de \`${item.name.toLowerCase()}\` pour \`${item.prixVente}\` <:ServerMoney:830718232293146645> ?** (oui ou non)`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });

          if (userEntry.first().content.toLowerCase() === "oui") {
            const userMoney = userInfo.money + item.prixVente;
            client.updateUserInfo(message.member, {
              "users.$.money": userMoney,
            });

            message.channel.send(`**Item Vendu** | Merci de votre vente ! Vous avez maintenant \`${userInfo.money + item.prixVente}\` <:ServerMoney:830718232293146645> !`)

            userInventory.splice(check, 1)
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory,
            });
          } else if (userEntry.first().content.toLowerCase() === "non") {
            message.channel.send("**Vente Annulé !**")
          }
        } catch (e) {
          message.channel.send("**Vente Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
        };
      };


    } else {
      shop.map(e => {
        if (e.zone === "Désert") {
          Shopembed.addField("\n" + "- **" + e.name + " - " + e.prix + "**" + "<:ServerMoney:830718232293146645>", e.description)
        };
      });
      Shopembed.setDescription(`**Noob :** BoNjOuR. VoIcI mOn MaGaSiN !\n**Petite Aide :** \`!shop buy <Item>\`\n\n${items.map(item => `${item}`).join('\n')}`);
      Shopembed.setFooter("Sous-Commande Disponible : Show - Buy - Sell");
      message.channel.send(Shopembed);
    };
  };


  // ------------------------------------------------------------------------------------------------


  if (userInfo.zone == "Volcan") {

    if (q && position == -1) message.channel.send(`:warning: **${user} cet objet n'éxiste pas ! Vérifiez si celui-ci se trouve encore dans le shop ou vérifiez l'ortographe de celui-ci !**`)


    const Shopembed = new MessageEmbed()
      .setTitle("Shop du Magma Flottant")
      .setFooter(message.author.username, message.author.avatarURL())


    if (q && position !== -1) {
      if (args[0] == "show") {
        const Showembed = new MessageEmbed()
          .setTitle(`${item.name} | (Type : ${item.type})`)
          .setColor(item.color)
          .setThumbnail(item.icon)
          .setDescription(`${item.description}\n\n**Prix :** ${item.prix} <:ServerMoney:830718232293146645>\n**Niveaux Requis :** ${item.requireLevel}`)
          .addField("Attributs :", `${Object.entries(item.attributs).map(([key, value]) => `**${capitalize(key)}**: ${value}`).join("\n")}`)

        message.channel.send(Showembed)
      };


      if (args[0] == "buy") {
        try {
          if (item.canBuy === false) return message.channel.send(`:warning: **${user} Vous ne pouvez pas acheter cet objet !**`)
          message.channel.send(`**Confirmez-vous L'Achat de \`${item.name.toLowerCase()}\` pour \`${item.prixAchat}\` <:ServerMoney:830718232293146645> ?** (oui ou non)`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });

          if (userEntry.first().content.toLowerCase() === "oui") {
            if (userInfo.level < item.requireLevel) return message.channel.send(`:warning: **${user} Vous n'avez pas le niveau requis pour cet item ! (Niveau Requis : ${item.requireLevel})**`)
            if (userInfo.money < item.prix) return message.channel.send(`:warning: **${user} Vous n'avez pas assez d'argent ! (Votre Balance Actuel : ${userInfo.money}**)`)
            const userMoney = userInfo.money - item.prixAchat;
            client.updateUserInfo(message.member, {
              "users.$.money": userMoney,
            });

            message.channel.send(`**Item Acheté** | Merci de votre achat ! Il vous reste \`${userInfo.money - item.prix}\` <:ServerMoney:830718232293146645> !`)

            userInventory.push(item.item)
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory,
            });
          } else if (userEntry.first().content.toLowerCase() === "non") {
            message.channel.send("**Achat Annulé !**")
          }
        } catch (e) {
          message.channel.send("**Achat Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
        };
      };


      if (args[0] == "sell") {
        try {
          const check = userInventory.indexOf(capitalize(q));
          if (check == -1) return message.channel.send(`:warning: **${user} Vous ne possédez pas cet objet dans votre Inventaire !**`)
          if (item.canSell === false) return message.channel.send(`:warning: **${user} Vous ne pouvez pas vendre cet objet !**`)
          message.channel.send(`**Confirmez-vous la Vente de \`${item.name.toLowerCase()}\` pour \`${item.prixVente}\` <:ServerMoney:830718232293146645> ?** (oui ou non)`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });

          if (userEntry.first().content.toLowerCase() === "oui") {
            const userMoney = userInfo.money + item.prixVente;
            client.updateUserInfo(message.member, {
              "users.$.money": userMoney,
            });

            message.channel.send(`**Item Vendu** | Merci de votre vente ! Vous avez maintenant \`${userInfo.money + item.prixVente}\` <:ServerMoney:830718232293146645> !`)

            userInventory.splice(check, 1)
            client.updateUserInfo(message.member, {
              "users.$.inventory": userInventory,
            });
          } else if (userEntry.first().content.toLowerCase() === "non") {
            message.channel.send("**Vente Annulé !**")
          }
        } catch (e) {
          message.channel.send("**Vente Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
        };
      };


    } else {
      shop.map(e => {
        if (e.zone === "Volcan") {
          Shopembed.addField("\n" + "- **" + e.name + " - " + e.prix + "**" + "<:ServerMoney:830718232293146645>", e.description)
        };
      });
      Shopembed.setDescription(`**Noob :** BoNjOuR. VoIcI mOn MaGaSiN !\n**Petite Aide :** \`!shop buy <Item>\`\n\n${items.map(item => `${item}`).join('\n')}`);
      Shopembed.setFooter("Sous-Commande Disponible : Show - Buy - Sell");
      message.channel.send(Shopembed);
    };
  };
};


module.exports.help = {
  name: "shop",
  aliases: ['shop'],
  category: 'economy',
  description: "Ouvre le Magasin du Serveur",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: true
};