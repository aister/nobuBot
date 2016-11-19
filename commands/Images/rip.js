exports.help = "rip <text> :: Rip :(";
exports.exec = (bot, message, msgArray, callback) => {
  message.channel.sendFile("http://moesocial.com/rip.php?text=" + encodeURI(msgArray.slice(1).join(" ")), "rip.png").then(callback); 
}