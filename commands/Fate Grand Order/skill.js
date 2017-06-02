var request = require('request');
exports.help = "skill <servant name> :: Show skills of a certain servant\n\nStart search term with 'id:' to search with servant's ID";
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
        message.channel.send('', {embed}).then(callback).catch(console.log);
      } else message.channel.send("Not found").then(callback);
    });
  } else {
    message.channel.send('Wrong syntax');
  }
}