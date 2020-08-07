const Command = require('../../main/command');

module.exports = new Command({
  info: {
    name: "donate",
    category: "Bot Info",
    help: "Show ways to support NobuBot's development"
  },
  run(message, main, args, prefix) {
    message.channel.send('', { embed: {
      title: "A little bit of support goes a long way",
      description: "To support NobuBot's development, you can use one of the links below:\n\n[Paypal](https://paypal.me/aister)"
    }});
  }
});