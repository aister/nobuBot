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
  }
  async run(message, args, prefix) {
    snek.get('https://fate-go.cirnopedia.org/master_mission.php').then(r => {
      r = r.text.match(/id="mini(?:(?!<\/table)[\s\S])+/g)[0].match(/desc">\n.+\n.+/g).map(item => {
        return item.slice(7).replace('<br>', '').replace(/ {2,}/g, '');
      });
      message.channel.send('', { embed: {
        title: "Master Mission for this week",
        description: `\u200b\n${r.join('\n\n')}`
      }});
    });
  }
}