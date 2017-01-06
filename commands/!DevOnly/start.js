var request = require('request');
exports.exec = (client, message, msgArray, callback) => {
  if (message.channel.id == "226583738765541376" || message.channel.id == "217325563516420096") {
    request({
      url: 'https://admin.serveromat.com/api/GameServer/Start/203b659e-8abd-4b3f-bf11-0216aa10a2c1',
      headers: {
        'Cookie': process.env.MC
      }
    }, function(err, res, body) {
      if (body.match(/<IsRunning>true<\/IsRunning>|"IsRunning":true/g)) message.channel.sendMessage('Server is now running!');
      else message.channel.sendMessage('Some error occured, please try again later');
    });
  }
}