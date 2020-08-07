const Command = require('../../main/command');
const snek = require('snekfetch');
const Decode = require('html-entities').AllHtmlEntities;
const decode = new Decode();

module.exports = class PunCommand extends Command {
  constructor(main) {
    super(main, {
      name: "pun",
      category: "Misc",
      help: "Random pun"
    });
  }
  run(message, args, prefix) {
    snek.get('http://www.punoftheday.com/cgi-bin/arandompun.pl').then(r => {
      r = r.text.slice(16);
      r = r.slice(0, r.indexOf("'") - 6);
      message.channel.send(decode.decode(r));
    })
  }
}