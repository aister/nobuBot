const Command = require('../../main/command');

module.exports = class SimAirportNotifCommand extends Command {
  constructor(main) {
    super(main, {
      name: "signup",
      category: "SimAirport",
      help: "Add (or remove) yourself to the Notification Squad, who will get notified whenever a new patch note is posted"
    });
    this.id = {
      guild: "289739300986290176",
      role: "325116016432775169"
    };
  }
  run(message, args, prefix) {
    if (!message.guild || message.guild.id != this.id.guild) return message.channel.send("This command can only be used in SimAirport Official Discord Guild");
    if (message.member.roles.has(this.id.role)) {
      message.member.removeRole(this.id.role).then(() => {
        message.channel.send(`Successfully removed ${message.member} from the Notification Squad. Use the command again whenever you change your mind.`);     
      });
    } else {
      message.member.addRole(this.id.role).then(() => {
        message.channel.send(`Successfully added ${message.member} to the Notification Squad. Use the command again if you ever wanna opt out.`)
      })
    }
  }
}