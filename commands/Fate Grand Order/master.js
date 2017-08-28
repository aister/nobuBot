var request = require('request');
exports.help = "master :: Show info for the current week's master missions";
exports.exec = (client, message, msgArray, callback) => {
  request({
    url: 'https://raw.githubusercontent.com/aister/nobuDB/master/master.json',
    json: true
  }, function(err, res, body) {
    if (body.master) message.channel.send('', { embed: {
      title: "Master Mission for this week",
      description: "\u200b\n" + body.master
    }});
    else message.channel.send('Some error occured, R~ might have messed up somewhere... again...');
  });
}
