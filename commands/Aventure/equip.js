const { capitalize } = require("../../functions/string");
const getItemInfo = require("../../assets/shop/shop.json")

module.exports.run = async (client, message, args, userInfo) => {
  const author = message.author.username
  const q = args.join(" ");
  const userEquipments = userInfo.equipments;
  const userInventory = userInfo.inventory;
  const userInventoryItemPosition = userInventory.indexOf(capitalize(q));

  if (userInfo.isBattle === true) return message.channel.send(`${message.member} **Tu peux pas t'équiper en combat !**`);
  if (userInventoryItemPosition == -1) return message.channel.send(`:warning: **${author} vous ne possédez pas cet objet dans votre Inventaire ou alors vérifiez son orthographe !**`)

  const itemInfoPosition = getItemInfo.map(e => e.name).indexOf(capitalize(q));
  const item = getItemInfo[itemInfoPosition];

  if (item.type == "Loot") return message.channel.send(`:warning: **${author} vous ne pouvez pas équiper cet objet !**`)
  if (item.type == "Consumable") return message.channel.send(`:warning: **${author} vous ne pouvez pas équiper cet objet !**`)
  //if (userEquipments !== "Aucun") return message.channel.send(`:warning: **${author} vous devez d'abord déséquipper le slot voulue !**`)

  message.channel.send(`**${author} vous avez bien équipé ${q}**`)
  userEquipments[getItemInfo[itemInfoPosition].type] = userInventory[userInventoryItemPosition]
  if (userEquipments !== "Aucun") {
    userInventory.push(userEquipments)
  };
  userInventory.splice(userInventoryItemPosition, 1)
  client.updateUserInfo(message.member, {
    "users.$.equipments": userEquipments,
    "users.$.inventory": userInventory
  });
};

module.exports.help = {
  name: "equip",
  aliases: ['equip'],
  category: 'aventure',
  description: "Permet d'équiper un objet présent dans votre Inventaire",
  cooldown: 3,
  usage: '<Objet>',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: true,
  profile: true
};