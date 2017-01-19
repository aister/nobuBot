exports.help = "profile-edit name: <Your IGN> | id: <Friend ID> :: Save or edit FGO profile\n\n" +
                "Also attach an image that show your support servants (can be screenshot or custom design) by uploading to discord";
function func (client, result, message) {
  if (result) obj = JSON.parse(result);
  else obj = {};
  msgArray.slice(1).join(' ').replace(/ ?\| ?/g, '|').split('|').forEach(item => {
    item = item.trim();
    if (item.startsWith('name:')) obj.name = item.slice(5).trim();
    else if (item.startsWith('id:')) obj.id = item.slice(3).trim();
  });
  if (img = message.attachments.first()) {
    obj.support = img.url;
  }
  result = JSON.stringify(obj);
  client.db.set('fgoProfile_' + message.author.id, result, function() {
    client.dbCache['fgoProfile_' + message.author.id] = result;
    message.channel.sendMessage('Profile saved successfully', {embed: client.commands.profile.func(message.author, obj)});
  });
}
exports.exec = (client, message, msgArray, callback) => {
  if (('fgoProfile_' + message.author.id) in client.dbCache) func(client, client.dbCache['fgoProfile_' + message.author.id], message);
  else client.db.get('fgoProfile_' + message.author.id, (err, result) => { 
    func(client, result, message);
  });
}