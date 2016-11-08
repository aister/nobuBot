var request = require('request');
var Decode = require('html-entities').AllHtmlEntities;
var decode = new Decode();
exports.help = "pun :: Random pun";
exports.exec = (bot, message, msgArray, callback) => {
  request('http://www.punoftheday.com/cgi-bin/arandompun.pl', function(err, res, body) {
    if (err) message.channel.sendMessage(err);
    else {
      body = body.slice(16);
      body = body.slice(0, body.indexOf("'") - 6);
      message.channel.sendMessage(decode.decode(body)).then(callback);
    }
  });
}