exports.exec = (client, message, msgArray, callback) => {
  if (message.author.id == client.config.ownerID) {
      client.bot.channels.get(msgArray[1]).send(msgArray.slice(2).join(' ')).then(callback);
  }
}