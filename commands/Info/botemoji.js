exports.help = "botemoji :: Show list of bot's emoji";
util = require('util');
exports.exec = (client, message, msgArray, callback) => {
  message.channel.sendMessage('```js\n' + util.inspect(client.emoji) + '```');
}