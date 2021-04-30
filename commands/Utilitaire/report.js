const { MessageEmbed} = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete();
  const reply = args.splice(0).join(' ');
  let member = message.author.username;

  if (args.length >= 0) {
      try {
          message.channel.send(`**Hey ${member} cher matelos !**\n**Tu essais d'envoyer un report ? Mais quel type de report tu veux envoyer ? Membre ou Bot ?**`)
          const filter = m => (message.author.id === m.author.id);
          const userEntry = await message.channel.awaitMessages(filter, {
            max: 1, time: 15000, errors: ['times']
          });
          const messages = await message.channel.messages.fetch({
              limit: 2
            });
  
          if (userEntry.first().content.toLowerCase() === "membre") {
              const Eventembed = new MessageEmbed()
              .setTitle(`**Nouveau Report de Membre !**`)
              .setColor('#B22222')
              .setDescription(`\n${reply}`)
              .setTimestamp()
              .setFooter (`${member}`, message.author.avatarURL());
          
              client.channels.cache.get('ID DU SALON').send(Eventembed)
              await message.channel.bulkDelete(messages)
          }
          else if (userEntry.first().content.toLowerCase() === "bot") {
              const Botembed = new MessageEmbed()
              .setTitle(`**Nouveau Report pour le Bot !**`)
              .setColor('#B22222')
              .setDescription(`\n${reply}`)
              .setTimestamp()
              .setFooter (`${member}`, message.author.avatarURL());
          
              client.channels.cache.get('ID DU SALON').send(Botembed)
              await message.channel.bulkDelete(messages)
          };
      } catch {
      message.channel.send("**Commande Annulé ! Merci de répondre la prochaine fois Matelos !**")
      };
  }; 
};

module.exports.help = {
  name: "report",
  aliases: ['report'],
  category: 'utilitaire',
  description: "Renvois un report d'un utilisateur ou d'un bug de Golden Panda",
  cooldown: 60,
  usage: '<Votre Report>',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: true,
  profile: false
};