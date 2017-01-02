var Discord = require("discord.js");
function isBlacklist(list, text) {
  if (list) return list.indexOf(text) >= 0;
  else return false;
}

exports.exec = (client) => {
  console.log('Initiate Client');
  client.initTime = Date.now();
  client.bot = new Discord.Client();

  client.load = require('./load.js').exec;
  client.exec = require('./exec.js').exec;

  client.load(client, function() {
    client.bot.login(client.config.botToken || process.env.TOKEN2).catch(console.log);
    taken = Date.now() - client.initTime;
    console.log('Modules loaded. Took ' + taken + 'ms to load.\nLogging in Discord...');
    client.initTime = taken + client.initTime;
    client.events.forEach(event => {
      client.bot.on(event.name, event.exec(client));
    });
    client.bot.on('message', (message) => {
      client.exec(client, message);
    });
  });
  var ping = 0;

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