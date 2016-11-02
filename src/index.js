var Discord = require("discord.js");
var http  = require("http");
var express = require('express');
function isBlacklist(list, text) {
  if (list) return list.indexOf(text) >= 0;
  else return false;
}

exports.exec = (client) => {
  client.bot = new Discord.Client();


  var app = express();
  app.set('port', (process.env.PORT || 3000));


  app.listen(app.get('port'));
  client.load = require('./load.js').exec;
  client.exec = require('./exec.js').exec;
  client.load(client, function() {
    if (client.config.selfbot) client.bot.login(client.config.email, client.config.password);
    else client.bot.login(client.config.botToken || process.env.TOKEN2);
    client.bot.on('ready', () => {
      console.log("Nobu!");
      if (client.config.logChannel && (channel = client.bot.channels.get(client.config.logChannel))) channel.sendMessage("Bot is running. " + process.env.HEROKU_RELEASE_VERSION || "");
    });
    client.bot.on('message', (message) => {
      client.exec(client, message);
    });
  });
  var ping = 0;
  if (process.env.HEROKU_APP_NAME) {
    setInterval(function() {
      http.get("http://" + process.env.HEROKU_APP_NAME + ".herokuapp.com");
    }, 300000);
  }

  process.on('uncaughtException', function(err) {
    if (err.code == 'ECONNRESET') {
      console.log('Got an ECONNRESET! This is *probably* not an error. Stacktrace:');
      console.log(err.stack);
      return;
    }
    console.log(err);
    console.log(err.stack);
    return;
  });
}