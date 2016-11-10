var Discord = require("discord.js");
var http  = require("http");
var express = require('express');
var util = require("util");
function isBlacklist(list, text) {
  if (list) return list.indexOf(text) >= 0;
  else return false;
}

exports.exec = (client) => {
  client.bot = new Discord.Client({
    fetchAllMembers: true,
    disabledEvents: [ "channelCreate", "channelDelete", "channelPinsUpdate", "channelUpdate", "debug", "disconnect", "error", "guildBanAdd", "guildBanRemove", "guildEmojiCreate", "guildEmojiDelete", "guildEmojiUpdate", "guildMemberAvailable", "guildMemberRemove", "guildMembersChunk", "guildMemberSpeaking", "guildMemberUpdate", "guildUnavailable", "guildUpdate", "messageDelete", "messageDeleteBulk", "messageUpdate", "presenceUpdate", "reconnecting", "roleCreate", "roleDelete", "roleUpdate", "typingStart", "typingStop", "userUpdate", "voiceStateUpdate", "warn" ]
  });


  var app = express();
  app.set('port', (process.env.PORT || 3000));


  app.listen(app.get('port'));
  client.load = require('./load.js').exec;
  client.exec = require('./exec.js').exec;

  client.load(client, function() {
    if (client.config.selfbot) client.bot.login(client.config.email, client.config.password);
    else client.bot.login(client.config.botToken || process.env.TOKEN2);
    client.events.forEach(event => {
      event.func.init(client);
      client.bot.on(event.name, event.func.exec);
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