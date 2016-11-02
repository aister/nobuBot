exports.help = "ping :: Poke the bot, see if it's alive";
exports.exec = (client, message, msgArray, callback) => {
  ping = Date.now();
  if (msgArray.length > 0) {
    message.content = client.prefix + msgArray.slice(1).join(' ');
    client.exec(client, message, ping);
  } else {
    message.channel.sendMessage('Pinging...').then(msg => {
      msg.edit('Ping! It took ' + (Date.now() - ping) + 'ms');
    });
  }
}