exports.help = "help <optional: command> :: Show help";
exports.exec = (client, message, msgArray, callback) => {
  if (msgArray[1] && msgArray[1] in client.commands && client.commands[msgArray[1]].help) 
    message.channel.sendMessage("```asciidoc\n" + client.prefix + client.commands[msgArray[1]].help + "```");
  else message.channel.sendMessage(client.help);
}