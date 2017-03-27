exports.help = "vc-profile-edit name: <Your IGN> | id: <Friend ID> | role: <FAWK, LAWK, Sender, etc.> :: Save or edit FGO profile\n\n" +
                "Also you can attach an image along with the command to put it into your profile";
function func (client, result, message) {
  if (result) obj = JSON.parse(result);
  else obj = {};
  msgArray.slice(1).join(' ').replace(/ ?\| ?/g, '|').split('|').forEach(item => {
    item = item.trim();
    if (item.startsWith('name:')) obj.name = item.slice(5).trim();
    else if (item.startsWith('id:')) obj.id = item.slice(3).trim();
    else if (item.startsWith('role:')) obj.id = item.slice(5).trim();
  });
  if (img = message.attachments.first()) {
    obj.support = img.url;
  }
  result = JSON.stringify(obj);
  client.db.set('vcProfile_' + message.author.id, result, function() {
    client.dbCache['vcProfile_' + message.author.id] = result;
    message.channel.sendMessage('Profile saved successfully', {embed: client.commands.profile.func(message.author, obj)});
  });
}
exports.exec = (client, message, msgArray, callback) => {
  if (('vcProfile_' + message.author.id) in client.dbCache) func(client, client.dbCache['vcProfile_' + message.author.id], message);
  else client.db.get('vcProfile_' + message.author.id, (err, result) => { 
    func(client, result, message);
  });
}