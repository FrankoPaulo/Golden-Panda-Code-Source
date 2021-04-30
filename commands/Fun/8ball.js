module.exports.run = (client, message, args) => {
    const replies = ["Probablement Oui", "Probablement Non", "Je ne pense pas", "Cela se Pourrait bien", "Non !", "Oui !", "C'est sûr !", "Hélas non", "Il faudrais s'arrêter un moment !", "Non et Arrête !", "Je sais pas", "Je m'en fou en fait", "...", "Peut-être", "Hé ! Tu connais le radiateur ? Car moi je m'en fiche"];
    const response = Math.floor(Math.random() * replies.length)


message.channel.send(`:8ball: **${message.author.tag}**, ${replies[response]}`);
};

module.exports.help = {
    name: "8ball",
    aliases: ['8ball', '8b'],
    category: 'fun',
    description: "Commande qui répond avec une réponse aléatoire",
    cooldown: 4,
    usage: '<Votre Texte>',
    isUserAdmin: false,
    permissions: false,
    permission: 'Niveau 0 (Aucun)',
    type: '',
    args: true,
    profile: false
  };