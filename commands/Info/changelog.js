
exports.help = "changelog :: See the most recent changelog";
request = require('request');
exports.exec = (bot, message, msgArray, callback) => {
  if (process.env.HEROKU_SLUG_COMMIT) {
    request({
      url: 'https://api.github.com/repos/aister/nobuBot/git/commits/' + process.env.HEROKU_SLUG_COMMIT,
      json: true,
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "aister"
      }
    }, function(err, res, body) {
      embed = {
        title: "Changelog",
        description: 'Version ' + process.env.HEROKU_RELEASE_VERSION + ': ' + body.message
      }
      message.channel.sendMessage('', {embed}).then(callback);
    });
  } else {
    message.channel.sendMessage('Cannot retrieve changelog').then(callback);
  }
}