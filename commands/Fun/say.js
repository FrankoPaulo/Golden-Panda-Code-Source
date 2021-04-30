const { MessageEmbed } = require("discord.js")

module.exports.run = (client, message, args) => {
    
    const reply = args.splice(0).join(' ')
    
    const Sayembed = new MessageEmbed()
    .setTitle("**Commande Say**")
    .setColor('RANDOM')
    .setDescription(`**${reply}**`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    message.channel.send(Sayembed)
    message.delete()
    
};

module.exports.help = {
    name: "say",
    aliases: ['say'],
    category: 'fun',
    description: "Permet de répéter un message envoyé dans un embed",
    cooldown: 3,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    permission: 'Niveau 0 (Aucun)',
    type: '',
    args: false,
    profile: false
  };