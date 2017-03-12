var request = require('request');
exports.help = "servant <name> :: Search for a servant with the name\n\nStart search term with 'id:' to search with ID";
exports.exec = (bot, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    msgArg = msgArray.slice(1).join(' ');
    if (msgArg.startsWith('id:')) msgArg = "http://aister.site90.com/api.php?mode=servants&c=dataID&query=" + encodeURI(msgArg.slice(3));
    else msgArg = "http://aister.site90.com/api.php?mode=servants&c=name&query=" + encodeURI(msgArg);
    request({ url: msgArg, json: true, followRedirect: false }, function(err, res, result) {
      if (res.statusCode != 302 && result.item) {
        body = result.item;
        attack = body.attacks.replace(/.{2}/g, function (match) {
          switch (match) {
            case "01": return "Quick, ";
            case "02": return "Arts, ";
            case "03": return "Buster, ";
          }
        }).slice(0, -2);
        body.note = body.note.replace(/ +(\n|$)/g, "\n");
        if (body.note == "\n") body.note = "None";
        field = [
          {
            name: "Rarity",
            value: body.rarity,
            inline: true
          },
          {
            name: "Alignment",
            value: body.alignment,
            inline: true
          },
          {
            name: "Class",
            value: body.class,
            inline: true
          },
          {
            name: "Cost",
            value: body.cost,
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
            value: attack
          },
          {
            name: "NP",
            value: body.NP
          },
          {
            name: "Description",
            value: body.description || "None"
          },
          {
            name: 'Note',
            value: (body.note || "None")
          }
        ];
        if (result.other) {
          field[field.length - 1].value += "\n\u200b";
          field.push({
            name: "Other results (in servant ID)",
            value: result.other + "\n\nUse `id:<servantID>` for precise search"
          })
        }
        embed = {
          title: body.name + ' (ID: ' + body.dataID + ')',
          color: 0xff0000,
          fields: field,
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