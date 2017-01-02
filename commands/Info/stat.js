exports.help = "stat :: For nerds only";
exports.exec = (client, message, msgArray, callback) => {
  bot = client.bot;
  embed = {
    title: "Status for " + client.bot.user.username,
    description: "\n\u200b",
    thumbnail: { url: client.bot.user.avatarURL },
    fields: [
      {
        name: "Bot uptime",
        value: Math.floor(bot.uptime / 864000000) + 'd : ' + (Math.floor(bot.uptime / 3600000) % 24) + 'h : ' + (Math.floor(bot.uptime / 60000) % 60) + 'm : ' + (Math.floor(bot.uptime / 1000) % 60) + 's',
        inline: true
      },
      {
        name: "Process uptime",
        value: Math.floor(process.uptime() / 864000) + 'd : ' + (Math.floor(process.uptime() / 3600) % 24) + 'h : ' + (Math.floor(process.uptime() / 60) % 60) + 'm : ' + (Math.floor(process.uptime()) % 60) + 's',
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
        value: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB',
        inline: true
      }
    ]
  }
  message.channel.sendMessage('', {embed}).then(callback);
}