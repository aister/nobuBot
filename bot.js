var http = require('https'), vm = require('vm'), concat = require('concat-stream');
	var Discord = require("discord.js");
	var nobuBot = new Discord.Client();
	nobuBot.on("message", msg => {
		if (msg.author.id == "184369428002111488" && msg.content == "$reload") {
			getCode(function() {
				msg.channel.sendMessage("Code Reloaded!")
			});
		}
	});
	nobuBot.login(process.env.TOKEN2);
	var vmbot = {console, require, nobuBot, process, __dirname};
	vmbot.setTimeout = setTimeout;
	vmbot.setInterval = setInterval;
	//vmbot.require = function(module) { return require(module); }
function getCode(callback = function() {}) {
	http.get( 'https://raw.githubusercontent.com/aister/nobuBot/master/index.js', function( res ){
		res.setEncoding('utf8');
		res.pipe(concat({ encoding: 'string' }, function(remoteSrc) {
			vm.runInNewContext(remoteSrc, vmbot);
			callback();
		}));
	});
}
getCode();