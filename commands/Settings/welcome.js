const Command = require('../../main/command');

module.exports = class WelcomeCommand extends Command {
  constructor(main) {
    super(main, {
      name: "welcome",
      category: "Setting",
      args: [
        {
          name: "Message",
          desc: "The message to show whenever "
        },
        {
          name: "Tag content",
          desc: "The content for the tags. Omit to delete tag"
        }
      ],
      help: "Edit custom tags, or see the list of all tags. Tags are guild-exclusive.",
      caseSensitive: true
    })
  }
  run(message, args, prefix) {
    if (!message.member.hasPermission('MANAGE_GUILD')) {
      return message.channel.send("Error: You need MANAGE SERVER permission to use this command.");
    }
    this.main.db.get(`config_${message.guild.id}`).then(config => {
      if (config) config = JSON.parse(config);
      else config = {};
      args = args.join(' ');
      if (args == "[disable]") {
        config.welcome = false;
        args = "Welcome message has been disabled successfully!";
      } else {
        config.welcome = `${message.channel.id}:${args}`;
        args = "Welcome message has been changed successfully!";
      }
      this.main.db.set(`config_${message.guild.id}`, JSON.stringify(config)).then(() => {
        message.channel.send(args);
      });
    });
  }
}