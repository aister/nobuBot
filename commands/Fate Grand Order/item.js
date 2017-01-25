request = require('request');
exports.help = "item <item ID or name> :: Get drop info for a certain item. Omit <item ID or name> to get list of all items\n\nAscension List is made by Enkicon";
exports.exec = (client, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    msgArray = msgArray.slice(1).join(' ');
    request({
      url: 'http://aister.site90.com/api.php?mode=item&q=' + encodeURI(msgArray),
      json: true,
      followRedirect: false
    }, function(err, res, result) {
      if (res.statusCode != 302 && result.item) {
        item = result.item[0];
        embed = {
          title: item.name + " - ID: " + item.itemID,
          description: '\u200b',
          fields: [
            {
              name: "Most efficient",
              value: item.AP
            },
            {
              name: "Highest Drop Rate",
              value: item.Drop
            }
          ],
          thumbnail: { url: item.img }
        };
        message.channel.sendMessage('', {embed});
      } else {
        message.channel.sendFile('http://aister.site90.com/Ascensionx.gif', 'Ascensionx.gif', 'List of available items:')
      }
    });
  } else {
    message.channel.sendFile('http://aister.site90.com/Ascensionx.gif', 'Ascensionx.gif', 'List of available items:')
  }
}