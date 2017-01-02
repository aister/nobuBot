exports.help = "cirno <text> :: Post an image with cirno sipping tea and the text";
exports.exec = (bot, message, msgArray, callback) => {
  embed = {
    image: { url: "http://moesocial.com/cirno.php?text=" + encodeURI(msgArray.slice(1).join(" ")) }
  }
  message.channel.sendMessage('', {embed}).then(callback); 
}