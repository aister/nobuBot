var request = require('request');
exports.help = "daily :: Get current Daily Quest info";
exports.exec = (bot, message, msgArray, callback) => {
  request({ url: "http://aister.site90.com/api.php?mode=daily", json: true, followRedirect: false }, function(err, res, body) {
    if (res.statusCode != 302 && body.item) {
      body = body.item;
      fields = [];
      date = new Date();
      date.setTime(Date.now() + 9 * 60 * 60 * 1000);

      body.forEach(item => {
        fields.push({
          name: item.name,
          value: "**Drop:** " + decodeURIComponent(escape(item.drop)) + "\n\n\u200b"
        });
      });
      fields[fields.length - 1]["value"] = fields[fields.length - 1]["value"].slice(0, -2);
      embed = {
        title: "Daily Quest Info for " + date.toDateString(),
        color: 0xff0000,
        fields,
        description: "\u200b"
      }
      message.channel.sendMessage('', {embed}).then(callback).catch(console.log);
    } else message.channel.sendMessage("Not found").then(callback);
  });
}