exports.exec = (client, message, msgArray, callback) => {
  if (message.author.id == client.config.ownerID) {
    client.load(client, function() {
      message.channel.sendMessage('Code Reloaded');
    });
  }
}