const Command = require('../../main/command');

module.exports = class CivilizationCommand extends Command {
  constructor(main) {
    super(main, {
      name: "civ",
      category: "Fate Grand Order",
      args: [
        {
          name: "User Mention",
          desc: "Optional, will be the user himself if omitted"
        }
      ],
      help: "Is R~ a good civilization?"
    })
  }
  run(message, args, prefix) {
    if (this.main.util.rand(0, 1) > 0.5) message.channel.send(`${args.displayName} is a good civilization!`);
    else message.channel.send(`${args.displayName} is a bad civilization!`);
  }
}
