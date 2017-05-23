exports.help = "vc-profile-edit name: <Your IGN> | id: <Friend ID> | role: <FAWK, LAWK, Sender, etc.> | alliance: <alliance name> :: Save or edit VC profile\n\n" +
                "Also you can attach an image along with the command to put it into your profile";
function func (client, result, message) {
}
exports.exec = (client, message, msgArray, callback) => {
  client.getDB('vcProfile_' + message.author.id).then(() => {
    result = client.dbCache['vcProfile_' + message.author.id];
    if (result) obj = JSON.parse(result);
    else obj = {};
    msgArray.slice(1).join(' ').replace(/ ?\| ?/g, '|').split('|').forEach(item => {
      item = item.trim();
      if (item.startsWith('name:')) obj.name = item.slice(5).trim();
      else if (item.startsWith('id:')) obj.id = item.slice(3).trim();
      else if (item.startsWith('role:')) obj.role = item.slice(5).trim();
      else if (item.startsWith('alliance:')) obj.alliance = item.slice(9).trim();
    });
    if (img = message.attachments.first()) {
      obj.support = img.url;
    }
    result = JSON.stringify(obj);
    client.db.set('vcProfile_' + message.author.id, result, function() {
      client.dbCache['vcProfile_' + message.author.id] = result;
      message.channel.send('Profile saved successfully', {embed: client.commands["vc-profile"].func(message.author, obj)});
    });
  });
}