const Command = require('../../main/command');
const snek = require('snekfetch');
const GIFEncoder = require('gifencoder');
const Canvas = require('canvas');
const Constants = require('../../main/const');

function generateGif(result) {
  const w = 2200;
  const h = 1010;
  return new Promise((resolve, reject) => {
    let images = [];
    for (index in result) {
      images.push(
        {
          id: index,
          name: result[index].name.slice(0, result[index].name.indexOf('(')),
          link: result[index].img
        }
      );
    }
    images = images.map((item, i) => {
      return new Promise((resolve, reject) => {
        let base = new Canvas.Image();
        snek.get(item.link).then(r => {
          base.onerror = reject;
          base.onload = () => {
            item.link = base;
            resolve(item);
          }
          base.src = r.body;
        });
      });
    });
    Promise.all(images).then(list => {
      images = [];
      let page = -1;
      for (i = 0; i < list.length; i++) {
        if (i % 10 == 0) {
          page++;
          images[page] = [];
        }
        images[page].push(list[i]);
      }
      let encoder = new GIFEncoder(w, h);
      let gif = encoder.createReadStream();
      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(4000);
      images = images.map(page => {
        canvas = new Canvas(w, h);
        ctx = canvas.getContext('2d');
        ctx.fillStyle = "#363a3e";
        ctx.fillRect(0, 0, w, h);
        let base = new Canvas.Image();
        ctx.font = "bold 50px Arial";
        ctx.fillStyle = "white";
        page.map((item, i) => {
          if (i < 5) {
            ctx.fillText(item.id, 30, i * 188 + 150);
            ctx.fillText(item.name, 336, i * 188 + 150);
            ctx.drawImage(item.link, 153, i * 188 + 50, 153, 168);
          } else {
            ctx.fillText(item.id, w / 2 + 30, i * 188 - 790);
            ctx.fillText(item.name, w / 2 + 336, i * 188 - 790);
            ctx.drawImage(item.link, w / 2 + 153, i * 188 - 890, 153, 168);
          }
        });
        encoder.addFrame(ctx);
      });
      encoder.finish();
      resolve(gif.read());
    });
  });
}

module.exports = class GifGenerationCommand extends Command {
  constructor(main) {
    super(main, {
      name: "gif-gen",
      devOnly: true
    });
  }
  run(message, args, prefix) {
    snek.get(`${Constants.db}item.json`).then(r => {
      r = JSON.parse(r.text);
      generateGif(r).then(attachment => {
        message.channel.send('', {file: {attachment, name: 'Ascensionx.gif'}});
      });
    })
  }
}