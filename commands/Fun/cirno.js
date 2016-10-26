exports.help = "$cirno <text> :: Post an image with cirno sipping tea and the text";
exports.exec = (bot, message, msgArray, callback) => {
	message.channel.sendFile("http://moesocial.com/cirno.php?text=" + encodeURI(msgArray.slice(1).join(" ")), "cirno.png").then(callback); 
}