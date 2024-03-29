const mongoose = require("mongoose");
const { Guild } = require("../models/index");

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




  client.createUserProfile = (member, guild) => {
    Guild.updateOne(
      { guildID: guild.id },
      {
        $push: {
          users: {
            id: member.id,
            rpgID: randomRPGID,
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
        }
      }
    )
      .then(console.log("Nouveau Profil Crée !"))
  };

  client.updateUserInfo = (member, options = {}) => {
    const guild = Guild.findOne({ guildID: member.guild.id })
    guild.updateOne(
      { "users.id": member.id },
      { $set: options }
    ).then(c => console.log(c))
  };

  client.createMissingInfoOnUser = (member, missingInfo, guild = {Guild}) => {
    guild.updateOne({ "users.id": member.id }, { $set: missingInfo }).then();
  };




};