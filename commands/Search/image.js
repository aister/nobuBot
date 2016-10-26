var request = require('request');
exports.help = "$image <image search query> :: Image Search";
exports.exec = (bot, message, msgArray) => {
	searchTerm = msgArray.slice(1).join(' ');
	message.channel.sendMessage("Searching...").then(msg => {
		request('http://www.bing.com/images/search?q=' + encodeURI(searchTerm), function(err, res, body) {
			if (err) callback(err);
			else {
				msg.delete();
				if (body.indexOf('class="thumb" ') > -1) {
					body = body.slice(body.indexOf('class="thumb" '));
					body = body.slice(body.indexOf('href="') + 6);
					body = body.slice(0, body.indexOf('"'));
					body = decodeURIComponent(body);
					message.channel.sendFile(body, "image.png", "First image found for query: " + searchTerm);
				} else message.channel.sendMessage("There is no image found for query " + searchTerm);
			}
		});
	});
}




