const Command = require('../../main/command');
const Constants = require('../../main/const');
const snek = require('snekfetch');

module.exports = class VCCardCommand extends Command {
  constructor(main) {
    super(main, {
      name: "card",
      category: "Valkyrie Crusade",
      help: "Get the info of a certain card",
      args: [
        {
          name: "Search Term",
          desc: "The search terms. Can be card's name, or card ID. In case of card ID, add an `id:` in front of the card ID.\n\n**Example:** id:001 would search for card with the ID 001"
        }
      ]
    });
  }
  run(message, args, prefix) {
    if (args = args.join(' ')) {
      snek.get(`${Constants.db}vc.json`).then(r => {
        r = JSON.parse(r.text);
        let result = args.match(/^id: *(.+)/);
        if (result) {
          args = result[1];
          result = r[args];
          result.id = args;
          result = { item: result };
        } else {
          result = false;
          r.forEach((item, i) => {
            if (item.name.toLowerCase().includes(args.toLowerCase())) {
              item.id = i;
              if (result) result.other.push(i);
              else result = {item, other: []};
            }
          });
        }
        if (result) {
          args = result.item;
          let embed = {
            title: args.name + ' (ID: ' + args.id + ')',
            color: 0xff0000,
            fields: [
              {name: "Element", value: args.element, inline: true},
              {name: "Rarity", value: args.rarity, inline: true}
            ],
            description: "\u200b",
            image: {
              url: args.image
            },
            url: args.link
          }
          args.skill.forEach(item => {
            embed.fields.push(item);
          });
          if (result.other) {
            embed.fields.push({
              name: "Other results (in card ID)",
              value: result.other.join(' | ') + "\n\nUse `id:<cardID>` for precise search"
            })
          }
          message.channel.send('', {embed});
        } else message.channel.send("Not found");
      });
    } else {
      message.channel.send(`You didn't provide an argument, please provide an argument or consult \`${prefix}help card\` for more info`);
    }
  }
}