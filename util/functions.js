const mongoose = require("mongoose");
const { Guild, attributs, battle, experience, inventories, money, user } = require("../models/index");

module.exports = async client => {
  client.createGuild = async guild => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild)
    const createGuild = await new Guild(merged);
    createGuild.save().then(g => console.log(`Nouveau Serveur enregistré !`));
  };

  client.getGuild = async guild => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
  };

  client.updateGuild = async (guild, settings) => {
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };



  client.getUser = async member => {
    const data = await client.getGuild(member.guild);
    const position = data.users.map(e => e.id).indexOf(member.id);
    return data.users[position];
  };

  /*A Faire plus tard (Refonte BDD)*/
  // client.createUserStats = async member => {
  //   const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, member)
  //   const createAttributs = await new attributs(merged);
  //   createAttributs.save()
  //   const createBattles = await new battle(merged);
  //   createBattles.save()
  //   const createExperience = await new experience(merged);
  //   createExperience.save()
  //   const createInventories = await new inventories(merged);
  //   createInventories.save()
  //   const createMoney = await new money(merged);
  //   createMoney.save()
  //   const createUser = await new user(merged);
  //   createUser.save() 
  // };

  // client.getUserAttributs = async member => {
  //   const data = await attributs.findOne({ attributs: member.id });
  //   if (data) return data;
  // };



  client.createUserProfile = (member, guild) => {
    Guild.updateOne(
      { guildID: guild.id },
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
      // attributs.updateOne(
      //   { guildID: guild.id },
      //   {
      //     $push: {
      //       id: member.id,
      //       attributs: {}
      //     }
      //   }
      // ),
      // battle.updateOne(
      //   { GuildID: guild.id },
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
      //   { guildID: guild.id },
      //   {
      //     $push: {
      //       id: member.id,
      //       experience: 0,
      //       level: 1
      //     }
      //   }
      // ),
      // inventories.updateOne(
      //   { guildID: guild.id },
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
      //   { guildID: guild.id },
      //   {
      //     $push: {
      //       id: member.id,
      //       money: 0,
      //       eventcoins: 0
      //     }
      //   }
      // ),
      // user.updateOne(
      //   { guildID: guild.id },
      //   {
      //     $push: {
      //       id: member.id,
      //       class: "",
      //       zone: "Spawn",
      //       warnlevel: 0
      //     }
      //   }
      // )
      .then(console.log("Nouvelle Utilisateur Enregistré !"))
};

client.updateUserInfo = (member, options = {}) => {
  Guild.updateOne(
    { "users.id": member.id },
    { $set: options }
  ).then(c => console.log(c))
};

client.createMissingInfoOnUser = (member, missingInfo = {}) => {
  Guild.updateOne({ "users.id": member.id }, { $set: missingInfo }).then();
};


};