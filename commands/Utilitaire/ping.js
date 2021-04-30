module.exports.run = async (client, message, args) => {
    const msg = await message.channel.send("Pong !");
    msg.edit(
        `Pong! :ping_pong:
    **Latence du Bot :** ${msg.createdTimestamp - message.createdTimestamp}ms
    **Latende de L'API :** ${Math.round(client.ws.ping)}ms`
    )
};

module.exports.help = {
    name: "ping",
    aliases: ['ping'],
    category: 'utilitaire',
    description: "Renvois la latense de Golden Panda et de L'API de Discord",
    cooldown: 5,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    permission: 'Niveau 0 (Aucun)',
    type: '',
    args: false,
    profile: false
  };