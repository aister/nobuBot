const Command = require('../../main/command');
const snek = require('snekfetch');

module.exports = new Command({
  info: {
    name: "feedback",
    category: "Bot Info",
    help: "Send us a feedback! It can be a compliment, bug reports, feature requests, suggestions or even complaints! It will be very appreciated!"
  },
  run(message, main, args, prefix) {
    message.channel.send('All feedback, suggestions, or bug reports are welcomed on https://github.com/aister/nobuBot/issues')
  }
});