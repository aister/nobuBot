var util = require('util');
function removeToken(client, str) {
  if (typeof str == "string") {
    reg = new RegExp(client.bot.token.replace(/\./g, "\\."), 'g');
    str = str.replace(reg, 'Removed');
  }
  return str;
}
exports.exec = (client, message, msgArray, callback) => {
  if (message.author.id == client.config.ownerID) {
    log = (content) => { message.channel.sendMessage(content); };
    commands = (c) => {
      cl = [];
      if (c) {
        if (client.commands[c]) return client.commands[c].count;
        else return "'" + c + "' is not a command";
      } else {
        for (c in client.commands) { if (client.commands[c].count) cl.push(c + ": " + client.commands[c].count);
        }
        return cl.join('\n');
      }
    }
    command = commands();
    code = msgArray.slice(1).join(' ');
    if (!code.length) return message.channel.sendMessage('there\'s no code!').then(callback);
    try {
      var evaled = eval(code);
      if (typeof evaled == "object")
        message.channel.sendMessage("`EVAL TO:`\n```js\n" + removeToken(client, util.inspect(evaled, {depth: 0})) + "\n```").then(callback);
      else
        message.channel.sendMessage("`EVAL TO:`\n```js\n" + removeToken(client, evaled) + "\n```").then(callback);
    } catch(err) {
        message.channel.sendMessage("`ERROR:`\n```js\n" + err + "\n```").then(callback);
    }
  }
}