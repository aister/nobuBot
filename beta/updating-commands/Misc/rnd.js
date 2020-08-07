const Command = require('../../main/command');

module.exports = class PunCommand extends Command {
  constructor(main) {
    super(main, {
      name: "rnd",
      category: "Misc",
      help: "Give a random number in the given range",
      args: [
        {
          name: "Min",
          desc: "The lower limit"
        },
        {
          name: "Max",
          desc: "The upper limit"
        }
      ]
    });
  }
  run(message, args, prefix) {
    message.channel.send(this.main.util.rand(args[0], args[1]));
  }
}