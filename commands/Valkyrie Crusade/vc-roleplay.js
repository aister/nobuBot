const Command = require('../../main/command');

module.exports = class VCRoleplayCommand extends Command {
  constructor(main) {
    super(main, {
      name: "vc-roleplay",
      category: "Valkyrie Crusade",
      help: "Change your nickname to a random servant in Fate Grand Order\n\nCurrent Rate: 1% 5* | 7% 4* | 20% 3* | 30% 2* | 42% 1*"
    });
    this.cooldown = {};
  }
  resetCooldown(id) {
    this.cooldown[id] = 0;
  }
  run(message, args, prefix) {
    if (!message.guild) {
      message.channel.send("This command is only usable in Guilds");
      return;
    }
    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
      message.channel.send("This command can't be used, because the bot can't change your nickname");
      return;
    }
    message.guild.fetchMember(message.author).then(gm => {
      let name = gm.displayName;
      let time = this.cooldown[gm.id] - message.createdTimestamp + 900000;
      if (time > 0 && gm.id != this.main.config.ownerID) {
        message.channel.send(`You can only use this command once every 15 minutes. You can use it again in ${Math.floor(time / 60000)} minutes ${Math.ceil(time / 1000) % 60} seconds`);
      } else {
        this.cooldown[gm.id] = message.createdTimestamp;
        this.main.util.vcGacha().then(body => {
          gm.setNickname(`${body.name} (${name})`).then(() => {
            message.channel.send('', {embed: {
              title: "Congratulation!!",
              color: 0xff0000,
              description: `\u200b\n${name} has been nicknamed to ${body.name}!`,
              image: {
                url: body.image
              }
            }});
          }).catch(e => {
            message.channel.send(`ERROR: Can't change your nickname, probably because it was too long. You got: ${body.name}`);
            console.log(e);
          });
        });
      }
    });
  }
}