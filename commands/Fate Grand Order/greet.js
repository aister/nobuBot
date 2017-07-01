let greetings = "http://i.imgur.com/eoWffyo.png";
exports.help = "greet :: Whassup!!";
exports.exec = (client, message, msgArray, callback) => {
  message.channel.send('', {file: {attachment: greetings, name: 'Whassup.png'}});
}
