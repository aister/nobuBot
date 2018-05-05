const Command = require('../../main/command');
const Canvas = require('canvas');
const snek = require('snekfetch');

module.exports = class DustCommand extends Command {
  constructor(main) {
    super(main, {
      name: "dust",
      category: "Image",
      args: [
        {
          name: "User Mention",
          desc: "Optional, will be the user himself if omitted"
        }
      ],
      help: "Thanoshii urself!"
    })
  }
  run(message, args, prefix) {
    args = message.mentions.users.first() || message.author;
    message.guild.fetchMember(args).then(i => {
      let avatar = i.user.avatarURL.split('?')[0];
      this.main.util.dust(avatar).then(attachment => {
        message.channel.send(`${i.displayName} has been turned into dust by Thanos!`, {file: { attachment }});
      });
    });
  }
}
