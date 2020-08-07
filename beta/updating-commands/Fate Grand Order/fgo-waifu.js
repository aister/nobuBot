const Command = require('../../main/command');

module.exports = new Command({
  info: {
    name: "fgo-waifu",
    category: "Fate Grand Order",
    help: "Marry a random Servant in Fate Grand Order. Could be male or female though!\n\nCurrent Rate: 1% 5* | 7% 4* | 20% 3* | 30% 2* | 42% 1*",
  },
  cooldown: {},
  resetCooldown(id) {
    this.cooldown[id] = 0;
  },
  run(message, main, args, prefix) {
    let name = message.author.username;
    if (message.member) name = message.member.displayName;
    let time = this.cooldown[message.author.id] - message.createdTimestamp + 900000;
    if (time > 0 && message.author.id != main.config.ownerID) {
        message.channel.send(`You can only use this command once every 15 minutes. You can use it again in ${Math.floor(time / 60000)} minutes ${Math.ceil(time / 1000) % 60} seconds`);
    } else {
      this.cooldown[message.author.id] = message.createdTimestamp;
      main.util.fgoGacha().then(body => {
        message.channel.send('', {embed: {
          title: "Congratulation!!",
          color: 0xff0000,
          description: `\u200b\nCongratulation! ${name} has married to ${body.name}! He/She has a rarity of ${body.rarity}, how lucky!`,
          image: {
            url: `https://fate-go.cirnopedia.org/icons/servant_card/${body.id}1.jpg`
          }
        }});
      });
    }
  }
});