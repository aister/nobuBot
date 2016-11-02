exports.exec = (client, message, msgArray, callback) => {
  if (message.author.id == client.config.ownerID) {
    message.channel = client.bot.channels.get(msgArray[1]);
    msgArray = msgArray.slice(2);
    message.content = client.prefix + msgArray.join(' ');
    client.exec(client, message);
  }
}