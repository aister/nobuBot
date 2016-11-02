exports.exec = (client, message, msgArray, callback) => {
  if (message.author.id == client.config.ownerID) {
    msgArray.slice(1).forEach(command => {
      if (command.toLowerCase() in client.commands) {
        message.channel.sendMessage('The code for command ' + client.prefix + command + ":```js\n" + client.commands[command].exec.toString() + '```');
      } else {
        message.channel.sendMessage("There's no command " + client.prefix + command);
      }
    });
  }
}