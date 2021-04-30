const fetch = require("node-fetch");
const { MessageEmbed } = require ("discord.js")

module.exports.run = async (client, message, args) => {
  const panda = await fetch("https://some-random-api.ml/animal/panda")
    .then(res => res.json())
    .then(json => json.image);

  const embed = new MessageEmbed()
    .setAuthor("Oh look ! A Panda 🐼")
    .setImage(panda)
    .setFooter("Ma Qu'il est mignon !");

  message.channel.send(embed)
};

module.exports.help = {
  name: "panda",
  aliases: ['panda'],
  category: 'fun',
  description: "Commande qui envois une photo random de panda",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: false
};