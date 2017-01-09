var db = require('redis').createClient(process.env.REDIS_URL);
exports.help = "profile :: Get your saved FGO profile";
exports.exec = (bot, message, msgArray, callback) => {
  db.get('fgoProfile_' + message.author.id, function (err, result) {
    if (result) {
      obj = JSON.parse(result);
      embed = {
        title: "FGO Profile for " + message.author.username,
        fields: [
          {
            name: "IGN",
            value: obj.name || "Not Provided",
            inline: true
          },
          {
            name: "Friend ID",
            value: obj.id || "Not Provided",
            inline: true
          }
        ],
        description: "\u200b",
        thumbnail: { url: message.author.displayAvatarURL }
      }
      if (obj.support) embed.image = { url: obj.support }
      message.channel.sendMessage('', {embed});
    } else {
      message.channel.sendMessage("Profile not found, please use `" + bot.prefix + "profile-edit` to create one");
    }
  })
}