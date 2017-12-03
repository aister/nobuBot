var request = require('request');
exports.help = "fgo-waifu :: Marry a random Servant in Fate Grand Order. Could be male or female though!\n\nCurrent Rate: 1% 5* | 7% 4* | 20% 3* | 30% 2* | 42% 1*";
let cooldown = {};
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild.member(bot.bot.user.id).hasPermission('MANAGE_NICKNAMES')) {
    message.channel.send("This command can't be used, because the bot can't change your nickname");
    return;
  }
  let name = message.author.username;
  if (message.member) name = message.member.displayName;
  let time = 0;
  if (!cooldown[message.author.id]) cooldown[message.author.id] = message.createdTimestamp;
  else time = message.createdTimestamp - cooldown[message.author.id] - 900000;
  if (time < 0 && message.author.id != bot.config.ownerID) {
    message.channel.send("You can only use this command once every 15 minutes. You can use it again in " + Math.floor( - time / 60000) + " minutes " + (Math.ceil( - time / 1000) % 60) + " seconds");
  } else {
    cooldown[message.author.id] = message.createdTimestamp;
    let chance = Math.random();
    if (chance <= 0.01) msgArg = "5";
    else if (chance <= 0.03) msgArg = "4";
    else if (chance <= 0.2) msgArg = "3";
    else if (chance <= 0.5) msgArg = "2";
    else msgArg = "1";
    request({ url: "https://raw.githubusercontent.com/aister/nobuDB/master/fgo_main.json", json: true, followRedirect: false }, function(err, res, result) {
      let body = [];
      for (let id in result) {
        if (result[id].rarity == msgArg) body.push(result[id]);
      }
      body = body[bot.commands.rnd.func(body.length - 1, 0)];

      message.member.setNickname(body.name + " (" + name + ")").then(() => {
        embed = {
          title: "Congratulation!!",
          color: 0xff0000,
          description: "\u200b\n" + name + " has been nicknamed to " + body.name + "!",
          image: {
            url: body.image
          }
        }
        message.channel.send('', {embed}).then(callback).catch(console.log);
      });
    });
  }
}