const { MessageEmbed } = require("discord.js");
const { capitalize } = require("../../functions/string");

module.exports.run = async (client, message, args, userInfo) => {
  const shop = require("../../assets/shop/shop.json");
  const q = args.slice(1).join(" ");
  const position = shop.map(e => e.name.toLowerCase()).indexOf(q.toLowerCase());
  const item = shop[position];
  const user = message.author.username

  if (userInfo.isBattle === true) return message.channel.send(`${message.member} **Tu peux pas check ton inventaire en combat !**`);
  if (!args.length) {
    const Invembed = new MessageEmbed()
      .setAuthor(`Inventaire de ${message.author.username}`, message.author.displayAvatarURL())
      .setColor('#f2ae12')
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL())
      .addField("**Inventaire :**", userInfo.inventory.join(" ・ ") || "**Votre Inventaire est Vide !** :spider_web:")

    message.channel.send(Invembed);
  }


  if (args[0] == "show") {
    if (q && position == -1) message.channel.send(`:warning: **${user} cet objet n'éxiste pas ! Vérifiez si celui-ci se trouve encore dans votre inventaire ou vérifiez l'ortographe de celui-ci !**`)

    const Showembed = new MessageEmbed()
      .setTitle(`**Nom de L'Item :** ${item.name} | **Type D'Item :** ${item.type}`)
      .setColor(item.color)
      .setThumbnail(item.icon)
      .setDescription(`${item.description}`)
      .addFields(
        {name: "__**Rareté**__", value: `${item.rarity ? item.rarity : "Pas de Rareté !"}`, inline: true},
        {name: "__**Niveau Requis**__", value: `${item.requireLevel ?`\n**Niveau ${item.requireLevel}**` : "Pas de Niveau Requis"}`, inline: true},
        {name: '__**Stats Données**__', value: `${item.attributs ? Object.entries(item.attributs).map(([key, value]) => `**${capitalize(key)}**: ${value}`).join("\n ") : "Cet Item ne donne Rien !"}`, inline: true},
        {name: "__**Prix Achat**__", value: `${item.prix ? `${item.prix} <:ServerMoney:830718232293146645>` : "**Cet Item ne peux pas être Acheté !**"}`, inline: true},
        {name: "__**Prix Vente**__", value: `${item.prixVente ? `${item.prixVente} <:ServerMoney:830718232293146645>` : "**Cet Item ne peux pas être Vendu !**"}`, inline: true},
        {name: '\u200b', value: `\u200b`, inline: true},
        {name: "__**Chance de Loot**__", value: `${item.lootChance ? `${item.lootChance}` : "Cet Item ne se Loot pas !"}`, inline: true},
        {name: "__**Loot Par...**__", value: `${item.lootFrom ? `${item.lootFrom}` : "Aucun Mob ne Loot cet Item !"}`, inline: true},
        {name: '\u200b', value: `\u200b`, inline: true}
      )

    message.channel.send(Showembed)
  };

};

module.exports.help = {
  name: "inventaire",
  aliases: ['inventaire', 'inventory', 'inv', 'i'],
  category: 'aventure',
  description: "Permet de visualiser votre Inventaire",
  cooldown: 5,
  usage: '[@Mention]',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: true
};