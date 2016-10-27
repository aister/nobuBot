exports.help = "cirnoplz <text> :: Post an image with not-amused cirno and the text";
exports.exec = (bot, message, msgArray, callback) => {
	message.channel.sendFile("http://moesocial.com/cirnoplz.php?text=" + encodeURI(msgArray.slice(1).join(" ")), "cirno.png").then(callback); 
}