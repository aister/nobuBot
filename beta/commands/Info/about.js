const Command = require('../../main/command');

module.exports = new Command({
  info: {
    name: "about",
    category: "Bot Info",
    help: "Know more about the bot"
  },
  run(message, main, args, prefix) {
    message.channel.send('', {embed: {
      title: `NobuBot (version ${process.env.HEROKU_RELEASE_VERSION || require('../../package.json').version})`,
      description: `NobuBot is a Discord bot as well as bot framework made by Aister.\n\nThis bot is hosted by ${main.config.ownerName}\n\u200b`,
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
          value: `[Discord.js version ${require('discord.js').version}](https://github.com/hydrabolt/discord.js)`,
          inline: true
        },
        {
          name: "Source Code",
          value: "https://github.com/aister/nobuBot"
        },
        {
          name: "Support Server",
          value: "https://discord.gg/axXXGcv"
        }
      ]
    }});
  }
});