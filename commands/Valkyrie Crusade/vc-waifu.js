var request = require('request');
exports.help = "vc-waifu :: Marry a random maiden in Valkyrie Crusade";
let cooldown = {};
exports.exec = (bot, message, msgArray, callback) => {
  let time = 0;
  if (!cooldown[message.author.id]) cooldown[message.author.id] = message.createdTimestamp;
  else time = message.createdTimestamp - cooldown[message.author.id] - 900000;
  if (time < 0 &&  && message.author.id != bot.config.ownerID) {
    message.channel.sendMessage("You can only use this command once every 15 minutes. You can use it again in " + Math.floor( - time / 60000) + " minutes " + (Math.ceil( - time / 1000) % 60) + " seconds");
  } else {
    cooldown[message.author.id] = message.createdTimestamp;
    msgArg = "http://aister.site90.com/api.php?mode=rand&db=vc&c=rarity&query=";
    let chance = Math.random();
    if (chance <= 0.015) msgArg += "LR";
    else if (chance <= 0.1) msgArg += "UR";
    else if (chance <= 0.4) msgArg += "SR";
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
}