exports.help = "$anilist <anilist search query> :: Anilist Search";
function defyNull(obj) {
	for (var key in obj) {
		if (obj[key] === null) obj[key] = "";
	}
	return obj;
}
function aniDetail(type, data) {
	switch (type) {
		case "manga":
			temp = data.description;
			temp = temp.replace(/<br \/>/g, "");
			if (temp.length > 400) temp = temp.slice(0, 396);
			data = "**" + data.title_romaji + "**\n" + data.title_english + "\n\n" +
				"Genre: " + data.genres.join(", ") + "\n" +
				"Chapter: " + data.total_chapters + " (" + data.publishing_status + ")\n" +
				"Score: " + data.average_score + "\n" +
				"Type: " + data.type + "\n\n" + 
				"Synopsis:\n" + temp;
		case "anime":
			temp = data.description;
			temp = temp.replace(/<br \/>/g, "");
			if (temp.length > 400) temp = temp.slice(0, 396);
			data = "**" + data.title_romaji + "**\n" + data.title_english + "\n\n" +
				"Genre: " + data.genres.join(", ") + "\n" +
				"Episode: " + data.total_episodes + " (" + data.airing_status + ")\n" +
				"Score: " + data.average_score + "\n" +
				"Type: " + data.type + "\n\n" +
				"Synopsis:\n" + temp;
			break;
		case "staff":
			temp = data.info;
			temp = temp.replace(/<br \/>/g, "");
			if (temp.length > 400) temp = temp.slice(0, 396);
			data = "**" + data.name_first + " " + data.name_last + "***\n" + data.name_first_japanese + " " + data.name_last_japanese + "\n\n" + temp;
			break;
		case "studio":
			data = "**" + data.studio_name + "**\n\n" +	"Wiki: " + data.studio_wiki;
			break;
		case "character":
			console.log(data);
			temp = data.info;
			temp = temp.replace(/<br \/>/g, "");
			if (temp.length > 400) temp = temp.slice(0, 396);
			data = "**" + data.name_first + " " + data.name_last + "**\n" + data.name_japanese + "\n\n" + temp + "\n\n: Link: http://anilist.co/character/" + data.id;
			break;
		default:
			data = "";
			break;
	}
	return data;
}
var nani = require('nani');
exports.exec = (bot, message, msgArray) => {
	if (msgArray[1] == "custom") {
		message.channel.sendMessage("Searching...").then(msg => {
			nani.get(encodeURI(msgArray.slice(1).join(' '))).then(data => {
				msg.edit(JSON.stringify(data, null, "    "));
			}).catch(console.log);
		});
	} else if (["anime", "manga", "staff", "character", "studio"].indexOf(msgArray[1]) >= 0) {
		message.channel.sendMessage("Searching...").then(msg => {
			nani.get(msgArray[1] + "/search/" + encodeURI(msgArray.slice(2).join(' '))).then(data => {
				if (data.error) {
					msg.edit("No result found");
				} else if (data.length == 1) {
					data = defyNull(data[0]);
					if (data.adult || !data.image_url_med) msg.edit(aniDetail(msgArray[1], data));
					else {
						msg.delete();
						message.channel.sendFile(data.image_url_med, "Image.png", aniDetail(msgArray[1], data));
					}
				} else {
					temp = "";
					resultObj = {};
					data.forEach(item => {
						item = defyNull(item);
						switch (msgArray[1]) {
							case "anime":
							case "manga":
								temp += "ID: " + item.id + "\nTitle: " + item.title_romaji + " (" + item.title_english + ")\nType: " + item.type + "\n\n";
								break;
							case "staff":
							case "character":
								temp += "ID: " + item.id + "\nName: " + item.name_first + " " + item.name_last + "\n\n";
								break;
							case "studio":
								temp += "ID: " + item.id + "\nName: " + item.studio_name + "\n\n";
								break;
						}
						resultObj[item.id] = item;
					});
					msg.edit(temp + "**" + message.author + ", please type `$id <id number>` to pick one, or `$id 0` to cancel**").then(msg => {
						//collector = message.channel.createCollector(m => (m.author.id == message.author.id && m.content.startsWith("$id ")));
						collector = message.channel.createCollector(m => (m.author.id == message.author.id && m.content.startsWith("!id ")), {time: 60000});
						collector.on("message", m => {
							m = m.content.slice(4);
							if (m === "0") collector.stop();
							else if (m) {
								if (m in resultObj) {
									message.channel.sendMessage("Searching...").then(anotherMsg => {
										deep = resultObj[m];
										if (!debug) {
											console.log(aniDetail(msgArray[1], deep));
											if (deep.adult || !deep.image_url_med) anotherMsg.edit(aniDetail(msgArray[1], deep)).then(temp => { collector.stop(); });
											else {
												anotherMsg.delete();
												message.channel.sendFile(deep.image_url_med, "Image.png", aniDetail(msgArray[1], deep)).then(temp => { collector.stop(); });
											}
										} else message.channel.sendMessage(JSON.stringify(deep, null, "    "), {split: true});
									});
								} else message.channel.sendMessage("ID " + m + " is not found in the result list");
							} else message.channel.sendMessage("Please provide an ID, thank you");
						});
						collector.on("end", (collection, reason) => {
							if (reason == "time") message.channel.sendMessage("1 minute have passed, searching ended");
							msg.delete();
						});
					});
				}
			}).catch(console.log);
		});
	}
}