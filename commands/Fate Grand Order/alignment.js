var request = require('request');
exports.help = "alignment <search term> <page number>:: Search for servants with a specific alignment";
exports.exec = (bot, message, msgArray, callback) => {
  if (msgArray.length > 1) {
    if (isNaN(msgArray[msgArray.length - 1])) {
      page = 1;
      temp = msgArray.slice(1).join(' ');
    }
    else {
      page = parseInt(msgArray[msgArray.length - 1]);
      temp = msgArray.slice(1, -1).join(' ');
    }
    if (page < 1) page = 1;
    msgArg = "https://raw.githubusercontent.com/aister/nobuDB/master/fgo_main.json";
    request({ url: msgArg, json: true, followRedirect: false }, function(err, res, result) {
      msgArg = [];
      for (let id in result) {
        if (result[id].alignment.toLowerCase().includes(temp.toLowerCase())) {
          msgArg.push({
            name: result[id].name,
            id: result[id].id
          });
        }
      }
      if (msgArg) {
        maxPage = Math.ceil(msgArg.length / 10);
        if (page > maxPage) {
          page = maxPage;
        }
        msgArg = msgArg.slice((page - 1) * 10, page * 10).map(item => {return item.name + " (ID: " + item.id + ")"});
        embed = {
          title: "Servants with " + temp + ' alignment (Page ' + page + '/' + maxPage +'):',
          color: 0xff0000,
          description: "\u200b\n" + msgArg.join('\n\n') + '\n\nPlease use `' + bot.prefix + 'alignment ' + temp + ' <page number>` to go to other pages'
        }
        message.channel.send('', {embed}).then(callback).catch(console.log);
      } else message.channel.send("Not found").then(callback);
    });
  } else {
    message.channel.send('Wrong syntax');
  }
}