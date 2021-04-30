const fetch = require("node-fetch");
const { MessageEmbed } = require ("discord.js")

module.exports.run = async (client, message, args) => {
  const bird = await fetch("https://some-random-api.ml/animal/birb")
    .then(res => res.json())
    .then(json => json.image);

  const embed = new MessageEmbed()
    .setAuthor("Oh... ce n'est pas un avion ! c'est un oiseau !")
    .setImage(bird)
    .setFooter("I believe i can fly yeeeee");

  message.channel.send(embed)
};

module.exports.help = {
  name: "bird",
  aliases: ['bird', 'oiseau'],
  category: 'fun',
  description: "Commande qui envois une photo random d'oiseau",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: false
};