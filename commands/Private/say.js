const Command = require('../../main/command');
module.exports = class SayCommand extends Command {
  constructor(main) {
    super(main, {
      name: "say",
      devOnly: true,
      caseSensitive: true
    });
  }
  run(message, args, prefix) {
    if (message.author.id == this.main.config.ownerID) {
      if (args && args.length > 1) {
        this.main.client.channels.get(args[0]).send(args.slice(1).join(' '));
      }
    }
  }
}
