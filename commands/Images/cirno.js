const Command = require('../../main/command');
const Canvas = require('canvas');
const snek = require('snekfetch');
const Constants = require('../../main/const');

module.exports = class CirnoCommand extends Command {
  constructor(main) {
    super(main, {
      name: "cirno",
      category: "Image Generation",
      help: "Post a cirno image with the text",
      args: [
        {
          name: "Sprite",
          desc: `Available sprite: ${Array.from(Constants.cirno.keys())}`
        },
        {
          name: "Text",
          desc: "The text to put in the image"
        }
      ],
      caseSensitive: true
    });

  }
  run(message, args, prefix) {
    if (!args) message.channel.send(`Error: No argument found. Please consult \`${prefix}help cirno\` for more information.`);
    else if (!Constants.cirno.has(args[0].toLowerCase())) message.channel.send(`Error: Sprite not found. Please consult \`${prefix}help cirno\` for more information.`);
    else {
      let cirno = Constants.cirno.get(args[0].toLowerCase());
      args = args.slice(1);
      snek.get(cirno).then(r => {
        const canvas = new Canvas(700, 300);
        const ctx = canvas.getContext('2d');
        const img_bg = new Canvas.Image();
        img_bg.onload = function () {
          ctx.drawImage(img_bg, 0, 0, 700, 300);
          ctx.font = "bold 25px Arial";

          const x = 350;
          let y = 0;

          const maxWidth = 330;
          const lineHeight = 30;
          const lines = [];
          let line = '';

          args.forEach(item => {
            let testLine = line + item + ' ';
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
              lines.push(line);
              line = item + ' ';
              y += lineHeight;
            }
            else {
              line = testLine;
            }
          });
          lines.push(line);
          y += lineHeight;
          y = ( 300 - y ) / 2;
          lines.forEach((line, i) => {
            ctx.fillText(line.trim(), x, y + (i + 1)*lineHeight);
          });
          message.channel.send("", {file: {attachment:canvas.toBuffer()}});
        };
        img_bg.src = r.body;
      });
    }
  }
}