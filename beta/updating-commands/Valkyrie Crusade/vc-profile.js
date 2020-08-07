const Command = require('../../main/command');
const Constants = require('../../main/const');
const snek = require('snekfetch');

module.exports = class VCProfileCommand extends Command {
  constructor(main) {
    super(main, {
      name: "vc-profile",
      category: "Valkyrie Crusade",
      help: "Get your saved VC Profile",
      args: [
        {
          name: "Player",
          desc: "Optional. The bot will show the player's profile if this argument is provided and the player's privacy setting is off. Can use User Mention or User ID for this argument."
        }
      ]
    });
  }
  run(message, args, prefix) {
    let player = message.author.id;
    if (args = args.join(' ')) {
      let mentionID = args.match(/(?:<@!?)?(\d+)/);
      if (mentionID) player = mentionID[1];
      else player = "";
    }
    Promise.all([this.main.db.get(`vcProfile_${player}`), this.main.client.fetchUser(player)]).then((profile) => {
      if (profile[0]) {
        profile[0] = JSON.parse(profile[0]);
        if (!profile.privacy || !args) message.channel.send('', {embed: this.main.util.vcProfile(profile[1], profile[0])});
        else message.channel.send(`This player has set his privacy setting to true, thus the profile cannot be displayed`);
      } else if (args) message.channel.send(`Cannot find profile of provided player. Please recheck your arguments and try again`);
      else message.channel.send(`Profile not found, please use \`${prefix}vc-profile-edit\` to create one`);
    });
  }
}
