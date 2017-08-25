var Canvas = require('canvas');
exports.help = "blame <text> :: Blame someone???";
exports.exec = (bot, message, msgArray, callback) => {
  let canvas = new Canvas(300, 200);
  let ctx = canvas.getContext('2d');
  var maxWidth = 280;
  ctx.font = "bold 40px Times";
  var lineHeight = 45;
  var words = ("Blame " + msgArray.slice(1).join(' ')).split(' ');
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
  y = ( 200 - y ) / 2;
  ctx.fillStyle = "red";
  lines.forEach((line, i) => {
    x = 150 - ctx.measureText(line).width / 2;
    ctx.fillText(line, x, y + (i + 1)*lineHeight);
  });
  message.channel.send("", {file: {attachment: canvas.toBuffer()}});
}