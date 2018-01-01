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
        if (result) result = {item: r[result[1]]};
        else {
          result = false;
          for (let item in r) {
            if (r[item].name.toLowerCase().includes(args.toLowerCase())) {
              if (result) result.other.push(r[item].id);
              else result = {item: r[item], other: []};
            }
          }
        }
        if (result) {
          args = result.item;
          let embed = {
            title: body.name + ' (ID: ' + args.id + ')',
            color: 0xff0000,
            fields: [
              {name: "Element", value: body.element, inline: true},
              {name: "Rarity", value: body.rarity, inline: true}
            ],
            description: "\u200b",
            image: {
              url: args.image
            },
            url: args.link
          }
          r.skill.forEach(item => {
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