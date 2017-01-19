function func (client, result, message) {
  if (result) obj = JSON.parse(result);
  else obj = {};
  msgArray = msgArray.slice(1).join(' ').replace(/\n?\|/g, '|').split('|');
  obj.name = msgArray[0].trim();
  i = 0;
  obj.fields = [];
  msgArray.slice(1).forEach(item => {
    item = item.trim();
    if (i == 0) {
      i = 1;
      fieldItem = { name: item };
    } else {
      i = 0;
      fieldItem.value = item;
      obj.fields.push(fieldItem);
    }
  });
  if (img = message.attachments.first()) {
    obj.img = img.url;
  }
  result = JSON.stringify(obj);
  client.db.set('event', result, function() {
    client.dbCache.event = result;
    message.channel.sendMessage('Event saved successfully', {embed: client.commands.event.func(obj)});
  });
}
exports.exec = (client, message, msgArray, callback) => {
  if (message.author.id != client.config.ownerID) return;
  if (client.dbCache.event) func(client, client.dbCache['event'], message);
  else client.db.get('event', (err, result) => { 
    func(client, result, message);
  });
}