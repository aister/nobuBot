var request = require('request');
exports.help = "google <google search query> :: Google Search";
exports.exec = (bot, message, msgArray, callback) => {
  searchTerm = msgArray.slice(1).join(' ');
  message.channel.send("Searching...").then(msg => {
    request('https://www.google.com/search?safe=active&q=' + encodeURI(searchTerm), function(err, res, body) {
      if (err) callback(err);
      else {
        if (body.indexOf('<cite class="_Rm">') > -1) {
          body = body.slice(body.indexOf('<cite class="_Rm">') + 18);
          body = body.slice(0, body.indexOf('<'));
          body = decodeURIComponent(body);
          msg.edit("First result found for query " + searchTerm + ": " + body).then(callback);
        } else msg.edit("There is no result found for query " + searchTerm).then(callback);
      }
    });
  });
}