const Command = require('../../main/command');
const Constants = require('../../main/const');
const snek = require('snekfetch');

module.exports = class FGOMasterCommand extends Command {
  constructor(main) {
    super(main, {
      name: "master",
      category: "Fate Grand Order",
      help: "Get the current Master Missions."
    });
    this.cache = false;
  }
  fetch() {
    return new Promise((resolve, reject) => {
      snek.get('https://fate-go.cirnopedia.org/master_mission.php').then(r => {
        r = r.text.match(/id="mini(?:(?!<\/table)[\s\S])+/g)[0].match(/desc">\n.+\n.+/g).map(item => {
          return item.slice(7).replace('<br>', '');
        });
        this.cache = r;
        resolve(r);
      });
    })
  }
  async run(message, args, prefix) {
    if (!this.cache) await this.fetch();
    message.channel.send('', { embed: {
      title: "Master Mission for this week",
      description: `\u200b\n${this.cache.join('\n\n')}`
    }});
  }
}