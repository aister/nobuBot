exports.help = "gacha-temp <servant id> <optional: event id> :: See how many gacha u need to get a certain servant.";
exports.exec = (client, message, msgArray, callback) => {
  let db_path = 'https://raw.githubusercontent.com/aister/nobuDB/master/';
  if (msgArray[1]) {
    request({
      url: db_path + "gatcha.json",
      json: true
    }, function (err, res, body) {
      if (event = message.content.match(/event\d+/g)) {
        request({
          url: db_path + "gacha_event.json",
          json: true
        }, function (err, res, gEvent) {
          event = event[0].slice(5);
          if (gEvent[event]) {
            for (i = 0; i <= 5; i++) {
              if (gEvent[event].servants && gEvent[event].servants[i]) body.servants[i] = body.servants[i].concat(gEvent[event].servants[i]);
              if (gEvent[event].ce && gEvent[event].ce[i]) body.ce[i] = body.ce[i].concat(gEvent[event].ce[i]);
            }
            message.channel.sendMessage(check("S/" + msgArray[1], body, client.commands.gacha.func));
          } else message.channel.sendMessage(check("S/" + msgArray[1], body, client.commands.gacha.func));
        });
      } else message.channel.sendMessage(check("S/" + msgArray[1], body, client.commands.gacha.func));
    });
  }
}
function check(item, data, func) {
  let data_in = false;
  for (i = 3; i <= 5; i++) {
    if (data.servants[i].includes(item.slice(2))) data_in = true;
  }
  if (data_in) {
    i = 0;
    while (item != func(data) && i <= 300) {
      i++;
    }
    if (i > 100) {
      return "You wasted 900 quartz and didn't get what you want. Poor you. Rip wallet.";
    } else {
      return "It took you " + i * 3 + " quartz to get what you want. I hope it was worth what it costed";
    }
  } else {
    return "The servant isn't in the gacha you spoon!";
  }
}