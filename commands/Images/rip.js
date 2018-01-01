const Command = require('../../main/command');
const Canvas = require('canvas');
const snek = require('snekfetch');

module.exports = class RipCommand extends Command {
  constructor(main) {
    super(main, {
      name: "rip",
      category: "Image Generation",
      help: "Rest in Peace",
      args: [
        {
          name: "Text",
          desc: "The text to put in the image"
        }
      ],
      caseSensitive: true
    });
  }
  run(message, args, prefix) {
    snek.get("http://cliparts.co/cliparts/pi7/8ok/pi78okjMT.png").then(r => {
      const canvas = new Canvas(504, 594);
      const ctx = canvas.getContext('2d');
      const img_bg = new Canvas.Image();
      img_bg.onload = function () {
        ctx.drawImage(img_bg, 0, 0, 504, 594);
        ctx.font = "bold 40px Arial";
        args = args.join(' ') || message.author.username;
        ctx.fillText(args, 237 - ctx.measureText(args).width / 2, 330);
        ctx.font = "bold 30px Arial";
        ctx.fillText(`???? - ${(new Date()).getFullYear()}`, 160, 380);
        message.channel.send("", {file: {attachment:canvas.toBuffer()}});
      };
      img_bg.src = r.body;
    });
  }
}