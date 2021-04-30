module.exports = client => {
  console.log(`${client.user.tag} observe ${client.guilds.cache.map(g => g.memberCount).reduce((a,b) => a + b)} utlisateurs`);

  // Permet de crée une guild si celle-ci n'est pas dans la BDD et que le bot est présent dessus (la guild)
  const guild = [];
  client.guilds.cache.map(e => guild.push(e));
  guild.forEach(async g => {
    const data = await client.getGuild(g);
    if (!data) client.createGuild({ guildID: g.id })
  });

  let activities = ['Son Développement'], i = 0;

  setInterval(() => client.user.setPresence({ activity: { name: `${activities[i++ % activities.length]}`, type: 'STREAMING', url: 'https://www.twitch.tv/directory' } }), 10000);
}