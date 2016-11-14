var request = require('request');
exports.help = "check <shortened link> :: Get full link of the provided link";
exports.exec = (client, message, msgArray, callback) => {
  if (msgArray[1]) {
    request({
      url: msgArray[1],
      followRedirect: false
    }, function(err, res, body) {
      if (res.statusCode == 301) {
        message.channel.sendMessage(res.headers.location);
        callback();
      } else {
        message.channel.sendMessage(res.request.href);
      }
    });
  } else {
    message.channel.sendMessage("Wrong syntax");
  }
}