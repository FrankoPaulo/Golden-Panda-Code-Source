const fetch = require("node-fetch");
const { MessageEmbed } = require ("discord.js")

module.exports.run = async (client, message, args) => {
  const cat = await fetch("http://aws.random.cat/meow")
    .then(res => res.json())
    .then(json => json.file);

  const embed = new MessageEmbed()
    .setAuthor("Meow 🐱")
    .setImage(cat)
    .setFooter("You're a Cat lover Huh ?");

  message.channel.send(embed)
};

module.exports.help = {
  name: "cat",
  aliases: ['cat', 'chat'],
  category: 'fun',
  description: "Commande qui envois une photo random de chat",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: false
};