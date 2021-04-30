module.exports.run = async (client, message, args, userInfo) => {
message.channel.send("**En Développement !**")
};

module.exports.help = {
  name: "story",
  aliases: ['story', 'histoire'],
  category: 'aventure',
  description: "Le Mode Histoire du RPG",
  cooldown: 10,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: true
};