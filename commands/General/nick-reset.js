const snek = require('snekfetch');
const Command = require('../../main/command');
const Constants = require('../../main/const');

module.exports = class ResetNicknameCommand extends Command {
  constructor(main) {
    super(main, {
      name: "nick-reset",
      alias: ["fgo-reset", "vc-reset"],
      category: "General",
      help: "Reset your nickname. The bot needs Manage Nicknames permission for this command"
    })
  }
  run(message, args, prefix) {
    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
      message.channel.send("This command can't be used, because the bot can't change your nickname");
      return;
    }
    message.member.setNickname("").then(() => { message.channel.send("You reseted your nickname, boohoo"); });
  }
}