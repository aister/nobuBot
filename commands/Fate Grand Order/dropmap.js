const snek = require('snekfetch');
const Command = require('../../main/command');

module.exports = class DropMapCommand extends Command {
  constructor(main) {
    super(main, {
      name: "dropmap",
      category: "Fate Grand Order",
      args: [
        {
          name: "Map Name",
          desc: "The name of the map to display, only has the drop map of up to Agartha (case insensitive)\nOptional, omit to display the list of all available maps"
        }
      ],
      help: "Get the drop map of certain stage."
    });
    this.dropMap = new Map([
      ['fuyuki', 'https://i.imgur.com/TsZ8xYs.png'],
      ['orleans', 'https://i.imgur.com/HQ8x25h.png'],
      ['rome', 'https://i.imgur.com/kkmWHPP.png'],
      ['okeanos', 'https://i.imgur.com/sttaCag.png'],
      ['london', 'https://i.imgur.com/f8dRAp5.png'],
      ['america', 'https://i.imgur.com/fIBQkVJ.jpg'],
      ['camelot', 'https://i.imgur.com/4WxSnQp.jpg'],
      ['babylon', 'https://i.imgur.com/3HHRMF6.jpg'],
      ['shinjuku', 'https://i.imgur.com/V54CH7q.jpg'],
      ['agartha', 'https://i.imgur.com/ocE3A5y.jpg']
    ]);
  }
  run(message, args, prefix) {
    args = args.join(' ');
    if (args) {
      if (this.dropMap.has(args)) {
        message.channel.send(`Drop Map for ${args.charAt(0).toUpperCase()}${args.slice(1)}:`, {file: {attachment: this.dropMap.get(args), name: `${args}.png`}});
      } else {
        message.channel.send(`List of all available maps:\n${Array.from(this.dropMap.keys()).join(', ')}`);
      }
    } else {
      message.channel.send(`List of all available maps:\n${Array.from(this.dropMap.keys()).join(', ')}`);
    }
  }
}