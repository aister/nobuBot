exports.help = "user <mentions> :: Check users by mentions";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  var temp = "";
  message.mentions.users.forEach(user => {
    temp += '**User:** ' + user.username + '#' + user.discriminator + '\n';
    if (user.nickname) temp += '**Nickname:** ' + user.nickname + '\n';
    temp += '\n' +
      '**ID:** ' + user.id + '\n' +
      '**Avatar URL:** <' + user.avatarURL + '>\n' +
      '**Join Date:** ' + message.guild.members.get(user.id).joinedAt.toUTCString() + '\n' +
      '**Creation Date:** ' + user.createdAt.toUTCString() + '\n' +
    '\n';
  });
  message.channel.sendMessage(temp);
}