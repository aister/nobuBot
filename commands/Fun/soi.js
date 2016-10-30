exports.help = "soi <text> :: Inside joke, don't touch plz :(";
exports.exec = (bot, message, msgArray, callback) => {
	message.channel.sendFile("http://moesocial.com/soi.php?text=" + encodeURI(msgArray.slice(1).join(" ")), "soi.png").then(callback); 
}