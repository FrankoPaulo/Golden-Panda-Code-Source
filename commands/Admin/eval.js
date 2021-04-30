const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  function clean(text) {
    if (typeof text === "string") 
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
 
  const error = new MessageEmbed()
  .setTitle("<:Warning:766722345280208927> **Erreur de Permission**")
  .setColor("#870606")
  .setDescription(`**Vous avez pas les permissions requises pour effectuer la commande \`Eval\`**\n\n**Niveau/Type de Permission Requises :** Niveau 5 (Propriétaire)\n**Permission Requise :** \`ADMINISTRATOR\``)
  .setTimestamp()
  .setFooter(message.author.username, message.author.avatarURL())

  if (message.author.id !== "550251727698264064") return message.channel.send(error)
  const code = args.join(" ");
  const evaled = eval(code);
  const cleanCode = await clean(evaled);
  message.channel.send(cleanCode, { code: "js" });
};
 
module.exports.help = {
  name: "eval",
  aliases: ['eval', 'ev'],
  category: 'admin',
  description: "Renvoie un code javascript testé",
  cooldown: 10,
  usage: '<Code to Test>',
  isUserAdmin: false,
  permissions: true,
  permission: 'Niveau 5 (Propriétaire)',
  type: 'ADMINISTRATOR',
  args: true,
  profile: false
};