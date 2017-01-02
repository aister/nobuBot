exports.help = "fgo <search term> :: Search in Fate Grand Order Wikia";
exports.exec = (client, message, msgArray, callback) => {
  msgArray = [ msgArray[0], "fategrandorder" ].concat(msgArray.slice(1));
  client.commands.wikia.exec(client, message, msgArray, callback);
}