var request = require('request');
var Decode = require('html-entities').AllHtmlEntities;
var decode = new Decode();
var fml = [];
function load() {
  request('http://www.fmylife.com/random', function(err, res, body) {
    body.replace(/<p class="content"><a href="[^>]+>([^<]+)/g, function(match, text) {
      fml.push(text);
    });
  });
}
load();
exports.help = "fml :: Random fml story";
exports.exec = (bot, message, msgArray, callback) => {
  if (fml.length == 0) message.channel.sendMessage("I'm not ready yet!!");
  else {
    message.channel.sendMessage(decode.decode(fml.shift()));
    if (fml.length == 0) load();
  }
}