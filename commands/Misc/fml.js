const Command = require('../../main/command');
const snek = require('snekfetch');
const Decode = require('html-entities').AllHtmlEntities;
const decode = new Decode();

module.exports = class FMLCommand extends Command {
  constructor(main) {
    super(main, {
      name: "fml",
      category: "Misc",
      help: "Random fml story"
    });
    this.cache = [];
  }
  load() {
    return new Promise((resolve, reject) => {
      snek.get('http://www.fmylife.com/random').then(r => {
        if (r = r.text) {
          r = r.slice(0, r.indexOf('/birthdays'));
          r.replace(/<p class="block[^"]+">\n<a href="[^>]+>([^<]+)/g, (match, text) => {
            if (text = text.replace(/\n/g, '')) this.cache.push(text);
            console.log(text);
          });
          resolve();
        }
      });
    });
  }
  async run(message, args, prefix) {
    if (!this.cache.length) await this.load();
    message.channel.send(decode.decode(this.cache.shift()));
  }
}