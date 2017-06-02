const flip = require("flip-text");
exports.help = "cirno <text> :: Post an image with cirno sipping tea and the text";
exports.exec = (bot, message, msgArray, callback) => {
  if (message.mentions.users.size > 0) {
    ttf = message.mentions.users.first();
    if (message.guild) ttf = message.guild.member(ttf.id).displayName;
    else ttf = ttf.username;
  }
  else ttf = msgArray.slice(1).join(' ');
  message.channel.send(ttf + "ノ( ゜-゜ノ)").then(mes => {
    setTimeout(function() {
      mes.edit("(╯°□°）╯︵ " + flip(ttf));
    }, 1000);
  });
}