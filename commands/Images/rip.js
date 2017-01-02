exports.help = "rip <text> :: Rip :(";
exports.exec = (bot, message, msgArray, callback) => {
  embed = {
    image: { url: "http://moesocial.com/rip.php?text=" + encodeURI(msgArray.slice(1).join(" ")) }
  }
  message.channel.sendMessage('', {embed}).then(callback); 
}