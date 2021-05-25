const { capitalize } = require("../../functions/string");
const getItemInfo = require("../../assets/shop/shop.json")

module.exports.run = async (client, message, args, userInfo) => {
  const author = message.author.username
  const q = args.join(" ");
  const userEquipments = userInfo.equipments;
  const userInventory = userInfo.inventory;

  if (userInventory.length > 15) return message.channel.send(`<:Warning:840521136701833226> **${message.member} votre inventaire est plein !**`)
  if (userInfo.isBattle === true) return message.channel.send(`${message.member} **Tu peux pas te déséquipper en combat !**`);
  const itemInfoPosition =  getItemInfo.map(e => e.name).indexOf(capitalize(q));

  if (userEquipments[getItemInfo[itemInfoPosition].type] !== capitalize(q)) return message.channel.send(`<:Warning:840521136701833226> **${author} vous n'avez pas cet objet d'équipé !**`)

  message.channel.send(`**${author} vous avez bien déséquipé ${q}**`)
  userEquipments[getItemInfo[itemInfoPosition].type] = "Aucun"
  userInventory.push(q)
  client.updateUserInfo(message.member, {
    "users.$.equipments": userEquipments,
    "users.$.inventory": userInventory
  });
};

module.exports.help = {
  name: "unequip",
  aliases: ['unequip'],
  category: 'aventure',
  description: "Permet d'enlever un objet équipé dans votre Arsenal",
  cooldown: 3,
  usage: '<Objet>',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  permissionType: '',
  args: true,
  profile: true
};