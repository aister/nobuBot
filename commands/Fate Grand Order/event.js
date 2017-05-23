exports.help = "event :: Get info for the current, or next event";
function send(result, message, func) {
  if (result) {
    obj = JSON.parse(result);
    message.channel.send('', {embed: func(obj) });
  } else {
    message.channel.send("Event not found.");
  }
}
exports.func = (obj) => {
  result = {
    title: "Event info: " + obj.name,
    description: "\u200b",
    fields: obj.fields
  };
  if (obj.img) result.image = { url: obj.img };
  return result;
}
exports.exec = (client, message, msgArray, callback) => {
  func = this.func;
  if (client.dbCache.event) {
    send(client.dbCache.event, message, func);
  } else {
    client.db.get('event', function (err, result) {
      client.dbCache.event = result;
      send(result, message, func);
    });
  }
}