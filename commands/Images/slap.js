const Command = require('../../main/command');
const Canvas = require('canvas');
const snek = require('snekfetch');

module.exports = class SlapCommand extends Command {
  constructor(main) {
    super(main, {
      name: "slap",
      category: "Image Generation",
      help: "Slap someone!",
      args: [
        {
          name: "Target",
          desc: "The target of the slap (he deserved it!)"
        }
      ],
      caseSensitive: true
    });
  }
  run(message, args, prefix) {
    snek.get("http://i.imgur.com/aEGb2tj.png").then(r => {
      const canvas = new Canvas(576, 300);
      const ctx = canvas.getContext('2d');
      const img_bg = new Canvas.Image();
      img_bg.onload = function () {
        if (message.mentions.members.first()) {
          let mentions = message.mentions.members.first();
          if (mentions.id == "184369428002111488") args = message.user.username;
          else args = mentions.displayName;
        } else {
          args = args.join(' ');
          if (args.toLowerCase() == "aister") args = message.author.username;
        }
        ctx.drawImage(img_bg, 0, 0, 576, 300);
        ctx.font = "bold 30px Arial";
        ctx.fillStyle = "white";
        let metrics = ctx.measureText(args);
        ctx.strokeStyle = "black";
        ctx.strokeText(args, 430 - metrics.width / 2, 130);
        ctx.fillText(args, 430 - metrics.width / 2, 130);
        message.channel.send("", {file: {attachment:canvas.toBuffer()}});
      };
      img_bg.src = r.body;
    });
  }
}