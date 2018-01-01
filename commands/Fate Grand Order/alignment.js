const snek = require('snekfetch');
const Command = require('../../main/command');
const Constants = require('../../main/const');

module.exports = class AlignmentCommand extends Command {
  constructor(main) {
    super(main, {
      name: "alignment",
      category: "Fate Grand Order",
      args: [
        {
          name: "Search Term",
          desc: "The search terms (Chaotic, Neutral, Good, etc.)"
        },
        {
          name: "Page Number",
          desc: "Should be number, obviously. This is optional and will be 1 if omitted"
        }
      ],
      help: "Search for servants with a specific alignment"
    })
  }
  run(message, args, prefix) {
    let page;
    let searchTerm;
    if (args.length) {
      if (isNaN(args[args.length - 1])) {
        page = 1;
        searchTerm = args.slice(1).join(' ');
      } else {
        page = parseInt(args[args.length - 1]);
        searchTerm = args.slice(1, -1).join(' ');
      }
      if (page < 1) page = 1;
      snek.get(`${Constants.db}fgo_main.json`).then(r => {
        let result = [];
        r = JSON.parse(r.text);
        for (let id in r) {
          if (r[id].alignment.toLowerCase().includes(searchTerm)) {
            result.push({
              name: r[id].name,
              id: r[id].id
            });
          }
        }
        if (result) {
          let maxPage = Math.ceil(result.length / 10);
          if (page > maxPage) page = maxPage;
          result = result.slice((page - 1) * 10, page * 10).map(item => { return `${item.name} (ID: ${item.id})` });
          message.channel.send('', {
            embed: {
              title: `Servants with ${searchTerm} alignment (Page ${page}/${maxPage}):`,
              description: `\u200b\n${result.join('\n\n')}\n\nPlease use \`${prefix}alignment ${searchTerm} <page number>\` to go to other pages`,
              color: 0xff0000
            }
          });
        } else {
          message.channel.send(`Cannot found servants with ${searchTerm} alignment. Please recheck your search terms and try again`);
        }
      });
    } else {
      message.channel.send(`You didn't provide an argument, please provide an argument or consult \`${prefix}help alignment\` for more info`);
    }
  }
}