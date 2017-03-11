var request = require('request');
exports.help = "card <card name> :: Show info of the card\n\nStart search term with 'id:' to search with card's ID";
exports.exec = (bot, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    msgArg = msgArray.slice(1).join(' ');
    if (msgArg.startsWith('id:')) msgArg = "http://aister.site90.com/api.php?mode=vc&c=ID&query=" + encodeURI(msgArg.slice(3));
    else msgArg = "http://aister.site90.com/api.php?mode=vc&c=name&query=" + encodeURI(msgArg);
    request({ url: msgArg, json: true, followRedirect: false }, function(err, res, result) {
      if (res.statusCode != 302 && result.item) {
        body = result.item;
        fields = [
          {name: "Element", value: body.element, inline: true},
          {name: "Rarity", value: body.rarity, inline: true}
        ];
        JSON.parse(body.skills).forEach(item => {
          fields.push(item);
        });
        if (result.other) {
          fields.push({
            name: "Other results (in card ID)",
            value: result.other + "\n\nUse `id:<cardID>` for precise search"
          })
        }
        embed = {
          title: body.name + ' (ID: ' + body.ID + ')',
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