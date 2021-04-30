const { createCanvas, loadImage } = require("canvas")
const { MessageAttachment } = require("discord.js")

module.exports.run = async (client, message, args, userInfo) => {
  const canvas = createCanvas(800, 333);
  const ctx = canvas.getContext("2d");
  const formule = parseInt(Math.pow(userInfo.level, 1.8) * 50 * 2);
  const background = await loadImage("./assets/image.png");
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#fff";
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = "#000";
  ctx.fillRect(120, 156, 550, 65);
  ctx.globalAlpha = 1;
  ctx.strokeRect(120, 156, 550, 65);

  ctx.fillStyle = "#0AEC11";
  ctx.globalAlpha = 0.5;
  ctx.fillRect(121, 156.5, (100 / (formule) * userInfo.experience) * 5.5, 63.7);

  ctx.globalAlpha = 1;
  ctx.fillStyle = "#fff";
  ctx.font = "30px Calibri"
  ctx.textAlign = "center";
  ctx.fillText(`${userInfo.experience} / ${formule}`, 400, 200)

  ctx.fillStyle = "#676F4A";
  ctx.font = "30px Cambria"
  ctx.fillText(message.member.user.tag, 385, 150)
  ctx.fillText(`Niveau : ${userInfo.level}`, 385, 120)
  ctx.fillText(`Classe : ${userInfo.class}`, 385, 250)
  ctx.fillText(`Xp avant Niveau Suivant : ${formule - userInfo.experience}`, 385, 30);

  const attachement = new MessageAttachment(canvas.toBuffer(), "exp.png")
  const msg = await message.channel.send(`**Loading**`)
  const msg2 = await msg.edit(`**Loading.**`) 
  const msg3 = await msg2.edit(`**Loading..**`)
  const msg4 = await msg3.edit(`**Loading...**`)
  msg4.edit(`**Loading Complete**`)
  message.channel.send(attachement)
};

module.exports.help = {
  name: "stats",
  aliases: ['stats', 'level'],
  category: 'aventure',
  description: "Permet de voir votre progression D'Experience",
  cooldown: 5,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  permission: 'Niveau 0 (Aucun)',
  type: '',
  args: false,
  profile: false
};