var request = require('request');
exports.help = "vc-waifu :: Marry a random maiden in Valkyrie Crusade";
exports.exec = (bot, message, msgArray, callback) => {
  msgArg = "http://aister.site90.com/api.php?mode=rand&db=vc&c=rarity&query=";
  let chance = Math.random();
  if (chance <= 0.05) msgArg += "LR";
  else if (chance <= 0.15) msgArg += "UR";
  else if (chance <= 0.5) msgArg += "SR";
  else msgArg += "N";
  request({ url: msgArg, json: true, followRedirect: false }, function(err, res, result) {
    if (res.statusCode != 302 && result.item) {
      body = result.item;
      embed = {
        title: "Congratulation!!",
        color: 0xff0000,
        description: "\u200b\nCongratulation! " + message.author + " have married to " + body.name + "! She has a rarity of " + body.rarity + ", how lucky!",
        image: {
          url: body.image
        }
      }
      message.channel.sendMessage('', {embed}).then(callback).catch(console.log);
    } else message.channel.sendMessage("Not found").then(callback);
  });
}