request = require('request');
exports.help = "recipe <item> :: get the crafting recipe of the item";
exports.exec = (bot, message, msgArray, callback) => {
  request('https://www.minecraftcraftingguide.net', function (err, res, body) {
    body = body.slice(0, body.indexOf('id="Basic-Recipes'));
    body = body.split("<div class='tooltip'>").slice(1);
    msgArray = new RegExp(msgArray.slice(1).join(" "), "gi");
    temp = "";
    body.forEach(item => {
      if (item.match(/<strong>[^<]+/)[0].slice(8).match(msgArray)) {
        temp = "http:" + item.match(/src='[^']+/)[0].slice(5);
      }
    });
    if (temp) message.channel.sendFile(temp);
    else message.channel.sendMessage("Not found");
  })
}