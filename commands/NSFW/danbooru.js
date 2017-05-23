var request = require('request');
exports.help = "danbooru <tags>:: Search for random image with tags\n\nAutomatically turn on safe mode if used outside nsfw channel";
exports.exec = (client, message, msgArray, callback) => {
  console.log(msgArray[0]);
  var tag = "";
  if (message.channel.name == "nsfw") {
    if (message.guild.id == "232256303509012480") tag = "rating:q ";
    else tag = "rating:e ";
    url = 'https://danbooru.donmai.us/posts.json?random=true&limit=1&tags=';
  } else url = 'https://safebooru.donmai.us/posts.json?random=true&limit=1&tags=';
  msgArray = message.content.replace(/rating:[^ ]+/g, '').split(' ');
  tag += '*' + msgArray.slice(1).join('* *') + '*';

  request({
    url: url + encodeURI(tag),
    json: true
  }, function (err, res, body) {
    if (body.length > 0) {
      if (body[0].file_url) message.channel.send("<https://danbooru.donmai.us/posts/" + body[0].id + ">", {file: {attachment: "https://danbooru.donmai.us/" + body[0].file_url, name: "image.png"}});
      else message.channel.send('Post found, however no image data can be found\n\nHere\'s the link: https://danbooru.donmai.us/posts/' + body[0].id);
    } else message.channel.send('No result found');
  });
}