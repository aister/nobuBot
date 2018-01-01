const Command = require('../../main/command');
const Constants = require('../../main/const');

module.exports = class ItemDropCommand extends Command {
  constructor(main) {
    super(main, {
      name: "itemdrop",
      category: "Fate Grand Order",
      help: "Get whole drop list info of a certain item",
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
          message.author.send('', {embed: {
            title: `${item.name} - ID: ${item.id}`,
            description: '\u200b',
            fields: item.location,
            thumbnail: { url: item.img }
          }}).then(() => {
            message.channel.send("The drop list has been sent to you via DM");
          }).catch(() => {
            message.channel.send("The drop list couldn't be sent for some reason, please check your DM settings");
          });
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
