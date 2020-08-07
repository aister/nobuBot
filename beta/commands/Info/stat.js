const Command = require('../../main/command');

module.exports = new Command({
  info: {
    name: "stat",
    category: "Bot Info",
    help: "See various stats of the bots"
  },
  run(message, main, args, prefix) {
    const bot = main.client;
    const promises = [
      main.client.shard.fetchClientValues('guilds.size'),
      main.client.shard.fetchClientValues('channels.size')
    ];
    Promise.all(promises).then(results => {
      results = results.map(result => {
        return result.reduce((prev, count) => prev + count, 0);
      });
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
            name: "Memory Usage",
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`
          },
          {
            name: "Total Commands",
            value: main.commands.size,
            inline: true
          },
          {
            name: "This shard's stats:",
            value: `Shard ID: ${bot.shard.id}\nGuilds: ${bot.guilds.size}\nChannels: ${bot.channels.size}`,
            inline: true
          },
          {
            name: "Total stats:",
            value: `Shard counts: ${bot.shard.count}\nGuilds: ${results[0]}\nChannels: ${results[1]}`,
            inline: true
          }
        ]
      }});
    });
  }
});