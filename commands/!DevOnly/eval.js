util = require('util');
function removeToken(client, str) {
  if (typeof str == "string") {
    reg = new RegExp(client.bot.token + '|' + client.bot.email + '|' + client.bot.password, 'g');
    str = str.replace(reg, 'Removed');
  }
  return str;
}
exports.exec = (client, message, msgArray, callback) => {
    if (message.author.id == client.config.ownerID) {
        code = msgArray.slice(1).join(' ');
        if (!code.length) return message.channel.sendMessage('there\'s no code!').then(callback);
        try {
          var evaled = eval(code);
          if (typeof evaled == "object")
            message.channel.sendMessage("`INPUT:`\n```js\n" + code + "\n```\n`OUTPUT:`\n```js\n" + removeToken(client, util.inspect(evaled, {depth: 0})) + "\n```").then(callback);
          else
            message.channel.sendMessage("`INPUT:`\n```js\n" + code + "\n```\n`OUTPUT:`\n```js\n" + removeToken(client, evaled) + "\n```").then(callback);
        } catch(err) {
            message.channel.sendMessage("`INPUT:`\n```js\n" + code + "\n```\n`ERROR:`\n```js\n" + err + "\n```").then(callback);
        }
    }
}