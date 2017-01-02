recipes = require('../../mc.json');
exports.help = "recipe <item> :: get the crafting recipe of the item";
exports.exec = (bot, message, msgArray, callback) => {
  msgArray = msgArray.slice(1).join(' ');
  if (msgArray in recipes) {
    message.channel.sendMessage('', {embed: { image: { url: recipes[msgArray]}}});
  }
}