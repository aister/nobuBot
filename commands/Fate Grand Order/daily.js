var request = require('request');
exports.help = "daily :: Get current Daily Quest info";
exports.exec = (bot, message, msgArray, callback) => {
  request({ url: "https://raw.githubusercontent.com/aister/nobuDB/master/daily.json", json: true }, function(err, res, body) {
    fields = [];
    date = new Date();
    date.setTime(Date.now() + 9 * 60 * 60 * 1000);
    body = body[date.getDay()];
    body.forEach(item => {
      fields.push({
        name: item.name,
        value: "**Drop:** " + decodeURIComponent(escape(item.drop)) + "\n\u200b"
      });
    });
    fields[fields.length - 1]["value"] = fields[fields.length - 1]["value"].slice(0, -2);
    embed = {
      title: "Daily Quest Info for " + date.toDateString(),
      color: 0xff0000,
      fields,
      description: "\u200b"
    }
    message.channel.send('', {embed}).then(callback).catch(console.log);
  });
}