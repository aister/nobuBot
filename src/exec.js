exports.exec = (client, message, ping) => {
  var msg = message.content.trim().replace(/ +/g, ' ');
  if (!message.author.bot) {
    if (client.config.selfbot && message.author.id !== client.config.ownerID) return;
    if (msg.startsWith(client.prefix)) {
      msg = msg.slice(client.prefix.length);
      msgArray = msg.split(' ');
      if (msgArray[0].toLowerCase() in client.commands) {
        client.commands[msgArray[0].toLowerCase()].exec(client, message, msgArray, function() {
          if (ping) {
            message.channel.sendMessage('That command took ' + (Date.now() - ping) + ' ms, approx.');
          }
        });
      }
    }
    if (msg in client.emoji) {
      if (client.emoji[msg].includes("http://")) message.channel.sendFile(client.emoji[msg]);
      else message.channel.sendMessage(client.emoji[msg]);
    }
    reg = new RegExp('https?:\/\/(www\.)?(' + client.webList.join('|').replace(/\./g, '\.') + ')');
    website = msg.match(reg);
    if (website) {
      item = website[0];
      item = item.slice(item.indexOf('//') + 2);
      if (item.indexOf("www.") >= 0) item = item.slice(4);
      if (item in client.web) {
        client.web[item].exec(client.bot, message);
      }
    }
  }
}