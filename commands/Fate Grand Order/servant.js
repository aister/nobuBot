var request = require('request');
exports.help = "servant <search term> :: Search for servants with a specific search category";
exports.exec = (bot, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    msgArg = msgArray.slice(1).join(' ');
    msgArg = "http://aister.site90.com/api.php?mode=servants&c=name&query=" + encodeURI(msgArg);
      request({ url: msgArg, json: true, followRedirect: false }, function(err, res, body) {
        if (res.statusCode != 302 && body.item) {
          body = body.item;
          attack = '0' + body.attacks;
          attack = attack.replace(/.{2}/g, function (match) {
            switch (match) {
              case "01": return "Quick, ";
              case "02": return "Arts, ";
              case "03": return "Buster, ";
            }
          }).slice(0, -2);;
          message.channel.sendMessage('', {embed: {
            title: body.name + ' (ID: ' + body.dataID + ')',
            color: 0xff0000,
            fields: [
              {
                name: "Class",
                value: body.class,
                inline: true
              },
              {
                name: "HP",
                value: body.baseHP + ' (' + body.maxHP + ')',
                inline: true
              },
              {
                name: "ATK",
                value: body.baseATK + ' (' + body.maxATK + ')',
                inline: true
              },
              {
                name: "Attacks",
                value: attack,
                inline: true
              }
            ],
            thumbnail: {
              url: body.image
            },
            url: body.link
          }}).then(callback).catch(console.log);
        } else message.channel.sendMessage("Not found").then(callback);
      });
  } else {
    message.channel.sendMessage('Wrong syntax');
  }
}