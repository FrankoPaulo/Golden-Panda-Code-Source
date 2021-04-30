const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, userInfo) => {
message.delete();
if (userInfo.eventcoins < 100) return message.author.send(`<:Warning:766722345280208927> **Vous n'avez pas assez de Event Coins pour crée votre propre Event !**\n\n**Votre Balance actuelle :** ${userInfo.eventcoins} <:EventCoin:766726888915075142>  -  **Requis :** 100 <:EventCoin:766726888915075142>`)

let eventrole = message.guild.roles.cache.find(r => r.name === "Créateur D'Event");
let noeventrole = message.guild.roles.cache.find(r => r.name === "Interdiction Event");
const author = message.author.username
const user = message.member;
const CID = "814197000626372638";
// 814197000626372638 - 753700515925327953
const everyone = message.guild.roles.everyone;
const prix = userInfo.eventcoins - 100

if (user.roles.cache.has(eventrole.id)) return message.author.send("<:Warning:766722345280208927> **Tu peux pas avoir 2 Salles de Création en même temps !**")
if (user.roles.cache.has(noeventrole.id)) return message.author.send("<:Warning:766722345280208927> **Tu ne peux pas créé D'Event car tu as une Interdiction !**")
await user.roles.add(eventrole.id);

const CreateEmbed = new MessageEmbed()
    .setTitle(`Bienvenue dans votre salon de création ${author}`)
    .setColor('#f2ae12')
    .setDescription(`\n**Avant de commencer !**\n\nSachez que il vous faudra crée un regex ! Mais qu'est-ce qu'un regex ? Vous avez votre réponse avec la commande \`?regex\`.\nSi vous avez des questions sur la réalisation de l'event ou des problèmes technique, veuillez Crée un Ticket et dites nous votre soucis avec le hastag \`#event\` !\nSi vous avez finit, veuillez taper la commande \`${client.config.PREFIX}submit\`\n\nBonne Réalisation ^^`)


    client.updateUserInfo(user, {
        "users.$.eventcoins": prix
      });
const channel = await message.guild.channels.create("room-" + author, {type: 'text', parent: message.guild.channels.cache.get(CID)});
channel.updateOverwrite(user, {
    VIEW_CHANNEL: true,
    SEND_MESSAGES: true,
    MANAGE_CHANNELS: true,
    MANAGE_PERMISSIONS: true,
});
channel.updateOverwrite(everyone, {
    VIEW_CHANNEL: false,
});

await message.author.send(CreateEmbed);


};

module.exports.help = {
    name: "create",
    aliases: ['create'],
    category: 'events',
    description: "Permet de Crée un Salon de Création D'Event",
    cooldown: 10,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    permission: 'Niveau 0 (Aucun)',
    type: '',
    args: false,
    profile: false
  };