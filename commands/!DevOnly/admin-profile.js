function send(client, db, message, func, target) {
  result = client.dbCache[db + 'Profile_' + target.id];
  if (result) {
    obj = JSON.parse(result);
    message.channel.sendMessage('', {embed: func(target, obj)});
  } else {
    message.channel.sendMessage("Profile not found, please use `" + client.prefix + "profile-edit` to create one");
  }
}
exports.exec = (client, message, msgArray, callback) => {
  if (message.author.id != client.config.ownerID || !msgArray[1]) return;
  target = client.bot.users.get(msgArray[2]) || message.author;
  db = msgArray[1];
  if (db == "fgo") func = client.commands.profile.func;
  else if (db == "vc") func = client.commands["vc-profile"].func;
  if (msgArray[3] == "raw") {
    send = (client, db, message, func, target) => {
      result = client.dbCache[db + 'Profile_' + target.id];
      message.channel.sendMessage(result);
    }
  }
  if (msgArray[3] != "edit") {
    if ((db + 'Profile_' + target.id) in client.dbCache) {
      send(client, db, message, func, target);
    } else {
      client.db.get(db + 'Profile_' + target.id, function (err, result) {
        client.dbCache[db + 'Profile_' + target.id] = result;
        send(client, db, message, func, target);
      });
    }
  } else {
    result = msgArray.slice(4).join(' ');
    client.db.set(db + 'Profile_' + target.id, result, function() {
      client.dbCache[db + 'Profile_' + target.id] = result;
      message.channel.sendMessage('done');
    });
  }
}