const Command = require('../../main/command');
const flip = require("flip-text");

module.exports = class FlipCommand extends Command {
  constructor(main) {
    super(main, {
      name: "flip",
      category: "General",
      args: [
        {
          name: "Text",
          desc: "The text to flip, can use mentions"
        }
      ],
      help: "(╯°□°）╯︵ ʇxǝʇ dlǝɥ",
      caseSensitive: true
    })
  }
  run(message, args, prefix) {
    if (message.mentions.members.first()) args = message.mentions.members.first().displayName;
    else args = args.join(' ') || message.author.username;
    message.channel.send(args + "ノ( ゜-゜ノ)").then(mes => {
      setTimeout(function() {
        mes.edit("(╯°□°）╯︵ " + flip(args));
      }, 1000);
    });
  }
}