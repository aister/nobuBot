exports.help = "vc-profile :: Get your saved VC profile";
exports.func = (user, obj) => {
  embed = {
    title: "VC Profile for " + user.username,
    fields: [
      {
        name: "IGN",
        value: obj.name || "Not Provided"
      },
      {
        name: "Alliance",
        value: obj.alliance || "Not Provided"
      },
      {
        name: "Friend ID",
        value: obj.id || "Not Provided",
        inline: true
      },
      {
        name: "Role",
        value: obj.role || "Not Provided",
        inline: true
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
  client.getDB('vcProfile_' + message.author.id).then(() => {
    result = client.dbCache['vcProfile_' + message.author.id];
    if (result) {
      obj = JSON.parse(result);
      message.channel.send('', {embed: func(message.author, obj)});
    } else {
      message.channel.send("Profile not found, please use `" + client.prefix + "vc-profile-edit` to create one");
    }
  });
}