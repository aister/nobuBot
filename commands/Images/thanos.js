const Command = require('../../main/command');
const Canvas = require('canvas');
const snek = require('snekfetch');

module.exports = class IWCommand extends Command {
  constructor(main) {
    super(main, {
      name: "thanos",
      category: "Image",
      args: [
        {
          name: "User Mention",
          desc: "Optional, will be the user himself if omitted"
        }
      ],
      help: "Were you Thanoshii'd?"
    })
  }
  run(message, args, prefix) {
    args = message.mentions.users.first() || message.author;
    message.guild.fetchMember(args).then(i => {
      let avatar = i.user.avatarURL.split('?')[0];
      if (this.main.util.rand(0, 1)) {
        snek.get(avatar).then(r => {
          const canvas = new Canvas(150, 150);
          const ctx = canvas.getContext('2d');
          const img_bg = new Canvas.Image();
          img_bg.onload = function () {
            ctx.drawImage(img_bg, 0, 0, 150, 150);
            let imgData = ctx.getImageData(30, 0, 120, 150);
            let data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
              let rnd = (90 - Math.floor(i / 4) % 120) / 90;
              if (Math.random() > rnd) data[i + 3] = 0;
            }
            ctx.putImageData(imgData, 30, 0);
            message.channel.send(`${i.displayName} has been turned into dust by Thanos!`, {file: {attachment:canvas.toBuffer()}});
          }
          img_bg.src = r.body;
        });
      } else message.channel.send(`${i.displayName} has survived the Thanoshii!`, {file: {attachment:avatar}});
    });
  }
}
