let request = require('request');
let GIFEncoder = require('gifencoder');
let Canvas = require('canvas');
function generateGif(result) {
  let w = 2200;
  let h = 1010;
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
        request({
          url: item.link,
          encoding: null
        }, function (err, res, body) {
          base.onerror = reject;
          base.onload = () => {
            item.link = base;
            resolve(item);
          }
          base.src = body;
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
exports.help = "item <item ID or name> :: Get drop info for a certain item. Omit <item ID or name> to get list of all items";
exports.exec = (client, message, msgArray, callback) => {
  request({
    url: 'https://raw.githubusercontent.com/aister/nobuDB/master/item.json',
    json: true
  }, function(err, res, result) {
    if (msgArray.length > 1) {
      msgArray = msgArray.slice(1).join(' ');
      let item = "";
      if (!(item = result[msgArray.toUpperCase()])) {
        for (index in result) {
          i = result[index];
          if (i.name.toLowerCase().includes(msgArray.toLowerCase())) {
            msgArray = index;
            item = i;
          }
        }
      } 
      if (item) {
        if (callback) callback(item);
        else {
          embed = {
            title: item.name + " - ID: " + msgArray,
            description: '\u200b',
            fields: [
              {
                name: "Most efficient",
                value: item.AP
              },
              {
                name: "Highest Drop Rate",
                value: item.drop
              }
            ],
            thumbnail: { url: item.img }
          };
          message.channel.send('', {embed});
        }
      } else {
        generateGif(result).then(attachment => {
          message.channel.send('Cannot find mentioned item, please enter the correct item name or item ID\n\nList of available items:', {file: {attachment, name: 'Ascensionx.gif'}});
        });
      }
    } else {
      generateGif(result).then(attachment => {
        message.channel.send('List of available items:', {file: {attachment, name: 'Ascensionx.gif'}});
      });
    }
  });
}
