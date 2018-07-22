const Command = require('../../main/command');

module.exports = class ShipCommand extends Command {
  constructor(main) {
    super(main, {
      name: "ship",
      category: "Misc",
      help: "Ship two random people in the guild together"
    });
  }

  async run(message, args, prefix) {
    if (!message.guild) return;
    let gm = message.guild.members;
    if (gm.size == 1) gm = await message.guild.fetchMembers();
    let uke = message.guild.members.random();
    gm.delete(uke.id);
    uke = uke.displayName;
    let seme = message.guild.members.random().displayName;
    message.channel.send(uke + " x " + seme + " OTP!!");
  }
}
