var request = require('request');
exports.exec = (client, message, msgArray, callback) => {
  if (message.channel.id == "226583738765541376") {
    request('https://admin.serveromat.com/api/GameServer/Start/203b659e-8abd-4b3f-bf11-0216aa10a2c1', function(err, res, body) {
      if (body.includes('<IsRunning>true</IsRunning>'))  message.channel.sendMessage('Server is now running!');
      else message.channel.sendMessage('Some error occured, please try again later');
    });
  }
}