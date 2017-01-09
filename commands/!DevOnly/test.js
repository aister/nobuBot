var Canvas = require('canvas');
  var Image = Canvas.Image;
exports.help = "daily :: Get current Daily Quest info";
exports.exec = (bot, message, msgArray, callback) => {
  var canvas = new Canvas(200, 200)
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
message.channel.send('', {file: {attachment: canvas.toBuffer(), name: "profile.jpg"}});
}