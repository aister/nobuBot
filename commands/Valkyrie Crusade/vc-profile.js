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
        name: "Friend ID",
        value: obj.id || "Not Provided"
      },
      {
        name: "Role",
        value: obj.role || "Not Provided"
      }
    ],
    description: "\u200b",
    thumbnail: { url: user.displayAvatarURL }
  }
  if (obj.support) embed.image = { url: obj.support }
  return embed;
}
function send(client, message, func) {
  result = client.dbCache['vcProfile_' + message.author.id];
  if (result) {
    obj = JSON.parse(result);
    message.channel.sendMessage('', {embed: func(message.author, obj)});
  } else {
    message.channel.sendMessage("Profile not found, please use `" + client.prefix + "vc-profile-edit` to create one");
  }
}
exports.exec = (client, message, msgArray, callback) => {
  func = this.func;
  if (('vcProfile_' + message.author.id) in client.dbCache) {
    send(client, message, func);
  } else {
    client.db.get('vcProfile_' + message.author.id, function (err, result) {
      client.dbCache['vcProfile_' + message.author.id] = result;
      send(client, message, func);
    });
  }
}