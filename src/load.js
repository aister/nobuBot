var fs = require('fs');
function isBlacklist(list, text) {
  if (list) return list.indexOf(text) >= 0;
  else return false;
}
exports.exec = (client, callback) => {
  time = Date.now();
  client.commands = {};
  client.events = [];
  client.prefix = process.env.PREFIX || client.config.prefix;
  client.help = "```asciidoc\n";
  fs.readdirSync(__dirname + '/../commands/').forEach(function(file) {
    if (!isBlacklist(client.blacklist, file)) {
      if (!file.startsWith('!')) client.help += "== " + file + "\n";
      help = [];
      fs.readdirSync(__dirname + '/../commands/' + file + '/').forEach(function(file2) {
        if (file2.match(/\.js$/) !== null && file2 !== 'index.js') {
          var name = file2.replace('.js', '');
          if (!isBlacklist(client.blacklist, file + '/' + name)) {
            delete require.cache[require.resolve('../commands/' + file + '/' + file2)];
            client.commands[name].count = 0;
            client.commands[name] = require('../commands/' + file + '/' + file2);
            taken = Date.now() - time;
            time = taken + time;
            console.log("Command " + name + " loaded. Took: " + taken + "ms");
            if (!file.startsWith('!')) {
              help.push(name);
            }
          }
        }
      });
      client.help += help.join(' | ') + '\n';
    }
  });
  fs.readdirSync(__dirname + '/../events/').forEach(function(file) {
    if (!isBlacklist(client.blEvent, file)) {
      var name = file.replace('.js', '');
      delete require.cache[require.resolve('../events/' + file)];
      client.events.push({name, exec: require('../events/' + file).exec});
      taken = Date.now() - time;
      time = taken + time;
      console.log("Event " + name + " loaded. Took: " + taken + "ms");
    }
  });
  client.help += "\nUse " + client.prefix + "help <command> for individual command helps```";
  if (typeof callback == "function") {
    callback();
  }
}