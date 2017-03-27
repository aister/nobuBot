var request = require('request');
exports.help = "insult :: For M only";
exports.exec = (client, message, msgArray, callback) => {
  request('http://insult.mattbas.org/api/insult.txt', function (err, res, body) {
    message.channel.sendMessage(body);
  })
}