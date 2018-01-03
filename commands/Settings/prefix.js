const Command = require('../../main/command');

module.exports = class CustomCommand extends Command {
  constructor(main) {
    super(main, {
      name: "prefix",
      category: "Setting",
      args: [
        {
          name: "Prefix",
          desc: "Required. The new prefix to set to. Use `[disable]` to only use bot mention prefix"
        }
      ],
      help: "Set your guild's custom prefix. However, bot mention prefix is unchangeable.",
      caseSensitive: true
    })
  }
  run(message, args, prefix) {
    if (!message.member.hasPermission('MANAGE_GUILD')) {
      return message.channel.send("Error: You need MANAGE SERVER permission to use this command.");
    }
    args = args.join(' ');
    this.main.db.get(`config_${message.guild.id}`).then(config => {
      if (config) config = JSON.parse(config);
      else config = {};
      args = args || `@{this.main.client.user.username}`;
      if (args == "[disable]") {
        config.prefix = false;
        args = "Prefix has been disabled successfully!";
      } else {
        config.prefix = args;
        args = `Prefix has been changed successfully! New prefix is now \`${args}\``;
      }
      this.main.db.set(`config_${message.guild.id}`, JSON.stringify(config)).then(() => {
        message.channel.send(args);
      });
    });
  }
}