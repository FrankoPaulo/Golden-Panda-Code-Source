const { Guild, attributs, battle, experience, inventories, money, user } = require("../../models/index");
const classes = require("../../assets/rpg/classes.json");

module.exports.run = async (client, message, args, userInfo) => {
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
        message.channel.send(`**Vous venez d'entrer dans le monde de Rasgart en temps que \`${classe.name}\` !**\n**Vous pouvez maintenant check votre profil avec la commande \`${client.config.PREFIX}profile\`**\n\n**Note :** Tant qu'un nouveau système de bataille n'est pas implémenté ou que les propriétés de l'intelligence et l'esprit apparaîssent, toute les classes ont les mêmes stats !`)
        if (!userInfo) {
          // attributs.updateOne(
          //   { guildID: message.guild.id },
          //   {
          //     $push: {
          //       id: member.id,
          //       attributs: {}
          //     }
          //   }
          // ),
          // battle.updateOne(
          //   { GuildID: message.guild.id },
          //   {
          //     $push: {
          //       id: member.id,
          //       kills: 0,
          //       deaths: 0,
          //       isBattle: false
          //     }
          //   }
          // ),
          // experience.updateOne(
          //   { guildID: message.guild.id },
          //   {
          //     $push: {
          //       id: member.id,
          //       experience: 0,
          //       level: 1
          //     }
          //   }
          // ),
          // inventories.updateOne(
          //   { guildID: message.guild.id },
          //   {
          //     $push: {
          //       id: member.id,
          //       inventaire: [],
          //       equipement: {
          //         "Mh": "Aucun",
          //         "Oh": "Aucun",
          //         "Helmet": "Aucun",
          //         "Chest": "Aucun",
          //         "Gloves": "Aucun",
          //         "Legs": "Aucun",
          //         "Boots": "Aucun"
          //       }
          //     }
          //   }
          // ),
          // money.updateOne(
          //   { guildID: message.guild.id },
          //   {
          //     $push: {
          //       id: member.id,
          //       money: 0,
          //       eventcoins: 0
          //     }
          //   }
          // ),
          // user.updateOne(
          //   { guildID: message.guild.id },
          //   {
          //     $push: {
          //       id: member.id,
          //       class: "",
          //       zone: "Spawn",
          //       warnlevel: 0
          //     }
          //   }
          // )

          Guild.updateOne(
            { guildID: message.guild.id },
            {
              $push: {
                users: {
                  id: member.id,
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
                  isBattle: false,
                  experience: 0,
                  level: 1,
                  money: 0,
                  eventcoins: 0,
                  class: "",
                  zone: "Spawn",
                  warnlevel: 0
                }
              }
            }
          )
        } else {
          client.updateUserInfo(message.member, {
            "users.$.class": classe.name,
            "users.$.attributs": classe.attributs
          });
        }

      } else if (userEntry.first().content.toLowerCase() === "non") {
        message.channel.send(`:man_mage: **Je vois... tu n'est pas sûr de l'existance que tu veux... Hé bien si tu n'est pas sûr, reviens me voir plus tard quand tu te sera décidé !**`)
      }
    } catch (e) {
      message.channel.send(":man_mage: **Tu ne sais quoi prendre Aventurier ? Ce n'est pas grave... Reviens quand tu est sûr de ce que tu veux devenir !**")
    }

  } else {
    message.channel.send(`:man_mage: **Bonjour Aventurier !**\n\n**Bienvenue dans le monde de Rasgart ! Ce monde est composé de beaucoup de choses. Mais avant tout, tu dois choisir qui veux tu être dans ce monde...** (\`${client.config.PREFIX}setup [nom de la classe])\`\n\n***Choix Possibles :*** \`${classes.map(e => `${e.name}`).join(" ・ ")}\``);
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