	var Discord = require("discord.js");
	var nobuBot = new Discord.Client();
	nobuBot.login(process.env.TOKEN2);
var request = require("request");
var http    = require("http");
var mysql   = require('mysql');
var schedule = require('node-schedule');
var url = require('url');
var ytdl = require('ytdl-core');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000;
var nani = require("nani").init(process.env.NANIID, process.env.NANISECRET);
app.use(express.static(__dirname + '/public'));
server.listen(port);

var prefix = "$";
var session = 0;
var game = 0;
var rndP = [];
var story = [];
var p = [];
var submitter = [];
var commands = {};
var fight = [];
var challenger = [];
var PrevRoles = {};
var match = [];
var games = {};
var servants = {};
var commands = {};
var emoji = {};
var reply = {};
var event = "";
var ascii = {};
var premium = ["217325563516420096", "217282275350544384"];
function GetRoleID(e, role)
{
	admin = e.guild.roles.find("name", role);
	return admin;
}
function HasRole(e, role, user)
{
	return user.roles.exists("name", role);
}
function rnd(max) {
	return Math.floor(Math.random() * max);
}
function randomlist() {
	if (rndP.length > 0)
	{
		p = rndP;
	}
	rndP = [];
	count = p.length;
	for (i = 0; i < count; i++)
	{
		rand = rnd(p.length);
		rndP.push(p[rand]);
		p.splice(rand, 1);
	}
}
function getOrderedGroups(roles) {
  return roles.sort((r1, r2) => {
    if(r1.position != r2.position) {
      return r2.position - r1.position;
    }
    return r1.id-r2.id
  })
}
var stream;
function matchprocess(m, mStr, w, l) {
	mStr = mStr.replace(/<w>/g, w);
	mStr = mStr.replace(/<l>/g, l);
	m.channel.sendMessage(mStr);
	setTimeout(function() { 
		kill(m, l);
		revive(m, l, 2);
	}, 2000);
}
function kill(message, user) {
	if (message.guild) {
		user = message.guild.members.find("id", user.id);
		user.addRole("218012980019724288");
	}
}
function revive(message, user, t) {
	if (message.guild) {
		setTimeout(function() {
			user = message.guild.members.find("id", user.id);
			user.removeRole('218012980019724288');
			message.channel.sendMessage(user.user + " đã sống lại!")
		}, t * 60000);
	}
}
function gg(q, image, callback) {
	q = encodeURI(q);
	if (image) {
		request('http://www.bing.com/images/search?q=' + q, function(err, res, body) {
			if (err) callback(err);
			else {
				body = body.slice(body.indexOf('class="thumb" '));
				body = body.slice(body.indexOf('href="') + 6);
				body = body.slice(0, body.indexOf('"'));
				callback(body);
			}
		});
	} else {
		request('https://www.google.com/search?q=' + q, function(err, res, body) {
			if (err) callback(err);
			else {
				body = body.slice(body.indexOf('/url?q=') + 7);
				body = body.slice(0, body.indexOf('&'));
				callback(body);
			}
		});
	}
}
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
var jsonUrl = "http://www.moesocial.com/discordbot.json";
function load_custom_command() {
	commands = [];
	request({
		url: jsonUrl,
		json: true
	}, function (error, response, body) {

		if (!error && response.statusCode === 200) {
			tempObj = body.customcommand;
			for (i = 0; i < tempObj.length; i++) {
				commands[tempObj[i].command] = tempObj[i].respond;
			}
			match = body.match;
			games = body.game;
			tempObj = body.emoji;
			for (i = 0; i < tempObj.length; i++) {
				emoji[tempObj[i].command] = tempObj[i].respond;
			}
			rndSpam = body.random;
			ascii = body.ascii;
			servants = body.servant;
			CE = body.CE;
		}
	});
}
load_custom_command();
io.on('connection', function (socket) {
	socket.on('load', function (data, callback) {
		load_custom_command();
		switch(data) {
			case "servant":
				callback(servants);
				break;
			case "ce":
				callback(CE);
				break;
		}
	});
});


