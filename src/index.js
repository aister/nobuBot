var Discord = require("discord.js");
var http  = require("http");
var express = require('express');
var fs = require('fs');
function isBlacklist(commands, text) {
  if (commands) return commands.indexOf(text) >= 0;
  else return false;
}
module.exports = (config, emoji, commands) => {
  var nobuBot = new Discord.Client();
  if (config.selfbot) nobuBot.login(config.email, config.password);
  else nobuBot.login(config.botToken || process.env.TOKEN2);


  var app = express();
  app.set('port', (process.env.PORT || 3000));


  app.listen(app.get('port'));

  var exportedCommands;
  var help;
  var prefix;
  function load(callback) {
    exportedCommands = {};
    web = {};
    webList = [];
    prefix = process.env.PREFIX || config.prefix;
    help = "```asciidoc\n";
    fs.readdirSync(__dirname + '/../commands/').forEach(function(file) {
      if (!isBlacklist(commands, file)) {
        if (!file.startsWith('!')) help += "== " + file + "\n";
        fs.readdirSync(__dirname + '/../commands/' + file + '/').forEach(function(file2) {
          if (file2.match(/\.js$/) !== null && file2 !== 'index.js') {
            var name = file2.replace('.js', '');
            if (!isBlacklist(commands, file + '/' + name)) {
              if (file != "!Website") {
              	delete require.cache[require.resolve('../commands/' + file + '/' + file2)];
                exportedCommands[name] = require('../commands/' + file + '/' + file2);
              } else {
                webList.push(name);
                web[name] = require('../commands/' + file + '/' + file2);
              }
              if (!file.startsWith('!')) {
                help += prefix + exportedCommands[name].help + '\n';
                console.log(exportedCommands[name].help);
              }	
            }
          }
        });
      }
    });
    help += "```";
    if (typeof callback == "function") {
      console.log(help);
      callback();
    }
  }
  load();
  var ping = 0;
  nobuBot.on('ready', () => {
    console.log("Nobu!");
    if (config.logChannel && (channel = nobuBot.channels.get(config.logChannel))) channel.sendMessage("Bot is running. " + process.env.HEROKU_RELEASE_VERSION || "");
  });
  nobuBot.on('message', (message) => {
    var msg = message.content.trim();
    if (!message.author.bot) {
      if (config.selfbot && message.author.id !== config.ownerID) return;
      if (msg.startsWith(prefix)) {
        msg = msg.slice(prefix.length);
        msgArray = msg.split(' ');
        ping = 0;
        if (message.author.id == config.ownerID) {
        	if (!isBlacklist(commands, msgArray[0])) {
	        	switch (msgArray[0]) {
	        		case "ping":
	        			msgArray = msgArray.slice(1);
	          		ping = Date.now();
	          		break;
	          	case "reload":
	          		load(function() {message.channel.sendMessage('Code reloaded!'); });
	          		break;
	          	case "inspect":
	        	     msgArray.slice(1).forEach(command => {
						      if (command.toLowerCase() in exportedCommands) {
						        message.channel.sendMessage('The code for command ' + prefix + command + ":```js\n" + exportedCommands[command].exec.toString() + '```');
						      } else {
						        message.channel.sendMessage("There's no command " + prefix + command);
						      }
						    });
	        	     break;
	          }
	        }
        }
        if (msgArray[0].toLowerCase() in exportedCommands) {
          exportedCommands[msgArray[0].toLowerCase()].exec(nobuBot, message, msgArray, function() {
            if (ping) {
              message.channel.sendMessage('That command took ' + (Date.now() - ping) + ' ms, approx.');
            }
          });
        } else if (msgArray[0].toLowerCase() == "help") {
          if (msgArray[1] && msgArray[1] in exportedCommands)
            message.channel.sendMessage("```asciidoc\n== Help for command " + prefix + msgArray[1] + ":\n" + exportedCommands[msgArray[1]].help + "```");
          else if (!msgArray[1]) message.channel.sendMessage(help);
        }
      } else {
        if (msg in emoji) {
          if (emoji[msg].includes("http://")) message.channel.sendFile(emoji[msg]);
          else message.channel.sendMessage(emoji[msg]);
        }
        reg = new RegExp('https?:\/\/(www\.)?(' + webList.join('|').replace(/\./g, '\.') + ')');
        website = msg.match(reg);
        if (website) {
          item = website[0];
          item = item.slice(item.indexOf('//') + 2);
          if (item.indexOf("www.") >= 0) item = item.slice(4);
          if (item in web) {
            web[item].exec(nobuBot, message);
          }
        }
      }
    }
  });
  if (process.env.HEROKU_APP_NAME) {
    setInterval(function() {
      http.get("http://" + process.env.HEROKU_APP_NAME + ".herokuapp.com");
    }, 300000);
  }

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
}