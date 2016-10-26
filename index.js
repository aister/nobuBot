var Discord = require("discord.js");
var nobuBot = new Discord.Client();
nobuBot.login(process.env.TOKEN2);

var http    = require("http");

var express = require('express')
var app = express()
app.set('port', (process.env.PORT || 5000))


app.listen(app.get('port'));

var fs = require('fs');
var exports;
var help;
exports = {};
help = "```asciidoc\n";
fs.readdirSync(__dirname + '/commands/').forEach(function(file) {
	if (file != "Admin") help += "== " + file + "\n";
	fs.readdirSync(__dirname + '/commands/' + file + '/').forEach(function(file2) {
		if (file2.match(/\.js$/) !== null && file2 !== 'index.js') {
			var name = file2.replace('.js', '');
			exports[name] = require('./commands/' + file + '/' + file2);
			if (file != "Admin") help += exports[name].help + '\n';
		}
	});
});
help += "```";
var request = require('request');
var emoji = require('./emoji.json');
var ping = 0;
var prefix = "$";
nobuBot.on('ready', () => {
	console.log("Nobu!");
});
nobuBot.on('message', (message) => {
	var msg = message.content.trim();
	if (msg.includes("I love you")) message.channel.sendMessage("I love Emilia");
	else if (!message.author.bot) {
		if (msg.charAt(0) == prefix) {
			msg = msg.slice(1);
			msgArray = msg.split(' ');
			ping = 0;
			if (msgArray[0] == 'ping') {
				msgArray = msgArray.slice(1);
				ping = Date.now();
			}
			if (msgArray[0].toLowerCase() in exports) {
				exports[msgArray[0].toLowerCase()].exec(nobuBot, message, msgArray, function() {
					if (ping) {
						message.channel.sendMessage('That command took ' + (Date.now() - ping) + ' ms, approx.');
					}
				});
			} else if (msgArray[0].toLowerCase() == "help") {
				if (msgArray[1] && msgArray[1] in exports)
					message.channel.sendMessage("```asciidoc\n== Help for command $" + msgArray[1] + ":\n" + exports[msgArray[1]].help + "```");
				else if (!msgArray[1]) message.channel.sendMessage(help);
			}
		} else {
			if (msg in emoji) message.channel.sendFile(emoji[msg]);
			msg.replace(/https?:\/\/danbooru\.donmai\.us\/posts\/\d+/g, function(match) {
				request({
					url: match + '.json',
					json: true
				}, function (err, res, body) {
					message.channel.sendFile("https://danbooru.donmai.us" + body.file_url);
				});
				return match;
			});
		}
	}
});
nobuBot.on("guildMemberAdd", (guild, member) => {
	guild.defaultChannel.sendMessage("Welcome " + member.user + " to " + guild.name);
});
setInterval(function() {
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