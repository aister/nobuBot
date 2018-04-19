const Command = require("../../main/command");

module.exports = class AboutCommand extends Command {
  constructor(main) {
    super(main, {
      name: "about",
      category: "Bot Info",
      help: "Know more about the bot"
    });
  }
  run(message, args, prefix) {
    message.channel.send("", {
      embed: {
        title: `Gorgon Bot (version${process.env.HEROKU_RELEASE_VERSION ||
          require("../../package.json").version})`,
        description:
          "Gorgon Bot is a Discord bot as well as bot framework. It was made as an experiment in making the basic command object handlers\n\u200b",
        fields: [
          {
            name: "Creator",
            value: "Trusty Patches",
            inline: true
          },
          {
            name: "Email",
            value: "diego.89@gmail.com",
            inline: true
          },
          {
            name: "Engine",
            value: `[Discord.js version ${
              require("discord.js").version
            }](https://github.com/hydrabolt/discord.js)`,
            inline: true
          },
          {
            name: "Source Code",
            value: "pending"
          },
          {
            name: "Website",
            value: "not yet implement"
          },
          {
            name: "Support Server",
            value: "pending"
          }
        ]
      }
    });
  }
};
