exports.help = "user <mentions> :: Check users by mentions";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  var temp = "";
  message.mentions.users.forEach(user => {
    name = message.guild.fetchMember(user).then(m => {
      embed = {
        title: "User info of: " + m.displayName + " (ID: " + m.id + ")",
        description: "\u200b",
        fields: [
          {
            name: "Username",
            value: user.username + "#" + user.discriminator,
            inline: true
          },
          {
            name: "ID",
            value: user.id,
            inline: true
          },
          {
            name: "Join Date",
            value: m.joinedAt.toUTCString()
          },
          {
            name: "Creation Date",
            value: user.createdAt.toUTCString()
          }
        ],
        thumbnail: { url: user.avatarURL }
      };
      message.channel.sendMessage('', {embed});
    });
  });
}