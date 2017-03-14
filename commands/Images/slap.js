var Canvas = require('canvas');
exports.help = "slap <mention> :: Slap the mentioned user";
exports.exec = (bot, message, msgArray, callback) => {
  request({url: "http://i.imgur.com/aEGb2tj.png", encoding: null}, function (err, res, body) {
    let canvas = new Canvas(576, 300);
    let ctx = canvas.getContext('2d');
    const img_bg = new Canvas.Image();
    img_bg.onload = function () {
      if (message.mentions.users.size > 0) {
        mentions = message.mentions.users.first();
        if (mentions.id == "184369428002111488") {
          words = mentions.username;
          if (message.guild) words = message.member.displayName;
        } else if (message.guild) {
          words = message.guild.member(mentions).displayName;
        } else {
          words = mentions.username;
        }
      } else {
        words = msgArray.slice(1).join(' ');
      }
      ctx.drawImage(img_bg, 0, 0, 576, 300);
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "white";
      var metrics = ctx.measureText(words);
      ctx.strokeStyle = "black";
      ctx.strokeText(words, 430 - metrics.width / 2, 130);
      ctx.fillText(words, 430 - metrics.width / 2, 130);
      message.channel.sendFile(canvas.toBuffer());
    };
    img_bg.src = body;
  });
}