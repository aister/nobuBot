var http = require('https'), vm = require('vm'), concat = require('concat-stream');
	var Discord = require("discord.js");
	var nobuBot = new Discord.Client();
	nobuBot.login(process.env.TOKEN2);
	var vmbot = {console, require, nobuBot, process, __dirname};
	vmbot.setTimeout = setTimeout;
	vmbot.setInterval = setInterval;
	//vmbot.require = function(module) { return require(module); }
function getCode(callback = function() {}) {
	http.get( 'https://raw.githubusercontent.com/aister/nobuBot/master/index.js', function( res ){
		nobuBot.removeAllListeners();
		nobuBot.on("message", msg => {
			if (msg.author.id == "184369428002111488" && msg.content == "$reload") {
				getCode(function() {
					msg.channel.sendMessage("Code Reloaded!")
				});
			}
		});
		res.setEncoding('utf8');
		res.pipe(concat({ encoding: 'string' }, function(remoteSrc) {
			vm.runInNewContext(remoteSrc, vmbot);
			callback();
		}));
	});
}
getCode();














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