const Command = require('../../main/command');
const Constants = require('../../main/const');

module.exports = class ItemSearchCommand extends Command {
  constructor(main) {
    super(main, {
      name: "item",
      category: "Fate Grand Order",
      help: "Get most efficient and highest drop info for a certain item",
      args: [
        {
          name: "Search Term",
          desc: "Search Term for item, can be either name or item ID. Omit this to get a list of all items"
        }
      ]
    });
  }
  run(message, args, prefix) {
    if (args = args.join(' ')) {
      this.main.util.fgoItem(args).then(item => {
        if (item) {
          message.channel.send('', {embed: {
            title: `${item.name} - ID: ${item.id}`,
            description: '\u200b',
            fields: [
              {
                name: "Most efficient",
                value: item.AP
              },
              {
                name: "Highest Drop Rate",
                value: item.drop
              }
            ],
            thumbnail: { url: item.img }
          }});
        } else {
          message.channel.send('Cannot find mentioned item, please enter the correct item name or item ID\n\nList of available items:', {
            file: {attachment: `${Constants.db}Ascensionx.gif`, name: 'Ascensionx.gif'}
          });
        }
      });
    } else {
      message.channel.send('List of available items:', {file: {attachment: `${Constants.db}Ascensionx.gif`, name: 'Ascensionx.gif'}});
    }
  }
}
