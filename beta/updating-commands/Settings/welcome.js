const Command = require('../../main/command');

module.exports = class WelcomeCommand extends Command {
  constructor(main) {
    super(main, {
      name: "welcome",
      category: "Setting",
      args: [
        {
          name: "Message",
          desc: "The message to show whenever a new member joins the server. \nUse `[disable]` if you want to disable this message. \nLeave empty to see your current message."
        }
      ],
      help: "Edit welcome messages",
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
      if (args) {
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
      } else {
        if (config.welcome) message.channel.send(`Welcome message is currently ${config.welcome}`);
        else message.channel.send(`Welcome message is currently disabled`);
      }
    });
  }
}