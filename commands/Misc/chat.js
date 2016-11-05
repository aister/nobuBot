var Cleverbot = require('cleverbot-node');
cleverbot = new Cleverbot;
Cleverbot.prepare(function(){});
exports.help = "chat <chat message> :: Chat with the bot (actually it's cleverbot but shh you don't know that)";
exports.func = (str, callback) => {
  cleverbot.write(str, (response) => {
    callback(response.message);
  });
}
exports.exec = (client, message, msgArray, callback) => {
  message.channel.startTyping();
  this.func(msgArray.slice(1).join(' '), (response) => {
    message.channel.stopTyping(true);
    if (!response) {
      message.channel.sendMessage("I... errr... I have something urgent to do, I'll be back very soon!").then(() => {
        delete require.cache[require.resolve('cleverbot-node')];
        Cleverbot = require('cleverbot-node');
        cleverbot = new Cleverbot();
        Cleverbot.prepare(() => { message.channel.sendMessage("I'm back, can you repeat what you say again?"); callback(); });
      });
    } else {
      message.channel.sendMessage(response);
    }
  });
}