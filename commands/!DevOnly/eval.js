config = require('../../config.json');
exports.exec = (bot, message, msgArray, callback) => {
	if (message.author.id == config.ownerID) {
		code = msgArray.slice(1).join(' ');
		if (!code.length) return message.channel.sendMessage('there\'s no code!').then(callback);
		try {
			message.channel.sendMessage("`INPUT:`\n```\n" + code + "\n```\n`OUTPUT:`\n```\n" + eval(code) + "\n```").then(callback);
		} catch(err) {
			message.channel.sendMessage("`INPUT:`\n```\n" + code + "\n```\n`ERROR:`\n```\n" + err + "\n```").then(callback);
		}
	}
}