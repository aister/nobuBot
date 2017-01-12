exports.help = "profile :: Get your saved FGO profile";
exports.func = (user, obj) => {
  embed = {
    title: "FGO Profile for " + user.username,
    fields: [
      {
        name: "IGN",
        value: obj.name || "Not Provided"
      },
      {
        name: "Friend ID",
        value: obj.id || "Not Provided"
      }
    ],
    description: "\u200b",
    thumbnail: { url: user.displayAvatarURL }
  }
  if (obj.support) embed.image = { url: obj.support }
  return embed;
}
exports.exec = (bot, message, msgArray, callback) => {
  func = this.func;
  client.db.get('fgoProfile_' + message.author.id, function (err, result) {
    if (result) {
      obj = JSON.parse(result);
      message.channel.sendMessage('', {embed: func(message.author, obj)});
    } else {
      message.channel.sendMessage("Profile not found, please use `" + bot.prefix + "profile-edit` to create one");
    }
  })
}