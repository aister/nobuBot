const Command = require('../../main/command');
const snek = require('snekfetch');

module.exports = class ImageSearchCommand extends Command {
  constructor(main) {
    super(main, {
      name: "google",
      category: "Search",
      help: "Search on Google",
      args: [
        {
          name: "Search Terms",
          desc: "What you want to search for"
        }
      ],
      caseSensitive: true
    });
  }

  async run(message, args, prefix) {
    args = args.join(' ');
    if (args) {
      let m = await message.channel.send('Searching');
      let result = await snek.get(`https://www.google.com/search?safe=active&q=${encodeURI(args)}`);
      if (result = result.text.match(/<cite[^>]*>((?:(?!<\/cite>)[\s\S])+)/)) m.edit(`First result found for query ${args}: ${result[1].replace(/<[^>]+>/g, '')}`);
      else m.edit(`There is no result for query ${args}`);
    } else message.channel.send(`Error: No argument provided. Please consult \`${prefix}help image\` for more information`);
  }
}