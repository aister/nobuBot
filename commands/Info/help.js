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
        if (!item.devOnly) {
          if (!categories[item.category]) categories[item.category] = [];
          categories[item.category].push(item.name);
        }
      });
      for (let item in categories) {
        let ctg = [[]];
        let index = 0;
        categories[item].forEach(command => {
          args = `${ctg[index].join(', ')}, [${command}](https://nobubot.herokuapp.com/command/${command})`;
          if (args.length > 1024) {
            index++;
            ctg[index] = [];
          }
          ctg[index].push(`[${command}](https://nobubot.herokuapp.com/command/${command})`);
        });
        ctg.forEach((command, index) => {
          if (ctg.length > 1) index = `${item} (${index + 1})`;
          else index = item;
          embed.fields.push({
            name: index,
            value: command.join(', ')
          });
        });
      }
      message.channel.send('' , { embed });
    }
  }
}
