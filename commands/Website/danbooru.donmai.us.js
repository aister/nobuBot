var request = require('request');
exports.exec = (bot, message) => {
	msg = message.content.trim();
	msg.replace(/https?:\/\/danbooru\.donmai\.us\/posts\/\d+/g, function(match) {
		request({
			url: match + '.json',
			json: true
		}, function (err, res, body) {
			message.channel.sendFile("https://danbooru.donmai.us" + body.file_url, "photo.png", "<" + match + ">");
		});
	});
}