nobuBot.on('ready', () => {
	console.log("Nobu!");
});
atkType = {
	"01": "Quick",
	"02": "Arts",
	"03": "Buster"
}
nobuBot.on('message', (message) => {
	var msg = message.content.trim();
	msgArray = msg.split(' ');
	if (msg.includes("I love you")) message.channel.sendMessage("I love Emilia");
	else if (!message.member.bot) {
		switch (msgArray[0])
		{
			case prefix + "say":
				if (message.author.id == "184369428002111488") {
					nobuBot.channels.get(msgArray[1]).sendMessage(msgArray.slice(2).join(' '));
				}
				break;
			case prefix + "banner":
				msgArg = msgArray.slice(1).join(' ');
				temp = "http://moesocial.com/banner.php?text=" + encodeURI(msgArg);
				message.channel.sendFile(temp, "banner.png");
				break;
			case prefix + "ascii":
				msgArg = msg.slice(msg.indexOf(' ') + 1).toLowerCase();
				if (/^[a-z ]*$/.test(msgArg) != false) {
					msgArg = msgArg.split("");
					data = ["", "", "", ""];
					for (i = 0; i <= msgArg.length; i++) {
						if (i == msgArg.length) message.channel.sendMessage("```\n" + data.join("\n") + "```");
						else {
								item = msgArg[i];
							if (item in ascii) {
								data[0] += ascii[item][0];
								data[1] += ascii[item][1];
								data[2] += ascii[item][2];
								data[3] += ascii[item][3];
							} else if (item == " ") {
								data[0] += "  ";
								data[1] += "  ";
								data[2] += "  ";
								data[3] += "  ";
							}
						}
					}
				} else message.channel.sendMessage("Invalid character");
				break;
			case prefix + "anilist":
				tempArray = msgArray;
				if (tempArray[1] == "custom") {
					message.channel.sendMessage("Searching...").then(msg => {
						nani.get(encodeURI(tempArray.slice(1).join(' '))).then(data => {
							msg.edit(JSON.stringify(data, null, "    "));
						}).catch(console.log);
					});
				} else if (["anime", "manga", "staff", "character", "studio"].indexOf(tempArray[1]) >= 0) {
					message.channel.sendMessage("Searching...").then(msg => {
						nani.get(tempArray[1] + "/search/" + encodeURI(tempArray.slice(2).join(' '))).then(data => {
							if (data.error) {
								msg.edit("No result found");
							} else if (data.length == 1) {
								data = defyNull(data[0]);
								if (data.adult || !data.image_url_med) msg.edit(aniDetail(tempArray[1], data));
								else {
									msg.delete();
									message.channel.sendFile(data.image_url_med, "Image.png", aniDetail(tempArray[1], data));
								}
							} else {
								temp = "";
								resultObj = {};
								data.forEach(item => {
									item = defyNull(item);
									switch (tempArray[1]) {
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
														console.log(aniDetail(tempArray[1], deep));
														if (deep.adult || !deep.image_url_med) anotherMsg.edit(aniDetail(tempArray[1], deep)).then(temp => { collector.stop(); });
														else {
															anotherMsg.delete();
															message.channel.sendFile(deep.image_url_med, "Image.png", aniDetail(tempArray[1], deep)).then(temp => { collector.stop(); });
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
				break;
			case prefix + "eval":
				if (message.author.id == "184369428002111488") {
					code = msgArray.slice(1).join(' ');
					if (!code.length) return message.channel.sendMessage('there\'s no code!');
					try {
						message.channel.sendMessage("`INPUT:`\n```\n" + code + "\n```\n`OUTPUT:`\n```\n" + eval(code) + "\n```");
					} catch(err) {
						message.channel.sendMessage("`INPUT:`\n```\n" + code + "\n```\n`ERROR:`\n```\n" + err + "\n```");
					}
				}
				break;
			case prefix + "touhou":
				msgArg = msg.slice(msg.indexOf(' ') + 1);
				msgArg = "http://touhou.wikia.com/api/v1/Search/List?lang=en&limit=1&batch=1&query=" + encodeURI(msgArg);
				request({ url: msgArg, json: true }, function(err, res, body) {
					if (body.items) {
						msgArg = "http://touhou.wikia.com/api/v1/Articles/Details?abstract=500&ids=" + body.items[0].id;
						request({ url: msgArg, json: true }, function(err, res, body2) {
							body2 = body2.items[body.items[0].id];
							if (body2.thumbnail) message.channel.sendFile(body2.thumbnail, "image.png", body2.abstract.replace(/\[view\] \u2022 \[talk\] /g, "") + "\n\n<http://touhou.wikia.com" + body2.url + ">");
							else message.channel.sendMessage(body2.abstract.replace(/\[view\] \u2022 \[talk\] /g, "") + "\n\n<http://touhou.wikia.com" + body2.url + ">");
						});
					} else message.channel.sendMessage("Not found");
				});
				break;
			case prefix + "ce":
				if (msgArray.length > 1) {
					message.channel.sendMessage("Searching...").then(mes => {
						args = msg.slice(msg.indexOf(' ') + 1).split(' ');
						if (args.length >= 2) {
							results = [];
							key2 = args[0];
							if (key2 == "id") results.push(args.slice(1).join(' ').toLowerCase());
							else {
								if (key2 == "class") key2 = "servantClass";
								for (var key in CE.list) {
									if (CE.list[key][key2].toLowerCase().includes(args.slice(1).join(' ').toLowerCase())) {
										results.push(key);
									}
								}
							}
							if (results.length == 1) {
								result = CE.list[results[0]];
								mes.delete();
								message.channel.sendFile(result.image, "image.png", "**" + result.name + " (ID: " + results[0] + ")**").then(mes2 => {
									message.channel.sendMessage("**Link:** <" + result.link
										+ ">\n\n**Cost:** " + result.cost
										+ "\n**HP:** " + result.baseHP + " (" + result.maxHP + "\n**ATK:** " + result.baseATK + " (" + result.maxATK
										+ "\n\n**Description:**\n" + result.desc + "\n\n**Note:** " + result.note, {"split": true }
									);
								});
							} else if (results.length > 1) {
								temp = "";
								for (i = 0; i <= results.length; i++) {
									if (i == results.length) mes.edit(temp);
									else temp += results[i] + ": " + CE.list[results[i]].name + "\n";
								}
							} else mes.edit("Cannot found CE");
						} else mes.edit("Wrong syntax");
					});
				} else { 
					message.channel.sendMessage("Check the list of servants here: https://lmaobot.herokuapp.com/?mode=ce");
				}
				break;
			case prefix + "servant":
				if (msgArray.length > 1) {
					message.channel.sendMessage("Searching...").then(mes => {
						args = msg.slice(msg.indexOf(' ') + 1).split(' ');
						if (args.length >= 2) {
							results = [];
							key2 = args[0];
							if (key2 == "id") results.push(args.slice(1).join(' ').toLowerCase());
							else {
								if (key2 == "class") key2 = "servantClass";
								for (var key in servants.list) {
									if (servants.list[key][key2].toLowerCase().includes(args.slice(1).join(' ').toLowerCase())) {
										results.push(key);
									}
								}
							}
							if (results.length == 1) {
								result = servants.list[results[0]];
								attacks = result.attacks;
								attacks = attacks.map(function(atk) { return atkType[atk]; });
								mes.delete();
								message.channel.sendFile(result.image, "image.png", "**" + result.name + " (ID: " + results[0] + ")**").then(mes2 => {
									message.channel.sendMessage("**Link:** <" + result.link
										+ ">\n\n**Class:** " + result.servantClass + "\n**Cost:** " + result.cost
										+ "\n**HP:** " + result.baseHP + " (" + result.maxHP + "\n**ATK:** " + result.baseATK + " (" + result.maxATK
										+ "\n**Attacks:** " + attacks.join(", ") + "\n\n**NP:**\nType: " + atkType[result.NP.slice(0,2)] + "\n" + result.NP.slice(3)
										+ "\n\n**Skills:**\n" + result.skills + "\n\n**Note:**\n" + result.note, {"split": true }
									);
								});
							} else if (results.length > 1) {
								temp = "";
								for (i = 0; i <= results.length; i++) {
									if (i == results.length) mes.edit(temp);
									else temp += results[i] + ": " + servants.list[results[i]].name + " (" + servants.list[results[i]].servantClass + ")\n";
								}
							} else mes.edit("Cannot found Servant");
						} else mes.edit("Wrong syntax");
					});
				} else { 
					message.channel.sendMessage("Check the list of servants here: https://lmaobot.herokuapp.com/?mode=ce");
				}
				break;
			case prefix + "cirno":
				message.channel.sendFile("http://moesocial.com/cirno.php?text=" + encodeURI(msgArray.slice(1).join(" ")), "cirno.png"); 
				break;
			case prefix + "search":
				searchTerm = msgArray.slice(2).join(' ');
				switch (msgArray[1]) {
					case "image":
						message.channel.sendMessage("Searching...").then(msg => {
							gg(searchTerm, true, function(data) {
								msg.delete();
								if (data) message.channel.sendFile(data, "image.png", "First image found for query: " + searchTerm);
								else message.channel.sendMessage("There is no image found for query " + searchTerm);
							});
						});
						break;
					case "google":
						message.channel.sendMessage("Searching...").then(msg => {
							gg(searchTerm, false, function(data) {
								if (data) msg.edit("First result found for query " + searchTerm + ": " + data);
								else msg.edit("There is no result found for query " + searchTerm);
							});
						});
						break;
					case "yt":
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
						break;
				}
				break;
			case prefix + "help":
				message.channel.sendMessage("" +
					//"**Music:** `$play <url | playlist url>` `$next` `$leave` `$current` `$queue` `$vol <number from 0 to 1>`\n\n" +
					"**Fate Grand Order:** `$ce <search category: name|id|class> <search term>` `$servant <search category: name|id|class> <search term>`\n\n" +
					"**Wikia:** `$touhou <search term>`\n\n" + 
					"**Others:** `$image <image search term>`\n\n" +
					//"**Setting:** `$setting <setting name> <value>` (use `$setting` only to see available settings, omit value to check current value)"
					+ ""
				);
				break;
			case prefix + "cload":
				if (message.author.id == "184369428002111488") {
					load_custom_command();
					message.channel.sendMessage("Successfully loaded");
				}
				break;
/* ================ PREMIUM SERVER COMMANDS =============== */
			case prefix + "skip":
				if (message.channel.id == '221818180694179840') {
					if (!HasRole(message, "Admin", message.member)) message.channel.sendMessage("Bạn phải là Admin để thực hiện lệnh này");
					else if (game == 2 && session == 2)
					{
						pos++;
						if (pos == rndP.length) pos = 0;
						message.channel.sendMessage(story.join(". "));
						setTimeout( function(){
							repeat = "Story Game: Đến lượt của " + message.guild.members.find("id", rndP[pos]).user + ". Hãy sử dụng lệnh `" + prefix + "storyAdd` để viết tiếp câu chuyện";
							message.channel.sendMessage(repeat);
						}, 2000);
					}
				}
				break;
			case prefix + "join":
				if (message.channel.id == '221818180694179840') {
					if (session == 0) message.channel.sendMessage("Không có trò chơi nào đang diễn ra lúc này, không thể tham gia trò chơi");
					else if (session == 1)
					{
						if (p.indexOf(message.member.id) == -1)
						{
							p.push(message.member.id);
							message.channel.sendMessage(message.author + " đã tham gia " + games[game - 1].name);
						}
						else
							message.channel.sendMessage(message.author + " đã trong danh sách tham gia " + games[game - 1].name);
					}
					else message.channel.sendMessage("Trò chơi đang diễn ra, không thể tham gia lúc này. Để tham gia, trò chơi cần phải được ngừng bằng lệnh `" + prefix + "stop`");
				}
				break;
			case prefix + "repeat":
				if (message.channel.id == '221818180694179840') {
					if (game == 2)
					{
						message.channel.sendMessage(story.join(". "));
						setTimeout( function(){
							message.channel.sendMessage(repeat);
						}, 2000);
					} else message.channel.sendMessage(repeat);
				}
				break;
			case prefix + "start":
				if (message.channel.id == '221818180694179840') {
					if (!HasRole(message, "Admin", message.member)) message.channel.sendMessage("Bạn phải là Admin để thực hiện lệnh này");
					else
					{
						if (session >= 1)
						{
							session = 2;
							var count, rand;
							switch(game)
							{
								case 1:
									message.channel.sendMessage("Ousama Game đã bắt đầu vòng mới - mọi người kiểm tra PM để biết số của mình");
									randomlist();
									rndP.forEach(function(participant)
									{
										message.guild.members.find("id", participant).sendMessage("Số của bạn là số " + (rndP.indexOf(participant) + 1) + ". Hãy giữ bí mật số của mình nhé!");
									});
									rand = rnd(rndP.length);
									repeat = "Ousama Game: vua là số " + (rand + 1) + ": " + message.guild.members.find("id", rndP[rand]).user + ". Có tổng cộng " + rndP.length + " ngÆ°á»i chÆ¡i trong vÃ²ng nÃ y";
									message.channel.sendMessage(repeat);
									break;
								case 2:
									message.channel.sendMessage("Story Game đã bắt đầu vòng mới");
									story.push("Story Game: Ngày xửa ngày xưa..");
									submitter.push(message.member.id);
									randomlist();
									pos = 0;
									message.channel.sendMessage(story[0] + ".");
									repeat = "Story Game: Đến lượt của " + message.guild.members.find("id", rndP[pos]).user + ". Hãy sử dụng lệnh `" + prefix + "storyAdd` để viết tiếp câu chuyện";
									message.channel.sendMessage(repeat);
									break;
								case 3:
									message.channel.sendMessage("Truth or Dare Game đã bắt đầu vòng mới");
									randomlist();
									repeat = "Truth or Dare Game: " + message.guild.members.find("id", rndP[0]).user + " đã bị chọn, người hỏi là ";
									if (rndP.length <= 1) repeat += message.guild.members.find("id", rndP[0]).user;
									else repeat += message.guild.members.find("id", rndP[1]).user;
									message.channel.sendMessage(repeat);
									break;
								default:
									break;
							}
						}
						else
						{
							message.channel.sendMessage("Không có trò nào đang diễn ra, không thể bắt đầu trò chơi");
						}
					}
				}
				break;
			case prefix + "result":
				if (message.channel.id == '221818180694179840') {
					if (!HasRole(message, "Admin", message.member)) message.channel.sendMessage("Bạn phải là Admin để thực hiện lệnh này");
					else
					{
						if (game == 2 && session == 2)
						{
							i = 0;
							temp = "```\n";
							story.forEach(function (line)
							{
								temp += message.guild.members.find("id", submitter[i]).user.name + ": \n" + line + "\n\n";
								i++;
							});
							temp += "```";
							message.channel.sendMessage(temp);
						}
					}
				}
				break;
			case prefix + "stop":
				if (message.channel.id == '221818180694179840') {
					if (!HasRole(message, "Admin", message.member)) message.channel.sendMessage("Bạn phải là Admin để thực hiện lệnh này");
					else
					{
						if (session >= 1)
						{
							message.channel.sendMessage(games[game - 1].name + " đã kết thúc, cám ơn các bạn đã tham gia");
							p = [];
							rndP = [];
							session = 0;
							game = 0;
						}
						else
						{
							message.channel.sendMessage("Không có trờ chơi nào đang diễn ra lúc này");
						}
						mybot.user.setStatus("online", null);
					}
				}
				break;
			case prefix + "whois":
				if (message.channel.id == '221818180694179840') {
					if (session == 0) message.channel.sendMessage("Không có game nào đang diễn ra, không thể thực hiện lệnh");
					else if (session == 1) message.channel.sendMessage("Game chưa bắt đầu, không thể thực hiện lệnh");
					else
					{
						if (!HasRole(message, "Admin", message.member)) message.channel.sendMessage("Bạn phải là admin để thực hiện lệnh này");
						else
						{
							if (!isNaN(msg.slice(msg.indexOf(' ') + 1)))
							{
								i = parseInt(msg.slice(msg.indexOf(' ') + 1))
								if (rndP.length >= i)
								{
									message.channel.sendMessage("Người số " + i + " là  " + message.guild.members.find("id", rndP[i - 1]).user);
								}
								else
								{
									message.channel.sendMessage("Không có người số " + i);
								}
							}
							else
							{
								message.channel.sendMessage("Sai cấu trúc lệnh");
							}
						}
					}
				}
				break;
			case prefix + "add":
				if (message.mentions.users.array().length > 0 && session == 2 && message.channel.id == '221818180694179840') {
					temp = "";
					message.mentions.users.array().forEach(function(user) {
						if (rndP.indexOf(user) == -1)
						{
							rndP.push(user.id);
							temp += user.user + " đã tham gia " + games[game - 1].name + '\n';
						}
						else
							temp += user.user + " đã trong danh sách tham gia " + games[game - 1].name + '\n';
					});
					message.channel.sendMessage(temp);
				}
				break;
			case prefix + "remove":
				if (message.mentions.users.array().length > 0 && session >= 1 && message.channel.id == '221818180694179840') {
					temp = "";
					message.mentions.users.array().forEach(function(user) {
						if (rndP.indexOf(user.id) > -1)
						{
							rndP.splice(rndP.indexOf(user.id), 1);
							temp += user.user + " đã rời khỏi " + games[game - 1].name + '\n';
						}
						else if (p.indexOf(user.id) > -1) {
							p.splice(p.indexOf(user.id), 1);
							temp += user.user + " đã rời khỏi " + games[game - 1].name + '\n';
						} else
							temp += user.user + " không có trong danh sách tham gia " + games[game - 1].name + '\n';
					});
					message.channel.sendMessage(temp);
				}
				break;
			case prefix + "begin":
				if (message.channel.id == '221818180694179840') {
					if (!HasRole(message, "Admin", message.member)) message.channel.sendMessage("Bạn phải là Admin để thực hiện lệnh này");
					else
					{
						rndP = [];
						p = [];
						story = [];
						game = 0;
						switch (msg.slice(msg.indexOf(' ') + 1))
						{
							case "ousama":
								game = 1;
								break;
							case "story":
								game = 2;
								break;
							case "tod":
								game = 3;
								break;
							default:
								message.channel.sendMessage("Không có game này trong database");
								break;
						}
						if (game != 0) {
							session = 1;
							mybot.user.setStatus("online", games[game - 1].name);
							message.channel.sendMessage(games[game - 1].name + " đã được bắt đầu. Để tham gia mời gõ lệnh `" + prefix + "join`.");
						}
					}
				}
				break;
			case prefix + "storyadd":
				if (session == 2 && game == 2 && message.member.id == rndP[pos] && message.channel.id == '221818180694179840')
				{
					temp = msg.slice(msg.indexOf(' ') + 1);
					story.push(temp.charAt(0).toUpperCase() + temp.slice(1));
					submitter.push(message.member.id);
					pos++;
					if (pos == rndP.length) pos = 0;
					message.channel.sendMessage(story.join(". "));
					setTimeout( function(){
						repeat = "Story Game: Đến lượt của " + message.guild.members.get("id", rndP[pos]).user + ". Hãy dùng lệnh `" + prefix + "storyAdd` để viết tiếp câu truyện.";
						message.channel.sendMessage(repeat);
					}, 2000);
				}
				break;
			case prefix + "kill":
				if (message.guild && premium.indexOf(message.guild.id) >= 0) {
					if (!HasRole(message, "Admin", message.member)) message.channel.sendMessage("Bạn phải là Admin để thực hiện lệnh này");
					else
					{
						if (message.mentions.users.array().length > 0) {
							user = message.mentions.users.array()[0];
							if (user.id in PrevRoles) message.channel.sendMessage(user + " đã chết rồi, hãy để hắn yên nghỉ!");
							else {
								kill(message, user);
								message.channel.sendMessage(message.author + " đã giết " + user + ". " + user + " sẽ được hồi sinh trong 1 phút");
								revive(message, user, 1);
							}
						}
					}
				}
				break;
			case prefix + "revive":
				if (message.guild && premium.indexOf(message.guild.id) >= 0) {
					if (!HasRole(message, "Admin", message.member)) message.channel.sendMessage("Bạn phải là Admin để thực hiện lệnh này");
					else if (message.mentions.users.array().length > 0) {
						user = message.mentions.users.array()[0];
						revive(message, user, 0);
					}
				}
				break;
			case prefix + "fight":
				if (message.channel.id == "222738247942537216") {
					if (HasRole(message, "Admin", message.member)) message.channel.sendMessage("Admin không thể thực hiện lệnh này");
					else {
						if (message.mentions.users.array().length > 0) {
							user = message.mentions.users.array()[0];
							if (fight.indexOf(user.id) >= 0) message.channel.sendMessage(user + " hiện đang được thách đấu. Bạn không thể thách đấu người này");
							else if (challenger.indexOf(message.member.id) >= 0) message.channel.sendMessage("Bạn hiện đang thách đấu người khác, và không thể thách đấu trong lúc này");
							else if (user.id == message.member.id) message.channel.sendMessage("Bạn không thể thách đấu với chính mình");
							else
							{
								message.channel.sendMessage(user + ", " + message.author + " muốn thách đấu với bạn. Bạn có 20 giây để trả lời `" + prefix + "yes` hoặc `" + prefix + "no` để chấp nhận hoặc từ chối lời thách đấu");
								fight.push(user.id);
								challenger.push(message.member.id);
								setTimeout(function() {
									if (fight.indexOf(user.id) >= 0)
									{
										message.channel.sendMessage("Đã quá 20 giây và " + user + " đã không trả lời lời thách đấu của " + message.author + ". Lời thách đấu vô hiệu");
										fight.splice(fight.indexOf(user.id), 1);
										challenger.splice(fight.indexOf(message.member.id), 1);
									}
								}, 20000);
							}
						} else message.channel.sendMessage("Invalid format");
					}
				}
				break;
			case prefix + "yes":
				if (fight.indexOf(message.member.id) >= 0 && message.channel.id == '222738247942537216')
				{
					chIndex = fight.indexOf(message.member.id);
					ch = challenger[chIndex];
					challenger.splice(chIndex, 1);
					fight.splice(chIndex, 1);
					if (HasRole(message, "Admin", message.member))
					{
						loser = message.guild.members.find("id", ch).user;
						user = message.author;
						matchprocess(message, match[0], user, loser);
					}
					else
					{
						if (rnd(2) == 0)
						{
							loser = message.author;
							user = message.guild.members.find("id", ch).user;
						}
						else
						{
							loser = message.guild.members.find("id", ch).user;
							user = message.author;
						}
						matchprocess(message, match[rnd(match.length - 1) + 1], user, loser);
					}
				}
				break;
			case prefix + "no":
				if (fight.indexOf(message.member.id) >= 0 && message.channel.id == '222738247942537216')
				{
					chIndex = fight.indexOf(message.member.id);
					ch = challenger[chIndex];
					challenger.splice(chIndex, 1);
					fight.splice(chIndex, 1);
					message.channel.sendMessage(message.author + " đã từ chối lời mời thách đấu của " + message.guild.members.find("id", ch).user);
				}
				break;
			case prefix + "roulette":
				if (message.channel.id == '222738247942537216') {
					message.channel.sendMessage(message.author + " put the gun on his head :persevere: :gun:");
					setTimeout(function() {
						if (HasRole(message, "Admin", message.member))
						{
							message.channel.sendMessage("The gun fires, but the bullet bounced out of " + message.author + "'s head.");
						}
						else if (rnd(6) >= 3)
						{
							message.channel.sendMessage("The gun fires. And " + message.author + " lays dead on the ground. He will be revived after 1 minute");
							kill(message, message.member);
							revive(message, message.member, 1);
						}
						else
						{
							message.channel.sendMessage("The gun clicks. " + message.author + " survives for another day");
						}
					}, 2000);
				}
				break;
			case prefix + "list":
				if (message.channel.id == '222738247942537216') {
					if (!HasRole(message, "Admin", message.member)) message.channel.sendMessage("Bạn phải là Admin để thực hiện lệnh này");
					else if (session == 0) message.channel.sendMessage("Không có game nào đang diễn ra lúc này");
					else
					{
						temp = "Những người đã tham gia chơi " + games[game - 1].name + ":\n```\n";
						if (rndP.length == 0)
						{
							p.forEach(function (participant)
							{
								temp += message.guild.members.find("id", participant).user.name + "\n";
							});
							temp += "```";
							message.channel.sendMessage(temp);
						}
						else
						{
							i = 0;
							rndP.forEach(function (participant)
							{
								i++;
								if (game == 1) temp += i + ": ";
								temp += message.guild.members.find("id", participant).user.name + "\n";
							});
							temp += "```";
							message.channel.sendMessage(temp);
						}
					}
				}
				break;
/* ================= END PREMIUM SERVER COMMANDS ============ */
			default:
				if (msg in emoji) message.channel.sendFile(emoji[msg]);
				else if (msg.charAt(0) == prefix && msg.slice(1) in commands) message.channel.sendMessage(commands[msg]);
				break;
		}
	}
});
nobuBot.on("guildMemberAdd", (guild, member) => {
	guild.defaultChannel.sendMessage("Welcome " + member.user + " to " + guild.name);
});
setInterval(function() {
	load_custom_command();
	http.get("http://lmaobot.herokuapp.com");
}, 300000);













process.on('uncaughtException', function(err) {
  // Handle ECONNRESETs caused by `next` or `destroy`
  if (err.code == 'ECONNRESET') {
    // Yes, I'm aware this is really bad node code. However, the uncaught exception
    // that causes this error is buried deep inside either discord.js, ytdl or node
    // itself and after countless hours of trying to debug this issue I have simply
    // given up. The fact that this error only happens *sometimes* while attempting
    // to skip to the next video (at other times, I used to get an EPIPE, which was
    // clearly an error in discord.js and was now fixed) tells me that this problem
    // can actually be safely prevented using uncaughtException. Should this bother
    // you, you can always try to debug the error yourself and make a PR.
    console.log('Got an ECONNRESET! This is *probably* not an error. Stacktrace:');
    console.log(err.stack);
	return;
  } else {
    // Normal error handling
    console.log(err);
    console.log(err.stack);
	return;
  }
});