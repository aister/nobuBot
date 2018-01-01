const Command = require('../../main/command');

module.exports = class HelpCommand extends Command {
  constructor(main) {
    super(main, {
      name: "help",
      category: "Bot Info",
      help: "Show list of all commands, or more info about a certain command",
      args: [
        {
          name: "Command",
          desc: "Optional. Will show the list of all commands if omitted"
        }
      ]
    });
  }
  run(message, args, prefix) {
    args = args.join(' ');
    if ((args = this.main.commands.get(args)) && !args.devOnly) {
      message.channel.send('', { embed: args.help });
    } else {
      let embed = {
        title: "Command lists",
        description: `Use \`${prefix}help <command>\` to see more about that specific command`,
        fields: []
      };
      let categories = {};
      this.main.commands.forEach(item => {
        if (!categories[item.category]) categories[item.category] = [ item.name ];
        else if (!item.devOnly) categories[item.category].push(item.name);
      });
      for (let item in categories) {
        embed.fields.push({
          name: item,
          value: categories[item].join(', ')
        });
      }
      message.channel.send('' , { embed });
    }
  }
}