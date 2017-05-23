exports.help = "respect :: F";
exports.exec = (client, message, msgArray, callback) => {
  message.channel.send('Press F to pay respect').then(msg => {
    msg.channel.awaitMessages(m => m.content.toLowerCase() == "f", {time: 10000}).then(respects => { 
      message.channel.send(respects.size + " respects have been sent");
    });
  });
}