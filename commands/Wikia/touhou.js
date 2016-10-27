var request = require('request');
exports.help = "touhou <search term> :: Search in Touhou Wikia";
exports.exec = (bot, message, msgArray, callback) => {
	msgArg = msgArray.slice(1).join(' ');
	msgArg = "http://touhou.wikia.com/api/v1/Search/List?lang=en&limit=1&batch=1&query=" + encodeURI(msgArg);
	request({ url: msgArg, json: true }, function(err, res, body) {
		if (body.items) {
			msgArg = "http://touhou.wikia.com/api/v1/Articles/Details?abstract=500&ids=" + body.items[0].id;
			request({ url: msgArg, json: true }, function(err, res, body2) {
				body2 = body2.items[body.items[0].id];
				if (body2.thumbnail) message.channel.sendFile(body2.thumbnail, "image.png", body2.abstract.replace(/\[view\] \u2022 \[talk\] /g, "") + "\n\n<http://touhou.wikia.com" + body2.url + ">").then(callback);
				else message.channel.sendMessage(body2.abstract.replace(/\[view\] \u2022 \[talk\] /g, "") + "\n\n<http://touhou.wikia.com" + body2.url + ">").then(callback);
			});
		} else message.channel.sendMessage("Not found").then(callback);
	});
}