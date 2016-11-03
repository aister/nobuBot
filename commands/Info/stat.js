exports.help = "stat :: For nerds only";
exports.exec = (client, message, msgArray, callback) => {
  bot = client.bot;
  message.channel.sendMessage('' +
    '**Bot uptime:** ' + Math.floor(bot.uptime / 864000000) + 'd : ' + (Math.floor(bot.uptime / 3600000) % 24) + 'h : ' + (Math.floor(bot.uptime / 60000) % 60) + 'm : ' + (Math.floor(bot.uptime / 1000) % 60) + 's\n' +
    '**Process uptime:** ' + Math.floor(process.uptime() / 864000) + 'd : ' + (Math.floor(process.uptime() / 3600) % 24) + 'h : ' + (Math.floor(process.uptime() / 60) % 60) + 'm : ' + (Math.floor(process.uptime()) % 60) + 's\n' +
    '**Total Servers:** ' + bot.guilds.size + '\n' +
    '**Total Channels:** ' + bot.channels.size + '\n' +
    '**Total Cached Users:** ' + bot.users.size + '\n' +
    '**Memory Usage:** RSS: ' + (process.memoryUsage().rss / 1024 / 1000).toFixed(2) + 'MB | Heap Used: ' + (process.memoryUsage().heapUsed / 1024 / 1000).toFixed(2) + 'MB' + 
  '').then(callback);
}