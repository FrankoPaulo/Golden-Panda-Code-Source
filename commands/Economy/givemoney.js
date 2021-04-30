module.exports.run = async (client, message, args, userInfo) => {
  if (!userInfo) return message.channel.send(`<:Warning:766722345280208927> **L'utilisateur n'éxiste pas encore dans la Base de Donnée !**`)
  const user = message.author.username
  const getter = await client.getUser(message.guild.member(message.mentions.users.first()));
  const monnaie = parseInt(args[1]);
  if (monnaie <= 0) return message.channel.send(`:warning: **${user} vous ne pouvez pas donner de l'argent négatif ou nul !**`)
  if (userInfo.money < monnaie) return message.channel.send(`:warning: **${user} vous n'avez pas assez d'argent !**`)
  if (message.author.id == getter.id) return message.channel.send(`:warning: **${user} vous ne pouvez pas vous donner de l'argent à vous même !**`)

  if (getter && (!isNaN(monnaie))) {
    try {
      message.channel.send(`**Confirmez-vous Le Paiement de la somme de \`${monnaie}\` <:ServerMoney:830718232293146645> à l'utilisateur ${message.guild.member(message.mentions.users.first())} ?** (oui ou non)`)
      const filter = m => (message.author.id === m.author.id);
      const userEntry = await message.channel.awaitMessages(filter, {
        max: 1, time: 10000, errors: ['times']
      });

      if (userEntry.first().content.toLowerCase() === "oui") {
        const getterMoney = getter.money + monnaie;
        const giverMoney = userInfo.money - monnaie;

        client.updateUserInfo(message.member, {
          "users.$.money": giverMoney
        });
        client.updateUserInfo(getter, {
          "users.$.money": getterMoney
        });

        message.channel.send(`**Paiment Validé** | Votre transaction a été éffectué avec succès ! Il vous reste \`${userInfo.money - monnaie}\` <:ServerMoney:830718232293146645> !`)
      } else if (userEntry.first().content.toLowerCase() === "non") {
        message.channel.send(":gear: **Paiement Annulé !**")
      }
    } catch (e) {
      message.channel.send(":warning: **Paiement Annulé ! Merci de répondre avec \`oui\` ou \`non\` !**")
    }
  } else {
    message.channel.send(`:warning: **${user} merci de mentionner une personne et de donner un montant !**`)
  }
};

module.exports.help = {
  name: "givemoney",
  aliases: ['givemoney'],
  category: 'economy',
  description: "Permet de donner de la monnaie à un Utilisateur",
  cooldown: 3,
  usage: '<@Mention> <Nombre>',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: true
};