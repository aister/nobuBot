exports.help = "touhou <search term> :: Search in Touhou Wikia";
exports.exec = (client, message, msgArray, callback) => {
  msgArray = [ msgArray[0], "touhou" ].concat(msgArray.slice(1));
  client.commands.wikia.exec(client, message, msgArray, callback);
}