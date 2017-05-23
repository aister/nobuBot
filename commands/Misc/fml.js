var request = require('request');
var Decode = require('html-entities').AllHtmlEntities;
var decode = new Decode();
fml = [];
function load() {
  request('http://www.fmylife.com/random', function(err, res, body) {
    if (body) {
      body = body.slice(0, body.indexOf('/birthdays'));
      body.replace(/<p class="block">\n<a href="[^>]+>([^<]+)/g, function(match, text) {
        text = text.replace(/\n/g, '');
        if (text) fml.push(text);
      });
    }
  });
}
load();
exports.help = "fml :: Random fml story";
exports.exec = (bot, message, msgArray, callback) => {
  if (fml.length == 0) message.channel.send("I'm not ready yet!!");
  else {
    message.channel.send(decode.decode(fml.shift()));
    if (fml.length == 0) load();
  }
}