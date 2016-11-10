var request = require('request');
exports.help = "wikia <wikidomain> <search term> :: Search in a specific Wikia";
exports.exec = (bot, message, msgArray, callback) => {
  if (msgArray.length > 2) {
    msgArg = msgArray.slice(2).join(' ');
    msgArg = "http://" + msgArray[1] + ".wikia.com/api/v1/Search/List?lang=en&limit=1&batch=1&query=" + encodeURI(msgArg);
    message.channel.sendMessage('Searching Wikia...').then(msg => {
      request({ url: msgArg, json: true, followRedirect: false }, function(err, res, body) {
        if (res.statusCode != 302 && body.items) {
          msgArg = "http://" + msgArray[1] + ".wikia.com/api/v1/Articles/Details?abstract=500&ids=" + body.items[0].id;
          msg.edit("Article found, retrieving content...");
          request({ url: msgArg, json: true }, function(err, res, body2) {
            body2 = body2.items[body.items[0].id];
            if (body2.thumbnail) {
              msg.delete();
              message.channel.sendFile(body2.thumbnail, "image.png", body2.abstract.replace(/\[view\] \u2022 \[talk\] /g, "") + "\n\n<http://" + msgArray[1] + ".wikia.com" + body2.url + ">").then(callback);
            } else msg.edit(body2.abstract.replace(/\[view\] \u2022 \[talk\] /g, "") + "\n\n<http://" + msgArray[1] + ".wikia.com" + body2.url + ">").then(callback);
          });
        } else msg.edit("Not found").then(callback);
      });
    });
  } else {
    message.channel.sendMessage('Wrong syntax');
  }
}