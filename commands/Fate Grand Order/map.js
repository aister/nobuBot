const Command = require('../../main/command');
const Constants = require('../../main/const');
const snek = require('snekfetch');

module.exports = class FGOMapCommand extends Command {
  constructor(main) {
    super(main, {
      name: "map",
      category: "Fate Grand Order",
      help: "Get the map of certain stage.",
      args: [
        {
          name: "Map Name",
          desc: "Self-explanatory. Optional, omit to get the list of available maps"
        }
      ]
    });
  }
  run(message, args, prefix) {
    snek.get('https://api.github.com/repos/aister/nobuDB/contents/maps').then(r => {
      r = JSON.parse(r.text);
      let maps = { all: [] };
      r.forEach(item => {
        let mapName = item.name.slice(0, -4).toLowerCase();
        maps.all.push(mapName.charAt(0).toUpperCase() + mapName.slice(1));
        maps[mapName] = item["download_url"];
      });
      args = args.join(' ');
      if (args && args != "all" && maps[args]) {
        message.channel.send(`Map for ${args.charAt(0).toUpperCase()}${args.slice(1)}:`, {
          file: {attachment: maps[args], name: args + '.png'}
        });
      } else message.channel.send(`List of all available maps:\`\`\`\n${maps.all.join(', ')}\`\`\``);
    });
  }
}