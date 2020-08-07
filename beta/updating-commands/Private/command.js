const util = require('util');
const Command = require('../../main/command');
const Constants = require('../../main/const');
module.exports = class CommandUsageCommand extends Command {
  constructor(main) {
    super(main, {
      name: "command",
      devOnly: true,
      caseSensitive: true
    });
  }
  run(message, args, prefix) {
    if (message.author.id == this.main.config.ownerID) {
      args = "```\n";
      let command;
      for (command of this.main.commands) {
        if (command[1].timeUsed) args += `${command[0]}: ${command[1].timeUsed} times\n`;
      }
      args += `\`\`\`\nProcess uptime: ${Math.floor(process.uptime() / 864000)}d : ${Math.floor(process.uptime() / 3600) % 24}h : ${Math.floor(process.uptime() / 60) % 60}m : ${Math.floor(process.uptime()) % 60}s`;
      message.channel.send(args);
    }
  }
}