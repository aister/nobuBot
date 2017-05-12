var request = require('request');
exports.help = "gamepedia <domain> <search term> :: Search in a specific Gamepedia";
exports.exec = (bot, message, msgArray, callback) => {
  if (msgArray.length > 2) {
    msgArg = msgArray.slice(2).join(' ');
    msgArg = "http://" + msgArray[1] + ".gamepedia.com/api.php?action=query&format=json&list=search&srprop=snippet&titles=&srsearch=" + encodeURI(msgArg);
    message.channel.sendMessage('Searching...').then(msg => {
      request({ url: msgArg, json: true, followRedirect: false }, function(err, res, body) {
        if (res.statusCode != 302 && body.query && body.query.search && body.query.search.length) {
          msg.edit(body.query.search[0].snippet.replace(/<[^>]+>/g, "") + "\n\nhttp://" + msgArray[1] + ".gamepedia.com/" + encodeURI(body.query.search[0].title)).then(callback);
          
        } else msg.edit("Not found").then(callback);
      });
    });
  } else {
    message.channel.sendMessage('Wrong syntax');
  }
}