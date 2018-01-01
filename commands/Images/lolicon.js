const Command = require('../../main/command');
const Canvas = require('canvas');
const snek = require('snekfetch');

module.exports = class LoliconCommand extends Command {
  constructor(main) {
    super(main, {
      name: "lolicon",
      category: "Image Generation",
      help: "Oniichan, are you a lolicon?"
    });

  }
  run(message, args, prefix) {
    snek.get("https://i.imgur.com/ulQiHQO.png").then(r => {
      const canvas = new Canvas(617, 319);
      const ctx = canvas.getContext('2d');
      const img_bg = new Canvas.Image();
      img_bg.onload = function () {
        ctx.drawImage(img_bg, 0, 0, 617, 319);
        ctx.font = "bold 30px Arial";
        args = message.author.username;
        ctx.fillText(args, 300 - ctx.measureText(args).width / 2, 150);
        message.channel.send("", {file: {attachment:canvas.toBuffer()}});
      };
      img_bg.src = r.body;
    });
  }
}
