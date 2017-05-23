exports.exec = (client, message, msgArray, callback) => {
  if (message.author.id != client.config.ownerID || !msgArray[1]) return;
  target = client.bot.users.get(msgArray[2]) || message.author;
  db = msgArray[1];
  if (db == "fgo") func = client.commands.profile.func;
  else if (db == "vc") func = client.commands["vc-profile"].func;
  else {
    message.channel.send("Wrong db");
    return;
  }
  client.getDB(db + 'Profile_' + target.id).then(() => {
    result = client.dbCache[db + 'Profile_' + target.id];
    if (msgArray[3] == "raw") {
      message.channel.send(result);
    } else if (msgArray[3] == "edit") {
      result = msgArray.slice(4).join(' ');
      client.db.set(db + 'Profile_' + target.id, result, function() {
        client.dbCache[db + 'Profile_' + target.id] = result;
        message.channel.send('done');
      });
    } else {
      if (result) {
        obj = JSON.parse(result);
        message.channel.send('', {embed: func(target, obj)});
      } else {
        message.channel.send("Profile not found, please use `" + client.prefix + "profile-edit` to create one");
      }
    }
  });
}