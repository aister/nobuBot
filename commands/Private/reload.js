const util = require('util');
const Command = require('../../main/command');
module.exports = class ReloadCommand extends Command {
  constructor(main) {
    super(main, {
      name: "reload",
      devOnly: true
    });
  }
  run(message, args, prefix) {
    if (message.author.id == this.main.config.ownerID) {
      this.main.util.load().then(data => {
        this.main.commands = data.commands;
        this.main.events = data.events;
        message.channel.send('Code Reloaded');
      });
    }
  }
}