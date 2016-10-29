config = require('../../config.json');
exports.exec = (bot, message, msgArray, callback) => {
	if (message.author.id == config.ownerID) {
		bot.channels.get(msgArray[1]).sendMessage(msgArray.slice(2).join(' ')).then(callback);
	}
}