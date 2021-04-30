const { MessageEmbed } = require("discord.js");
const { calculateUserAttributs } = require("../../functions/userAttributs");
const { capitalize } = require("../../functions/string");
const classes = require("../../assets/rpg/classes.json");

module.exports.run = async (client, message, args, userInfo) => {
  const author = message.author.username

  if (!userInfo && userInfo.class == "") return message.channel.send(`:warning: **${author} Tu n'as pas encore crée ta fiche ! Pour la crée, veuillez faire \`${client.config.PREFIX}setup\` !**`)

  const position = classes.map(e => e.name.toLowerCase()).indexOf(userInfo.class.toLowerCase());
  const userAttributs = await calculateUserAttributs(client, message);
  const classe = classes[position];

  if (!args.length) {
    const Classembed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
      .setTitle(`**Fiche Personnage de ${message.author.username}**`)
      .setColor('#f2ae12')
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL())
      .setThumbnail(classe.icon)
      /* **Description :** ${userInfo == '' ? userInfo.description : classe.description} */
      .setDescription(`\n**Classe :** ${userInfo.class}\n**Zone :** ${userInfo.zone}\n**Progression :** __*Coming Soon !*__\n**Jobs :** __*Coming Soon !*__`)
      .addField(`__***Personnage***__`, `**Niveau :** ${userInfo.level}\n**Exp :** ${userInfo.experience} <:XP:830717484406669332>\n**Coins :** ${userInfo.money} <:ServerMoney:830718232293146645>\n**EventCoins :** ${userInfo.eventcoins} <:EventCoins:830718231945674763>\n**Kills :** ${userInfo.kills} :crossed_swords: \n**Deaths :** ${userInfo.deaths} :skull: `, true)
      .addFields(
        { name: "__***Stats***__", value: `${Object.entries(userAttributs).map(([key, value]) => `**${capitalize(key)}**: ${value}`).join("\n")}`, inline: true },
        { name: "__***Equipement***__", value: `${Object.entries(userInfo.equipments).map(([key, value]) => `**${capitalize(key)}**: ${value}`).join("\n")}`, inline: true }
      )
      .setFooter(`Id : ${userInfo.id}`)

    message.channel.send(Classembed);
  };

  if (args[0] === "config") {
    // try {
    //   message.channel.send(`Hey ${message.author.username} ! Dit moi, que voudrais tu configurer ? (description)`)
    //   const filter = m => (message.author.id === m.author.id);
    //   const userEntry = await message.channel.awaitMessages(filter, {
    //     max: 1, time: 15000, errors: ['times']
    //   });

    //   if (userEntry.first().content.toLowerCase() === "description") {
    //     message.channel.send("**Ecrivez la description que vous voulez...**")
    //     const userEntry = await message.channel.awaitMessages(filter, {
    //       max: 200, time: 30000, errors: ['times']
    //     });
    //     if (userEntry === '') return message.channel.send(`**${author} si tu veux changer ta description, il faut me dire quoi comme description !**`)
    //     if (userEntry.length <= 1) return message.channel.send(`**${author} tu ne peux pas avoir une description vide**`)
    //     if (userEntry.length >= 200) return message.channel.send(`**${author} ta description dois faire moins de 200 Caractères !**`)

    //     message.channel.send("**Votre description a été changé !**")

    //     client.updateUserInfo(message.member, {
    //       "users.$.description": userEntry,
    //     });
    //   }
    // } catch {
    //   message.channel.send("**Modifcation Annulé !**")
    // }
  }
}

module.exports.help = {
  name: "profile",
  aliases: ['profile', 'profil', 'p'],
  category: 'aventure',
  description: "Ouvre votre fiche d'aventure ou celle d'un utilisateur",
  cooldown: 5,
  usage: '[@Mention]',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: true
};