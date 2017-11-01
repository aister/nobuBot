var Canvas = require('canvas');
exports.help = "lolicon :: coming out of the closet";
exports.exec = (bot, message, msgArray, callback) => {
  request({url: "https://i.imgur.com/ulQiHQO.png", encoding: null}, function (err, res, body) {
    let canvas = new Canvas(617, 319);
    let ctx = canvas.getContext('2d');
    const img_bg = new Canvas.Image();
    img_bg.onload = function () {
      ctx.drawImage(img_bg, 0, 0, 617, 319);
      ctx.font = "bold 25px Arial";
      var lineHeight = 30;
      var words = message.member.displayName;
      ctx.fillText(words, 300, 100);
      message.channel.send("", {file: {attachment:canvas.toBuffer()}});
    };
    img_bg.src = body;
  });
}
