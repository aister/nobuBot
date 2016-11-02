
exports.help = "about :: Learn more about nobuBot";
dversion = require("discord.js").version;
exports.exec = (client, message, msgArray, callback) => {
  message.channel.sendMessage('' +
    'NobuBot (version ' + (process.env.HEROKU_RELEASE_VERSION || "1.0.0") + ')\n\n' +
    '**Creator:** Aister Pendragon (email: hellodecasino@gmail.com)\n' +
    '**Engine:** Discord.js version ' + dversion + ' (<https://github.com/hydrabolt/discord.js>)\n' +
    '**Source Code:** <https://github.com/aister/nobuBot>\n' +
    '**Website:** not yet implement\n' +
    '**Support Server:** not yet implement\n' +
  '').then(callback);
}