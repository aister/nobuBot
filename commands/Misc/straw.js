const Command = require('../../main/command');

module.exports = class StrawCommand extends Command {
  constructor(main) {
    super(main, {
      name: "straw",
      category: "Misc",
      help: "Let the bot pick a random item out of the provided list",
      args: [
        {
          name: "List",
          desc: "The list of items, each items need to be separated with a ` | `"
        }
      ]
    });
  }

  run(message, args, prefix) {
    args = args.join(' ').split('|');
    if (args) message.channel.send(this.main.util.ARand(args));
    else message.channel.send(`Error: No argument provided. Please consult \`${prefix}help straw\` for more information`);
  }
}