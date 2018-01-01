const Command = require('../../main/command');

module.exports = class GreetCommand extends Command {
  constructor(main) {
    super(main, {
      name: "greet",
      category: "Fate Grand Order",
      help: "Whassup homies!"
    });
  }
  run(message, args, prefix) {
    message.channel.send('', {file: {attachment: "http://i.imgur.com/eoWffyo.png", name: 'Whassup.png'}});
  }
}