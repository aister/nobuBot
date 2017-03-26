var Canvas = require('canvas');
exports.help = "rip <text> :: Rip :(";
exports.exec = (bot, message, msgArray, callback) => {
  request({url: "http://cliparts.co/cliparts/pi7/8ok/pi78okjMT.png", encoding: null}, function (err, res, body) {
    let canvas = new Canvas(504, 594);
    let ctx = canvas.getContext('2d');
    const img_bg = new Canvas.Image();
    img_bg.onload = function () {
      ctx.drawImage(img_bg, 0, 0, 504, 594);
      ctx.font = "bold 40px Arial";
      var words = msgArray.slice(1).join(' ');
      var metrics = ctx.measureText(words);
      ctx.fillText(words, 237 - metrics.width / 2, 330);
      ctx.font = "bold 30px Arial";
      ctx.fillText("???? - 2017", 160, 380);
      message.channel.sendFile(canvas.toBuffer());
    };
    img_bg.src = body;
  });
}