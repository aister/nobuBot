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
    msgArg = "http://aister.site90.com/api.php?mode=servants&c=alignment&query=" + encodeURI(temp);
    request({ url: msgArg, json: true, followRedirect: false }, function(err, res, result) {
      console.log(result);
      if (res.statusCode != 302 && result.item) {
        maxPage = Math.ceil(result.item.length / 10);
        if (page > maxPage) {
          page = maxPage;
        }
        embed = {
          title: "Servants with " + temp + ' alignment (Page ' + page + '/' + maxPage +'):',
          color: 0xff0000,
          description: "\u200b\n" + result.item.slice((page - 1) * 10, page * 10).join('\n\n') + '\n\nPlease use `' + bot.prefix + 'alignment ' + temp + ' <page number>` to go to other pages'
        }
        message.channel.sendMessage('', {embed}).then(callback).catch(console.log);
      } else message.channel.sendMessage("Not found").then(callback);
    });
  } else {
    message.channel.sendMessage('Wrong syntax');
  }
}