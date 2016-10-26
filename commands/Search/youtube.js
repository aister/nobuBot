var request = require('request');
exports.help = "$youtube <youtube search query> :: Youtube Search";
exports.exec = (bot, message, msgArray) => {
	request({
		url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
			searchTerm + "&key=" + process.env.YTTOKEN2,
		json: true
	}, function (error, response, body) {
		item = body.items[0].id;
		switch (item.kind) {
			case "youtube#video":
				message.reply("First result: <https://www.youtube.com/watch?v=" + item.videoId + ">");
				break;
			case "youtube#channel":
				message.reply("First result: <https://www.youtube.com/channel/" + item.channelId + ">");
				break;
			case "youtube#playlist":
				message.reply("First result: <https://www.youtube.com/playlist?list=" + item.channelId + ">");
				break
		}
	});
}