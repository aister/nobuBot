const Command = require('../../main/command');
const snek = require('snekfetch');

module.exports = class ChangelogCommand extends Command {
  constructor(main) {
    super(main, {
      name: "changelog",
      category: "Bot Info",
      help: "Retrieve the latest changelog"
    });

  }
  run(message, args, prefix) {
    snek.get('https://api.github.com/repos/aister/nobuBot/commits').then(r => {
      r = JSON.parse(r.text);

      message.channel.send('', {embed: {
        title: `Changelog`,
        description: "\u200b\n",
        fields: [
          {
            name: "Version",
            value: process.env.HEROKU_RELEASE_VERSION || require('../../package.json').version
          },
          {
            name: "Details",
            value: r[0].commit.message
          }
        ]
      }});
    });
  }
}