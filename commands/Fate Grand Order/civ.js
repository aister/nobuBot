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
    args = message.mentions.members.first() || message.member;
    let id = args.id;
    id = id.match(/\d{1}/g);
    let final = 0;
    id.forEach(i => { final += parseInt(i); });
    if (final % 2) message.channel.send(`${args.displayName} is a good civilization!`);
    else message.channel.send(`${args.displayName} is a bad civilization!`);
  }
}
