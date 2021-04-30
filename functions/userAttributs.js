const getItemInfo = require("../assets/shop/shop.json");

const calculateUserAttributs = async (client, message) => {
  const userInfo = await client.getUser(message.member);

  const userAttributs = userInfo.attributs;
  const userEquipments = userInfo.equipments;

  for (const property in userEquipments) {
    if (userEquipments[property] == 'Aucun') continue;

    const itemInfoPosition = getItemInfo
    .map(e => e.name)
    .indexOf(userEquipments[property]);
    const itemAttributs = getItemInfo[itemInfoPosition].attributs;

    for (attributs in itemAttributs) {
      switch (attributs) {
        case "attaque":
          userAttributs.attaque += itemAttributs[attributs];
          break;
        case "defense":
          userAttributs.defense += itemAttributs[attributs];
          break;
        case "esprit":
          userAttributs.esprit += itemAttributs[attributs];
          break;
        case "inteligence":
          userAttributs.inteligence += itemAttributs[attributs];
          break;
      }
    }
  }

  return userAttributs
};


module.exports = {
  calculateUserAttributs,
}