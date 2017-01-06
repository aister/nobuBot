var request = require('request');
exports.help = "servant <search term> :: Show info for the current week's master missions";
exports.exec = (client, message, msgArray, callback) => {
  if (message.channel.id == "226583738765541376") {
    request({
      url: 'http://aister.site90.com/api.php?mode=others&id=1',
      json: true
    }, function(err, res, body) {
      if (body.item) message.channel.sendMessage('', { embed: {
        title: "Master Mission for this week",
        description: body.value
      }});
      else message.channel.sendMessage('Some error occured, please try again later');
    });
  }
}