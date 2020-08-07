const Command = require('../../main/command');

module.exports = class RateCommand extends Command {
  constructor(main) {
    super(main, {
      name: "rate",
      category: "Fate Grand Order",
      args: [
        {
          name: "User Mention",
          desc: "Optional, will be the user himself if omitted"
        }
      ],
      help: "Is R~ a 3.5/10 servant?"
    })
  }
  run(message, args, prefix) {
    args = message.mentions.users.first() || message.author;
    message.guild.fetchMember(args).then(i => {
      message.channel.send(`${i.displayName} is a ${this.main.util.rand(1, 20) / 2} out of 10 servant!`);
    });
  }
}
