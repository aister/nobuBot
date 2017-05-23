var request = require('request');
exports.help = "vindictus <search term> :: Search in Vindictus Gamepedia";
exports.exec = (bot, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    msgArg = msgArray.slice(1).join(' ');
    msgArg = "http://vindictus.gamepedia.com/api.php?action=query&format=json&list=search&srprop=snippet&titles=&srsearch=" + encodeURI(msgArg);
    message.channel.send('Searching...').then(msg => {
      request({ url: msgArg, json: true, followRedirect: false }, function(err, res, body) {
        if (res.statusCode != 302 && body.query && body.query.search && body.query.search.length) {
          msg.edit(body.query.search[0].snippet.replace(/<[^>]+>/g, "") + "\n\nhttp://vindictus.gamepedia.com/" + encodeURI(body.query.search[0].title)).then(callback);
          
        } else msg.edit("Not found").then(callback);
      });
    });
  } else {
    message.channel.send('Wrong syntax');
  }
}