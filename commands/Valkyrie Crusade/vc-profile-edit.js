const Command = require('../../main/command');
const Constants = require('../../main/const');
const snek = require('snekfetch');

module.exports = class FGOProfileEditCommand extends Command {
  constructor(main) {
    super(main, {
      name: "vc-profile-edit",
      category: "Valkyrie Crusade",
      help: "Save or edit your VC Profile",
      argsSep: ' | ',
      args: [
        {
          name: "IGN",
          desc: "Your IGN. Format: `name: IGN`"
        },
        {
          name: "Friend ID",
          desc: "Your Friend ID. Format: `id: FriendID`"
        },
        {
          name: "Support Image",
          desc: "The image link showing your support list. Format: `support: Image Link`. You can also upload the image along with the command."
        },
        {
          name: "Privacy",
          desc: "Privacy Setting for your profile. Format: `privacy: true/false`. If set to `false`, everyone can use command to see your profile. Optional, default to true"
        },
        {
          name: "Role",
          desc: "Your role in game. For example, FAWK, LAWK, Sender, Alliance Leader, etc. Format: `role: Role name`"
        },
        {
          name: "Alliance",
          desc: "Your alliance name. Format: `alliance: Alliance name`"
        }
      ],
      caseSensitive: true
    });
  }
  run(message, args, prefix) {
    args = args.join(' ');
    let img = message.attachments.first();
    if (args || img) {
      this.main.db.get(`vcProfile_${message.author.id}`).then(profile => {
        if (profile) profile = JSON.parse(profile);
        else profile = {};
        let modified = false;
        args = args.match(/((?:name)|(?:id)|(?:support)|(?:privacy)|(?:role)|(?:alliance)) ?: ?[^\|]+/gi).forEach(item => {
          item = item.split(':');
          item[0] = item[0].toLowerCase().trim();
          item[1] = item.slice(1).join(':').trim();
          profile[item[0]] = item[1];
          modified = true;
          if (item[0] == "privacy") {
            if (item[1] == "false") profile.privacy = false;
            else profile.privacy = true;
          }
        });
        if (img) {
          profile.support = img.url;
          modified = true;
        }
        if (modified) {
          console.log(profile);
          this.main.db.set(`vcProfile_${message.author.id}`, JSON.stringify(profile)).then(() => {
            message.channel.send('Profile saved successfully', {embed: this.main.util.fgoProfile(message.author, profile)});
          });
        } else message.channel.send(`Error: No argument provided. Please consult \`${prefix}help vc-profile-edit\` for more information.`);
      });
    } else {
      message.channel.send(`Error: No argument provided. Please consult \`${prefix}help vc-profile-edit\` for more information.`);
    }
  }
}