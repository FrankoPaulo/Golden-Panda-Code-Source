module.exports = async (client, guild) => {
 await client.createGuild({guildID: guild.id});
}