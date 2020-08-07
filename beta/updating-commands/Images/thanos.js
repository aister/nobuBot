const Command = require('../../main/command');
const Canvas = require('canvas');
const snek = require('snekfetch');

module.exports = class IWCommand extends Command {
  constructor(main) {
    super(main, {
      name: "thanos",
      category: "Image",
      args: [
        {
          name: "User Mention",
          desc: "Optional, will be the user himself if omitted"
        }
      ],
      help: "Were you Thanoshii'd?"
    })
  }
  run(message, args, prefix) {
    args = message.mentions.users.first() || message.author;
    message.guild.fetchMember(args).then(i => {
      let avatar = i.user.avatarURL.split('?')[0];
      if (this.main.util.rand(0, 1)) {
        this.main.util.dust(avatar).then(attachment => {
          message.channel.send(`${i.displayName} has been turned into dust by Thanos!`, {file: { attachment }});
        });
      } else message.channel.send(`${i.displayName} has survived the Thanoshii!`, {file: {attachment:avatar}});
    });
  }
}
