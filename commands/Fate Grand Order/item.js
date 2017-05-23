request = require('request');
exports.help = "item <item ID or name> :: Get drop info for a certain item. Omit <item ID or name> to get list of all items\n\nAscension List is made by Enkicon";
exports.exec = (client, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    msgArray = msgArray.slice(1).join(' ');
    request({
      url: 'https://raw.githubusercontent.com/aister/nobuDB/master/item.json',
      json: true
    }, function(err, res, result) {
      let item = "";
      if (!(item = result[msgArray])) {
        for (index in result) {
          i = result[index];
          if (i.name.toLowerCase().includes(msgArray.toLowerCase())) {
            msgArray = index;
            item = i;
          }
        }
      }
      if (item) {
        embed = {
          title: item.name + " - ID: " + msgArray,
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
        message.channel.send('', {embed});
      } else {
        message.channel.send('List of available items:', {file: {attachment: 'https://raw.githubusercontent.com/aister/nobuDB/master/Ascensionx.gif', name: 'Ascensionx.gif'}});
      }
    });
  } else {
    message.channel.send('List of available items:', {file: {attachment: 'https://raw.githubusercontent.com/aister/nobuDB/master/Ascensionx.gif', name: 'Ascensionx.gif'}});
  }
}