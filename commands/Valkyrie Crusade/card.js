var request = require('request');
exports.help = "card <card name> :: Show info of the card\n\nStart search term with 'id:' to search with card's ID";
exports.exec = (bot, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    msgArg = msgArray.slice(1).join(' ');
    request({ url: "https://raw.githubusercontent.com/aister/nobuDB/master/vc.json", json: true, followRedirect: false }, function(err, res, body) {
      let result = "";
      if (msgArg.startsWith('id:')) {
        msgArray = msgArg.slice(3);
        result = {item: body[msgArray]};
      } else {
        body.forEach((item, i) => {
          if (item.name.toLowerCase().includes(msgArg.toLowerCase())) {
            if (result) result.other.push(i);
            else {
              msgArray = i;
              result = {item: item, other: []};
            }
          }
        });
      }
      if (result) {
        body = result.item;
        fields = [
          {name: "Element", value: body.element, inline: true},
          {name: "Rarity", value: body.rarity, inline: true}
        ];
        body.skill.forEach(item => {
          fields.push(item);
        });
        if (result.other) {
          fields.push({
            name: "Other results (in card ID)",
            value: result.other.join(' | ') + "\n\nUse `id:<cardID>` for precise search"
          })
        }
        embed = {
          title: body.name + ' (ID: ' + msgArray + ')',
          color: 0xff0000,
          fields: fields,
          description: "\u200b",
          image: {
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