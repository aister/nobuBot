const Command = require('../../main/command');

module.exports = new Command({
  info: {
    name: "inviteme",
    category: "Bot Info",
    help: "Display the link that you can use to invite the bot"
  },
  run(message, main, args, prefix) {
    message.channel.send(`To invite the bot, use this link: https://discordapp.com/oauth2/authorize?scope=bot&client_id=${main.client.user.id}`);
  }
});