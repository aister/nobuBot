exports.exec = (bot, message, msgArray) => {
	if (message.author.id == "184369428002111488") {
		nobuBot.channels.get(msgArray[1]).sendMessage(msgArray.slice(2).join(' '));
	}
}