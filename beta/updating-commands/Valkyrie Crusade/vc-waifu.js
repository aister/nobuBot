const Command = require('../../main/command');

module.exports = class VCWaifuCommand extends Command {
  constructor(main) {
    super(main, {
      name: "vc-waifu",
      category: "Valkyrie Crusade",
      help: "Marry a random Valkyrie in Valkyrie Crusade.\n\nCurrent Rate: 0.2% LR | 2.8% 4* | 17% 3* | 30% 2* | 50% 1*"
    });
    this.cooldown = {};
  }
  resetCooldown(id) {
    this.cooldown[id] = 0;
  }
  run(message, args, prefix) {
    let name = message.author.username;
    if (message.member) name = message.member.displayName;
    let time = this.cooldown[message.author.id] - message.createdTimestamp + 900000;
    if (time > 0 && message.author.id != this.main.config.ownerID) {
        message.channel.send(`You can only use this command once every 15 minutes. You can use it again in ${Math.floor(time / 60000)} minutes ${Math.ceil(time / 1000) % 60} seconds`);
    } else {
      this.cooldown[message.author.id] = message.createdTimestamp;
      this.main.util.vcGacha().then(body => {
        message.channel.send('', {embed: {
          title: "Congratulation!!",
          color: 0xff0000,
          description: `\u200b\nCongratulation! ${name} has married to ${body.name}! She has a rarity of ${body.rarity}, how lucky!`,
          image: {
            url: body.image
          }
        }});
      });
    }
  }
}