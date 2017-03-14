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
            value: body.servantClass,
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
        if (result.other && result.other.length) {
          field[field.length - 1].value += "\n\u200b";
          field.push({
            name: "Other results (in servant ID)",
            value: result.other.join(' | ') + "\n\nUse `id:<servantID>` for precise search"
          })
        }
        embed = {
          title: body.name + ' (ID: ' + body.id + ')',
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