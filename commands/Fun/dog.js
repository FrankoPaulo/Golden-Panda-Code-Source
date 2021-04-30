const fetch = require("node-fetch");
const { MessageEmbed } = require ("discord.js")

module.exports.run = async (client, message, args) => {
  const dog = await fetch("http://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(json => json.message);

  const embed = new MessageEmbed()
    .setAuthor("Waouf 🐶")
    .setImage(dog)
    .setFooter("Votre Meilleur companion (mieux que votre EX)");

  message.channel.send(embed)
};

module.exports.help = {
  name: "dog",
  aliases: ['dog', 'chien'],
  category: 'fun',
  description: "Commande qui envois une photo random de chien",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: false
};