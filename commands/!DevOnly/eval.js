config = require('../../config.json');
util = require('util');
exports.exec = (bot, message, msgArray, callback) => {
    if (message.author.id == config.ownerID) {
        code = msgArray.slice(1).join(' ');
        if (!code.length) return message.channel.sendMessage('there\'s no code!').then(callback);
        try {
          var evaled = eval(code);
          if (typeof evaled == "object")
            message.channel.sendMessage("`INPUT:`\n```js\n" + code + "\n```\n`OUTPUT:`\n```js\n" + util.inspect(evaled, {depth: 0}) + "\n```").then(callback);
          else
            message.channel.sendMessage("`INPUT:`\n```js\n" + code + "\n```\n`OUTPUT:`\n```js\n" + evaled + "\n```").then(callback);
        } catch(err) {
            message.channel.sendMessage("`INPUT:`\n```js\n" + code + "\n```\n`ERROR:`\n```js\n" + err + "\n```").then(callback);
        }
    }
}