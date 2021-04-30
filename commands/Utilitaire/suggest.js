const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
    message.delete()
    const reply = args.splice(0).join(' ')
    let member = message.author.username

    if (args.length >= 0) {
        try {
            message.channel.send(`**Hey ${member} cher matelos !**\n**Tu essais d'envoyer une suggestion ? Mais tu voudrais envoyer quel type de suggetion ? Event, Bot ou Serveur ?**`)
            const filter = m => (message.author.id === m.author.id);
            const userEntry = await message.channel.awaitMessages(filter, {
              max: 1, time: 15000, errors: ['times']
            });
            const messages = await message.channel.messages.fetch({
                limit: 2
              });
    
            if (userEntry.first().content.toLowerCase() === "event") {
                const Eventembed = new MessageEmbed()
                .setTitle(`**Nouvelle Suggestion D'Event**`)
                .setColor('RANDOM')
                .setDescription(`\n${reply}`)
                .setTimestamp()
                .setFooter (`${member}`, message.author.avatarURL());
            
                client.channels.cache.get('ID DU SALON').send(Eventembed).then(async m => {
                    m.react(message.guild.emojis.cache.get('ID DE L\'EMOTE'))
                    m.react(message.guild.emojis.cache.get('ID DE L\'EMOTE'))
                })
                await message.channel.bulkDelete(messages)
            }
            else if (userEntry.first().content.toLowerCase() === "bot") {
                const Botembed = new MessageEmbed()
                .setTitle(`**Nouvelle Suggestion pour le Bot**`)
                .setColor('RANDOM')
                .setDescription(`\n${reply}`)
                .setTimestamp()
                .setFooter (`${member}`, message.author.avatarURL());
            
                client.channels.cache.get('ID DU SALON').send(Botembed).then(async m => {
                    m.react(message.guild.emojis.cache.get('ID DE L\'EMOTE'))
                    m.react(message.guild.emojis.cache.get('ID DE L\'EMOTE'))
                })
                await message.channel.bulkDelete(messages)
            }
            else if (userEntry.first().content.toLowerCase() === "serveur") {
                const Serveurembed = new MessageEmbed()
                .setTitle(`**Nouvelle Suggestion pour le Serveur**`)
                .setColor('RANDOM')
                .setDescription(`\n${reply}`)
                .setTimestamp()
                .setFooter (`${member}`, message.author.avatarURL());
            
                client.channels.cache.get('ID DU SALON').send(Serveurembed).then(async m => {
                    m.react(message.guild.emojis.cache.get('ID DE L\'EMOTE'))
                    m.react(message.guild.emojis.cache.get('ID DE L\'EMOTE'))
                })
                await message.channel.bulkDelete(messages)
            };
        } catch {
        message.channel.send("**Commande Annulé ! Merci de répondre la prochaine fois Matelos !**")
        };
        
    }; 
};

module.exports.help = {
    name: "suggest",
    aliases: ['suggest'],
    category: 'utilitaire',
    description: "Permet de donner une suggestion d'event, pour le bot ou pour le serveur !",
    cooldown: 30,
    usage: '<Votre Suggestion>',
    isUserAdmin: false,
    permissions: false,
    permission: 'Niveau 0 (Aucun)',
    type: '',
    args: true,
    profile: false
  };