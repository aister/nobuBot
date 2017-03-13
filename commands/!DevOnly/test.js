var canvas = require('canvas');
exports.help = "vc-waifu :: Marry a random maiden in Valkyrie Crusade";
let cooldown = {};
exports.exec = (bot, message, msgArray, callback) => {
  var Canvas = require('canvas')
    , Image = Canvas.Image
    , canvas = new Canvas(200, 200)
    , ctx = canvas.getContext('2d');

  ctx.font = '30px Impact';
  ctx.rotate(.1);
  ctx.fillText("Awesome!", 50, 100);

  var te = ctx.measureText('Awesome!');
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + te.width, 102);
  ctx.stroke();

  message.channel.sendFile(canvas.toBuffer());
}