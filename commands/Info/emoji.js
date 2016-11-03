exports.help = "emoji :: Show list of emoji";
util = require('util');
exports.exec = (client, message, msgArray, callback) => {
  message.channel.sendMessage('```js\n' + util.inspect(client.emoji) + '```');
}