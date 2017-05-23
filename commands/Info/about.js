
exports.help = "about :: Learn more about nobuBot";
dversion = require("discord.js").version;
exports.exec = (client, message, msgArray, callback) => {
  embed = {
    title: "NobuBot (version " + (process.env.HEROKU_RELEASE_VERSION || require('../../package.json').version) + ")",
    description: "NobuBot is a Discord bot as well as bot framework made by Aister. It was made as an experiment in making the basic command object handlers, which Aister has wrote up [a guide about it](https://aister.gitbooks.io/discord-js-command-handlers/content/advanced-command-objects.html)\n\u200b",
    fields: [
      {
        name: "Creator",
        value: "Aister",
        inline: true
      },
      {
        name: "Email",
        value: "hellodecasino@gmail.com",
        inline: true
      },
      {
        name: "Engine",
        value: "[Discord.js version " + dversion + "](https://github.com/hydrabolt/discord.js)",
        inline: true
      },
      {
        name: "Source Code",
        value: "https://github.com/aister/nobuBot"
      },
      {
        name: "Website",
        value: "not yet implement"
      },
      {
        name: "Support Server",
        value: "https://discord.gg/axXXGcv"
      }
    ]
  };
  message.channel.send('', {embed})
}