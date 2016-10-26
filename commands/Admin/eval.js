exports.exec = (bot, message, msgArray, callback) => {
	if (message.author.id == "184369428002111488") {
		code = msgArray.slice(1).join(' ');
		if (!code.length) return message.channel.sendMessage('there\'s no code!').then(callback);
		try {
			message.channel.sendMessage("`INPUT:`\n```\n" + code + "\n```\n`OUTPUT:`\n```\n" + eval(code) + "\n```").then(callback);
		} catch(err) {
			message.channel.sendMessage("`INPUT:`\n```\n" + code + "\n```\n`ERROR:`\n```\n" + err + "\n```").then(callback);
		}
	}
}