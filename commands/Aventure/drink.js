const { calculateUserAttributs } = require("../../functions/userAttributs");
const { capitalize } = require("../../functions/string");
const classes = require("../../assets/rpg/classes.json");
const getItemInfo = require("../../assets/shop/shop.json")

module.exports.run = async (client, message, args, userInfo) => {
  const playerStats = await calculateUserAttributs(client, message);
  const player = await client.getUser(message.member)
  const q = args.join(" ");
  const userEquipments = userInfo.equipments;
  const userInventory = userInfo.inventory;
  const userInventoryItemPosition = userInventory.indexOf(capitalize(q));
  const position = classes.map(e => e.name).indexOf(player.class);
  const classe = classes[position];


  if (player.isBattle === true) return message.channel.send(`${message.member} **Tu peux pas te soigner en combat !**`);
  if (!args.length) return message.channel.send(`:warning: **${message.member} vous ne pouvez pas vous soigner avec rien ! Achetez une Potion de Soin !**`)
  if (userInventoryItemPosition == -1) return message.channel.send(`:warning: **${message.member} vous ne possédez pas cet objet dans votre Inventaire ou alors vérifiez son orthographe !**`)

  const itemInfoPosition = getItemInfo.map(e => e.name).indexOf(capitalize(q));
  const item = getItemInfo[itemInfoPosition];

  if (item.type !== "Consumable") return message.channel.send(`:warning: **${message.member} vous ne pouvez pas consommer cet objet !**`)

  if (item.name == "Potion de Soin") {
    const userStats = classe.attributs;
    userStats["hp"] = playerStats.hp = 50;
    message.channel.send(`**${message.member} vous avez bien été soignée en utilisant la potion de soin !**`)
    userEquipments[getItemInfo[itemInfoPosition].type] = userInventory[userInventoryItemPosition]
    userInventory.splice(userInventoryItemPosition, 1)
    client.updateUserInfo(message.member, {
      "users.$.attributs": userStats,
      "users.$.inventory": userInventory
    });
  };
  
  if (item.name == "Potion d'Experience") {
    const randomExp = Math.floor(Math.random() * 1000) + 100;
    player.experience += randomExp
    
    message.channel.send(`**${message.member} vous sentez un puissant flux magique dans l'air !\nVous gagnez ${randomExp} pts d'experience !**`)
    userEquipments[getItemInfo[itemInfoPosition].type] = userInventory[userInventoryItemPosition]
    userInventory.splice(userInventoryItemPosition, 1)
    client.updateUserInfo(message.member, {
      "users.$.experience": player.experience,
      "users.$.inventory": userInventory
    });
  }
};

module.exports.help = {
  name: "drink",
  aliases: ['drink'],
  category: 'aventure',
  description: "Permet de se consommer différentes potions",
  cooldown: 2,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: true
};