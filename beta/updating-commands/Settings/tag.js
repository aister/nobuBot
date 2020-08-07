const Command = require('../../main/command');

module.exports = class CustomCommand extends Command {
  constructor(main) {
    super(main, {
      name: "tag",
      category: "Setting",
      args: [
        {
          name: "Tag name",
          desc: "The tag's name, must be one word"
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
      let customCommand;
      if (config) {
        config = JSON.parse(config);
        if (config.commands) customCommand = new Map(config.commands);
        else customCommand = new Map();
      } else {
        config = {};
        customCommand = new Map();
      }
      if (args.length > 1) customCommand.set(args[0], args.slice(1).join(' '));
      else if (customCommand.has(args[0])) customCommand.delete(args[0]);
      else {
        message.channel.send(`Cannot set or delete tag: Tag not found`);
        return;
      }
      config.commands = Array.from(customCommand.entries());
      this.main.db.set(`config_${message.guild.id}`, JSON.stringify(config)).then(() => {
        message.channel.send(`Successfully edit tag: ${args[0]}`);
      });
    });
  }
}