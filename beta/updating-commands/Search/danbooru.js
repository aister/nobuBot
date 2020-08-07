const Command = require('../../main/command');
const snek = require('snekfetch');

module.exports = class ImageSearchCommand extends Command {
  constructor(main) {
    super(main, {
      name: "danbooru",
      category: "Search",
      help: "Search for an image on danbooru. Automatically turned on safe-mode if used outside nsfw channels.",
      args: [
        {
          name: "Tags",
          desc: "What you want to search for, following danbooru tag format. Maximum 2 tags (or 1 if used inside nsfw channel)."
        }
      ],
      caseSensitive: true
    });
  }

  async run(message, args, prefix) {
    let tag = "";
    let url = "";
    if (message.channel.nsfw) {
      if (message.guild.id == "232256303509012480") tag = "rating:q ";
      else tag = "rating:e ";
      url = 'https://danbooru.donmai.us/posts.json?random=true&limit=1&tags=';
    } else url = 'https://safebooru.donmai.us/posts.json?random=true&limit=1&tags=';
    args = args.filter(i => { return !i.startsWith('rating:') });
    tag += `*${args.join('* *')}*`;

    snek.get(url + encodeURI(tag)).then(r => {
      r = JSON.parse(r.text);
      if (r.length > 0) {
        if (r[0].file_url) message.channel.send(`<https://danbooru.donmai.us/posts/${r[0].id}>`, {file: {attachment: `${r[0].file_url}`, name: "image.png"}});
        else message.channel.send(`Post found, however no image data can be found\n\nHere's the link: https://danbooru.donmai.us/posts/${r[0].id}`);
      } else message.channel.send('No result found');
    });
  }
}
