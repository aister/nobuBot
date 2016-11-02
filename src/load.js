var fs = require('fs');
function isBlacklist(list, text) {
  if (list) return list.indexOf(text) >= 0;
  else return false;
}
exports.exec = (client, callback) => {
  client.commands = {};
  client.web = {};
  client.webList = [];
  client.prefix = process.env.PREFIX || client.config.prefix;
  client.help = "```asciidoc\n";
  fs.readdirSync(__dirname + '/../commands/').forEach(function(file) {
    if (!isBlacklist(client.blacklist, file)) {
      if (!file.startsWith('!')) client.help += "== " + file + "\n";
      fs.readdirSync(__dirname + '/../commands/' + file + '/').forEach(function(file2) {
        if (file2.match(/\.js$/) !== null && file2 !== 'index.js') {
          var name = file2.replace('.js', '');
          if (!isBlacklist(client.blacklist, file + '/' + name)) {
            if (file != "!Website") {
              delete require.cache[require.resolve('../commands/' + file + '/' + file2)];
              client.commands[name] = require('../commands/' + file + '/' + file2);
            } else {
              client.webList.push(name);
              client.web[name] = require('../commands/' + file + '/' + file2);
            }
            if (!file.startsWith('!')) {
              client.help += client.prefix + client.commands[name].help + '\n';
            }  
          }
        }
      });
    }
  });
  client.help += "```";
  if (typeof callback == "function") {
    callback();
  }
}