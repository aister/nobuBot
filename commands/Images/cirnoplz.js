var Canvas = require('canvas');
exports.help = "cirnoplz <text> :: Post an image with not-amused cirno and the text";
exports.exec = (bot, message, msgArray, callback) => {
  request({url: "http://i.imgur.com/FW9LtSk.png", encoding: null}, function (err, res, body) {
    let canvas = new Canvas(700, 300);
    let ctx = canvas.getContext('2d');
    const img_bg = new Canvas.Image();
    img_bg.onload = function () {
      ctx.drawImage(img_bg, 0, 0, 700, 300);
      var x = 350;
      var maxWidth = 330;
      ctx.font = "bold 25px Arial";
      var lineHeight = 30;
      var words = msgArray.slice(1);
      var line = '';
      var lines = [];
      var y = 0;

      for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }
      lines.push(line);
      y += lineHeight;
      y = ( 300 - y ) / 2;
      lines.forEach((line, i) => {
        ctx.fillText(line, x, y + (i + 1)*lineHeight);
      });
      message.channel.send("", {file: {attachment:canvas.toBuffer()}});
    };
    img_bg.src = body;
  });
}