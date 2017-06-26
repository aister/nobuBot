exports.help = "us-profile :: Get your saved FGO US profile";
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
exports.exec = (client, message, msgArray, callback) => {
  func = this.func;
  client.getDB('fgoUSProfile_' + message.author.id).then(() => {
    result = client.dbCache['fgoUSProfile_' + message.author.id];
    if (result) {
      obj = JSON.parse(result);
      message.channel.send('', {embed: func(message.author, obj)});
    } else {
      message.channel.send("Profile not found, please use `" + client.prefix + "profile-edit` to create one");
    }
  });
}
