const Command = require('../../main/command');

module.exports = new Command({
  info: {
    name: "help",
    category: "Bot Info",
    help: "Show list of all commands, or more info about a certain command",
    args: [
      {
        name: "Command",
        desc: "Optional. Will show the list of all commands if omitted"
      }
    ]
  },
  run(message, main, args, prefix) {
    args = args.join(' ');
    if ((args = main.commands.get(args)) && !args.info.devOnly) {
      message.channel.send('', { embed: args.info.help });
    } else {
      let embed = {
        title: "Command lists",
        description: `Use \`${prefix}help <command>\` to see more about that specific command`,
        fields: []
      };
      let categories = {};
      main.commands.forEach(item => {
        if (!item.info.devOnly) {
          if (!categories[item.info.category]) categories[item.info.category] = [];
          categories[item.info.category].push(item.info.name);
        }
      });
      for (let item in categories) {
        let ctg = [[]];
        let index = 0;
        categories[item].forEach(command => {
          args = `${ctg[index].join(', ')}, ${command}`;
          if (args.length > 1024) {
            index++;
            ctg[index] = [];
          }
          ctg[index].push(command);
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
});