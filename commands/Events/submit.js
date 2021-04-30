const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
let eventrole = message.guild.roles.cache.find(r => r.name === "Créateur D'Event");
const user = message.member;
const author = message.author.username
const channelID = message.channel.id
const channelName = message.channel.name

if (!user.roles.cache.has(eventrole.id)) return message.author.send("<:Warning:766722345280208927> **Vous n'avez pas encore crée de Salon de Création !\nIl est impossible pour vous de publier votre projet en approbation !**")

if (user.roles.cache.has(eventrole.id)) {
  try {
    const Subembed = new MessageEmbed()
        .setTitle("**Un Nouveau Projet a été Publié !**")
        .setColor('FFA500')
        .setDescription(`Ce projet a été publié par ${author} !\n\n**ID du Salon :** ${channelID}\n**Nom du Salon :** #${channelName}`)

    message.channel.send(`**Voulez vous vraiment publier votre projet ?\nNotez bien que pour publier votre projet, vous devez y mettre les informations de l'Event et le Regex dans le salon !** (oui ou non)`)
    const filter = m => (message.author.id === m.author.id);
    const userEntry = await message.channel.awaitMessages(filter, {
      max: 1, time: 15000, errors: ['times']
    });

    if (userEntry.first().content.toLowerCase() === "oui") {
      message.author.send(`**Votre projet viens d'être publié avec succès ! Vous serez tenus au courent si le projet à été approuvé ou non par le staff et si vous pouvez l'organiser !**`)
      user.roles.remove(eventrole.id);
      message.channel.updateOverwrite(user, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        MANAGE_CHANNELS: false,
        MANAGE_PERMISSIONS: false,
    });

    client.channels.cache.get('ID DU SALON').send(Subembed)

    } else if (userEntry.first().content.toLowerCase() === "non") {
      message.channel.send(`**Publication annulé !**`)
    }
    } catch {
      message.channel.send("**Vous avez pris trop de temps pour vous décider. Commande Annulé !**")
   };
  };
};

module.exports.help = {
  name: "submit",
  aliases: ['submit'],
  category: 'events',
  description: "Permet de Publier votre Projet D'Event !",
  cooldown: 10,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0.5 (Créateur D\'Event)',
  type: '',
  args: false,
  profile: false
};