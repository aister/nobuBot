const Command = require('../../main/command');

module.exports = class IWCommand extends Command {
  constructor(main) {
    super(main, {
      name: "thanos",
      category: "Misc",
      args: [
        {
          name: "User Mention",
          desc: "Optional, will be the user himself if omitted"
        }
      ],
      help: "Were you Thanoshii'd?"
    })
  }
  run(message, args, prefix) {
    args = message.mentions.users.first() || message.author;
    message.guild.fetchMember(args).then(i => {
      if (this.main.util.rand(0, 1)) message.channel.send(`${i.displayName} has been turned into dust by Thanos!`);
      else message.channel.send(`${i.displayName} has survived the Thanoshii!`);
    });
  }
}
