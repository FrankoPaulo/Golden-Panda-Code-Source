const fetch = require("node-fetch");
const { MessageEmbed } = require ("discord.js")

module.exports.run = async (client, message, args) => {
  const fox = await fetch("http://randomfox.ca/floof")
    .then(res => res.json())
    .then(json => json.image);

  const embed = new MessageEmbed()
    .setAuthor("*Bruit de Renard* 🦊")
    .setImage(fox)
    .setFooter("Mais... Que dit le Renard ?");

  message.channel.send(embed)
};

module.exports.help = {
  name: "fox",
  aliases: ['fox', 'renard'],
  category: 'fun',
  description: "Commande qui envois une photo random de renard",
  cooldown: 3,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: false
};