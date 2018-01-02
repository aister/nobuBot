const Command = require('../../main/command');

module.exports = class StatCommand extends Command {
  constructor(main) {
    super(main, {
      name: "stat",
      category: "Bot Info",
      alias: ["stats"],
      help: "See various stats of the bots"
    });
  }
  run(message, args, prefix) {
    const bot = this.main.client;
    message.channel.send('', {embed: {
      title: `Status for ${bot.user.username}`,
      description: "\n\u200b",
      thumbnail: { url: bot.user.avatarURL },
      fields: [
        {
          name: "Bot uptime",
          value: `${Math.floor(bot.uptime / 864000000)}d : ${Math.floor(bot.uptime / 3600000) % 24}h : ${Math.floor(bot.uptime / 60000) % 60}m : ${Math.floor(bot.uptime / 1000) % 60}s`,
          inline: true
        },
        {
          name: "Process uptime",
          value: `${Math.floor(process.uptime() / 864000)}d : ${Math.floor(process.uptime() / 3600) % 24}h : ${Math.floor(process.uptime() / 60) % 60}m : ${Math.floor(process.uptime()) % 60}s`,
          inline: true
        },
        {
          name: "Total Servers",
          value: bot.guilds.size,
          inline: true
        },
        {
          name: "Total Channels",
          value: bot.channels.size,
          inline: true
        },
        {
          name: "Total Cached Users",
          value: bot.users.size,
          inline: true
        },
        {
          name: "Memory Usage",
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
          inline: true
        },
        {
          name: "Total Commands",
          value: this.main.commands.size,
          inline: true
        }
      ]
    }});
  }
}