exports.help = "help :: Show help";
exports.exec = (client, message, msgArray, callback) => {
  message.channel.sendMessage(client.help);
}