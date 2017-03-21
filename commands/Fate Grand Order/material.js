var request = require('request');
exports.help = "servant <name> :: Search for a servant with the name\n\nStart search term with 'id:' to search with ID";
exports.exec = (bot, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    msgArg = msgArray.slice(1).join(' ');
    request({ url: "https://raw.githubusercontent.com/aister/nobuDB/master/fgo_main.json", json: true, followRedirect: false }, function(err, res, body) {
      let result = "";
      if (msgArg.startsWith('id:')) result = {item: body[msgArg.slice(3)]};
      else {
        for (let item in body) {
          if (body[item].name.toLowerCase().includes(msgArg.toLowerCase())) {
            if (result) result.other.push(body[item].id);
            else result = {item: body[item], other: []};
          }
        }
      }
      if (result) {
        body = result.item;
        embed = {
          title: body.name + ' (ID: ' + body.id + ')',
          color: 0xff0000,
          description: "\u200b",
          thumbnail: {
            url: body.image
          },
          url: body.link
        }
        if (body.item != "None") {
          body.item = body.item.split("\n\n");
          embed.fields = [
            {
              name: "1st Ascension",
              value: body.item[0] + "\n\u200b"
            },
            {
              name: "2nd Ascension",
              value: body.item[1] + "\n\u200b"
            },
            {
              name: "3rd Ascension",
              value: body.item[2] + "\n\u200b"
            },
            {
              name: "4th Ascension",
              value: body.item[3]
            }
          ];
        } else embed.fields = [ { name: "None", value: "\u200b" }];
        if (result.other && result.other.length) {
          embed.fields[embed.fields.length - 1].value += "\n\u200b";
          embed.fields.push({
            name: "Other results (in servant ID)",
            value: result.other.join(' | ') + "\n\nUse `id:<servantID>` for precise search"
          })
        }
        message.channel.sendMessage('', {embed}).then(callback).catch(console.log);
      } else message.channel.sendMessage("Not found").then(callback);
    });
  } else {
    message.channel.sendMessage('Wrong syntax');
  }
}