const Command = require('../../main/command');

module.exports = class InviteMeCommand extends Command {
  constructor(main) {
    super(main, {
      name: "inviteme",
      category: "Bot Info",
      help: "Display the link that you can use to invite the bot"
    });
  }
  run(message, args, prefix) {
    message.channel.send('To invite the bot, use this link: https://discordapp.com/oauth2/authorize?scope=bot&client_id=228126136192860160');
  }
}