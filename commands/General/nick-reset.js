exports.help = "nick-reset :: Reset your nickname";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild.member(bot.bot.user.id).hasPermission('MANAGE_NICKNAMES')) {
    message.channel.send("This command can't be used, because the bot can't change your nickname");
    return;
  }
  message.member.setNickname("").then(() => { message.channel.send("You reseted your nickname, boohoo"); });
}