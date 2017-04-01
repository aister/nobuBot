var request = require('request');
exports.help = "vc-roleplay :: Change your nickname to a random maiden in Valkyrie Crusade\n\nCurrent Rate: 0.2% LR | 2.8% UR | 17% SR | 30% R | 50% N";
vcRPcooldown = {};
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild.member(bot.bot.user.id).hasPermission('MANAGE_NICKNAMES')) {
    message.channel.sendMessage("This command can't be used, because the bot can't change your nickname");
    return;
  }
  let name = message.author.username;
  if (message.member) name = message.member.displayName;
  let time = 0;
  if (!vcRPcooldown[message.author.id]) vcRPcooldown[message.author.id] = message.createdTimestamp;
  else time = message.createdTimestamp - vcRPcooldown[message.author.id] - 3600000;
  if (time < 0 && message.author.id != bot.config.ownerID) {
    message.channel.sendMessage("You can only use this command once every hour. You can use it again in " + Math.floor( - time / 60000) + " minutes " + (Math.ceil( - time / 1000) % 60) + " seconds");
  } else {
    vcRPcooldown[message.author.id] = message.createdTimestamp;
    let chance = Math.random();
    if (chance <= 0.002) msgArg = "LR";
    else if (chance <= 0.03) msgArg = "UR";
    else if (chance <= 0.2) msgArg = "SR";
    else if (chance <= 0.5) msgArg = "R";
    else msgArg = "N";
    request({ url: "https://raw.githubusercontent.com/aister/nobuDB/master/vc.json", json: true, followRedirect: false }, function(err, res, result) {
      body = result.filter(item => { return item.rarity == msgArg; });
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
        message.channel.sendMessage('', {embed}).then(callback).catch(console.log);
      });
    });
  }
}