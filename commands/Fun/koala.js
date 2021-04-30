const fetch = require("node-fetch");
const { MessageEmbed } = require ("discord.js")

module.exports.run = async (client, message, args) => {
  const koala = await fetch("https://some-random-api.ml/animal/koala")
    .then(res => res.json())
    .then(json => json.image);

  const embed = new MessageEmbed()
    .setAuthor("Hmmm... Is this a Koala ?")
    .setImage(koala)
    .setFooter("Il est mignon ce ptit bonhomme");

  message.channel.send(embed)
};

module.exports.help = {
  name: "koala",
  aliases: ['koala'],
  category: 'fun',
  description: "Commande qui envois une photo random de koala",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: false
};