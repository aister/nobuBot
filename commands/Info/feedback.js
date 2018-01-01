const Command = require('../../main/command');
const snek = require('snekfetch');

module.exports = class ChangelogCommand extends Command {
  constructor(main) {
    super(main, {
      name: "feedback",
      category: "Bot Info",
      help: "Send us a feedback! It can be a compliment, bug reports, feature requests, suggestions or even complaints! It will be very appreciated!",
      args: [
        {
          name: "Content",
          desc: "Required. The content of the feedback."
        }
      ],
      caseSensitive: true
    });
  }
  run(message, args, prefix) {
    if (args = args.join(' ')) {
      this.main.client.channels.get('265147311615639553').send('', {
        embed: {
          title: "Feedback received!",
          description: args,
          footer: {
            text: `Sent by ${message.author.username} (${message.author.id}) from channel ${message.channel.id}`
          }
        }
      });
    } else message.channel.send(`Error: Missing arguments! Please consult \`${prefix}help feedback\` for more information`);
  }
}