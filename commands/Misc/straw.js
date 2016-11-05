exports.help = "straw <option 1> | <option 2> | <etc.> :: Get a random number within <min> and <max>";
exports.func = (client, str) => {
  str = str.replace(/ ?\| ?/g, '|');
  str = str.split('\|');
  return str[client.commands.rnd.func(str.length - 1)];
}
exports.exec = (client, message, msgArray, callback) => {
  if (msgArray.length > 1) message.channel.sendMessage(this.func(client, msgArray.slice(1).join(' '))).then(callback);
  else message.channel.sendMessage('Unable to get straw, no option provided').then(callback);
}