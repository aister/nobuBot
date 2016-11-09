exports.help = "nick <mention> <optional: name> :: change nickname of mentioned user, leave <name> empty for removing nickname";
exports.exec = (client, message, msgArray, callback) => {
  if (message.member.hasPermission('MANAGE_NICKNAMES')) {
    mention = message.mentions.users;
    if (mention.size > 0) {
      mention = mention.first();
      name = "";
      if (msgArray.length > 2) name = msgArray.slice(2).join(' ');
      message.guild.member(mention.id).setNickname(name).then(() => {
        message.channel.sendMessage('Nickname changed');
        callback();
      });
    } else {
      name = "";
      if (msgArray.length > 1) name = msgArray.slice(1).join(' ');
      message.member.setNickname(name).then(() => {
        message.channel.sendMessage('Nickname changed');
        callback();
      });
    }
  } else {
    message.channel.sendMessage("You don't have the permission to change other's nickname");
  }
}