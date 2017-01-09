var redis = require('redis');
var db = redis.createClient(process.env.REDIS_URL);
exports.help = "profile-edit name: <Your IGN> | id: <Friend ID> :: Save or edit FGO profile\n\n" +
                "Also attach an image that show your support servants (can be screenshot or custom design) by uploading to discord";
exports.exec = (bot, message, msgArray, callback) => {
  db.get('fgoProfile_' + message.author.id, function (err, result) {
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
    obj = JSON.stringify(obj);
    db.set('fgoProfile_' + message.author.id, obj, function() {
      message.channel.sendMessage('Profile saved successfully');
      db.quit();
    });
  });
}