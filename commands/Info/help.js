exports.help = "help <optional: command> :: Show help";
exports.exec = (client, message, msgArray, callback) => {
  if (msgArray[1] && msgArray[1] in client.commands && client.commands[msgArray[1]].help) 
    message.channel.send("```asciidoc\n" + client.prefix + client.commands[msgArray[1]].help + "```");
  else message.channel.send(client.help);
}