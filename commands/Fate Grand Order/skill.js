var request = require('request');
exports.help = "skill <servant name> :: Show skills of a certain servant\n\nStart search term with 'id:' to search with servant's ID";
exports.exec = (bot, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    msgArg = msgArray.slice(1).join(' ');
    if (msgArg.startsWith('id:')) msgArg = "http://aister.site90.com/api.php?mode=servants&c=dataID&query=" + encodeURI(msgArg.slice(3));
    else msgArg = "http://aister.site90.com/api.php?mode=servants&c=name&query=" + encodeURI(msgArg);
    request({ url: msgArg, json: true, followRedirect: false }, function(err, res, result) {
      if (res.statusCode != 302 && result.item) {
        body = result.item;
        fields = [];
        msgArg = body.skills.split('\n\n');
        msgArg.forEach(item => {
          item = item.split('\n');
          item[item.length - 1] = "**Target:** " + item[item.length - 1];
          fields.push({
            name: item[0],
            value: item.slice(1).join('\n') + "\n\u200b"
          });
        });
        console.log(fields);
        if (result.other) {
          fields.push({
            name: "Other results (in servant ID)",
            value: result.other + "\n\nUse `id:<servantID>` for precise search"
          })
        } else fields[fields.length - 1].value = fields[fields.length - 1].value.slice(0, -2);
        embed = {
          title: body.name + ' (ID: ' + body.dataID + ')',
          color: 0xff0000,
          fields: fields,
          description: "\u200b",
          thumbnail: {
            url: body.image
          },
          url: body.link
        }
        message.channel.sendMessage('', {embed}).then(callback).catch(console.log);
      } else message.channel.sendMessage("Not found").then(callback);
    });
  } else {
    message.channel.sendMessage('Wrong syntax');
  }
}