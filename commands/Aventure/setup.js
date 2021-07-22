const { Guild } = require("../../models/index");
// const { MessageButton, MessageActionRow } = require("discord-buttons")
const classes = require("../../assets/rpg/classes.json");

module.exports.run = async (client, message, args, userInfo) => {
  const settings = await client.getGuild(message.guild);
  if (userInfo && userInfo.class !== '') return message.channel.send(`<:Warning:840521136701833226> **${message.author.username} Tu Possède déjà une Fiche D'Aventure !**`);

  const q = args.join(" ");
  const position = classes.map(e => e.name.toLowerCase()).indexOf(q.toLowerCase());

  if (q && position == -1) message.channel.send(`<:Warning:840521136701833226> **${message.member} cette classe n'éxiste pas ! Veuillez choisir une classe valide !**`)


  if (q && position !== -1) {
    try {
      const classe = classes[position];
      message.channel.send(`**Voulez vous vraiment entrer dans le monde de Rasgart en temps que \`${classe.name}\`** (oui ou non)\n\n<:Warning:840521136701833226> **Choississez bien votre classe car le choix de celle-ci est définitif !**`)
      const filter = m => (message.author.id === m.author.id);
      const userEntry = await message.channel.awaitMessages(filter, {
        max: 1, time: 15000, errors: ['times']
      });

      if (userEntry.first().content.toLowerCase() === "oui") {
        message.channel.send(`**Vous venez d'entrer dans le monde de Rasgart en temps que \`${classe.name}\` !**\n**Vous pouvez maintenant check votre profil avec la commande \`${settings.prefix}profile\`**\n\n**Note :** Tant qu'un nouveau système de bataille n'est pas implémenté ou que les propriétés de l'intelligence et l'esprit apparaîssent, toute les classes ont les mêmes stats !`)
        if (!userInfo) {

          Guild.updateOne(
            { guildID: message.guild.id },
            {
              $push: {
                rpgData: {
                  id: message.member.id,
                  rpgID: Math.floor(Math.random() * 9999) * 0001,
                  attributs: {},
                  equipments: {
                    "Mh": "Aucun",
                    "Oh": "Aucun",
                    "Helmet": "Aucun",
                    "Chest": "Aucun",
                    "Gloves": "Aucun",
                    "Legs": "Aucun",
                    "Boots": "Aucun"
                  },
                  inventory: [],
                  kills: 0,
                  deaths: 0,
                  experience: 0,
                  level: 1,
                  money: 0,
                  goldencoins: 0,
                  class: "",
                  zone: "",
                  states: {
                    gameOver: false,
                    isBattling: false,
                    isDead: false,
                    isTraveling: false,
                    isWorking: false,
                    hasLeveledUp: false,
                    hasQuest: false,
                    hasWorked: false
                  },
                }
              },
            }
          )
        } else {
          client.updateUserInfo(message.member, {
            "users.$.class": classe.name,
            "users.$.attributs": classe.attributs,
            "users.$.zone": "Spawn"
          });
        }

      } else if (userEntry.first().content.toLowerCase() === "non") {
        message.channel.send(`:man_mage: **Je vois... tu n'est pas sûr de l'existance que tu veux... Hé bien si tu n'est pas sûr, reviens me voir plus tard quand tu te sera décidé !**`)
      }
    } catch (e) {
      message.channel.send(":man_mage: **Tu ne sais quoi prendre Aventurier ? Ce n'est pas grave... Reviens quand tu est sûr de ce que tu veux devenir !**");
      console.log(e);
    }

  } else {
  // const warrior = new MessageButton()
  //   .setStyle("gray")
  //   .setLabel("Guerrier")
  //   .setEmoji('⚔️')
  //   .setID("warrior_setup")

  // const tank = new MessageButton()
  //   .setStyle("gray")
  //   .setLabel("Tank")
  //   .setEmoji('🛡️')
  //   .setID("tank_setup")

  // const mage = new MessageButton()
  //   .setStyle("gray")
  //   .setLabel("Mage")
  //   .setEmoji('🧙')
  //   .setID("mage_setup")

  // const clerc = new MessageButton()
  //   .setStyle("gray")
  //   .setLabel("Clerc")
  //   .setEmoji('💓')
  //   .setID("clerc_setup")

  // const classRow = new MessageActionRow()
  //   .addComponent(warrior)
  //   .addComponent(tank)
  //   .addComponent(mage)
  //   .addComponent(clerc)

    // message.channel.send(`:man_mage: **Bonjour Aventurier !**\n\n**Bienvenue dans le monde de Rasgart ! Ce monde est composé de beaucoup de choses. Mais avant tout, tu dois choisir qui veux tu être dans ce monde...**`, { component: classRow })

    message.channel.send(`:man_mage: **Bonjour Aventurier !**\n\n**Bienvenue dans le monde de Rasgart ! Ce monde est composé de beaucoup de choses. Mais avant tout, tu dois choisir qui veux tu être dans ce monde...** (\`${settings.prefix}setup [nom de la classe])\`\n\n***Choix Possibles :*** \`${classes.map(e => `${e.name}`).join(" ・ ")}\``)
  }
};

module.exports.help = {
  name: "setup",
  aliases: ['setup'],
  category: 'aventure',
  description: "Permet de commencer votre aventure !",
  cooldown: 10,
  usage: '<Classe>',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: false
};