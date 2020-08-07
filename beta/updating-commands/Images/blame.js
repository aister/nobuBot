const Command = require('../../main/command');
const Canvas = require('canvas');
const snek = require('snekfetch');

module.exports = class BlameCommand extends Command {
  constructor(main) {
    super(main, {
      name: "blame",
      category: "Image Generation",
      help: "It's their fault, not mine. I'm sure!",
      args: [
        {
          name: "Target",
          desc: "The name of the victim. Can use mentions"
        }
      ],
      caseSensitive: true
    });

  }
  run(message, args, prefix) {
    snek.get('https://i.imgur.com/ZjZlp0T.png').then(r => {
      const canvas = new Canvas(500, 280);
      const ctx = canvas.getContext('2d');
      const img_bg = new Canvas.Image();
      ctx.font = "bold 18px Arial";
      if (message.mentions.members.first()) args = message.mentions.members.first().displayName;
      else args = args.join(' ');
      args = `I-it's your fault ${args}`.trim();
      args += '!';
      
      img_bg.onload = function () {
        ctx.drawImage(img_bg, 0, 0, 500, 280);
        const y = 260;
        const x = 250 - ctx.measureText(args).width / 2;
        ctx.lineWidth = 3;
        ctx.strokeText(args, x, y);
        ctx.fillStyle = "white";
        ctx.fillText(args, x, y);
        message.channel.send("", {file: {attachment: canvas.toBuffer()}});
      };
      img_bg.src = r.body;
    });
  }
}