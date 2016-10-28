var request = require('request');
var imgur = require('imgur-node-api');
imgur.setClientID('78a1f156363e18d');
exports.exec = (bot, message) => {
	msg = message.content.trim();
	msg.replace(/https?:\/\/(www\.)?pixiv\.net\/member_illust\.php[^ ]+/g, function(match) {
		message.channel.sendMessage('Retrieving links...').then(msg => {
			request(match, function (err, res, body) {
				body = body.slice(body.indexOf('data-title="registerImage'));
				body = body.slice(body.indexOf('src="') + 5);
				body = body.slice(0, body.indexOf('"'));
				body = decodeURIComponent(body);
				msg.edit("Link retrieved, uploading to imgur...");
				imgur.upload(body, function (err, res) {
					msg.edit("Uploading to discord...");
					message.channel.sendFile(res.data.link, "photo.png", "<" + match + ">").then(() => { msg.delete(); message.delete(); }).catch(console.log);
				});
			});
		});
	});
}