exports.help = "invite :: Get nobuBot to your server";
exports.exec = (bot, message, msgArray, callback) => {
  message.channel.sendMessage('To invite the bot, use this link: https://discordapp.com/oauth2/authorize?permissions=268610582&scope=bot&client_id=228126136192860160').then(callback);
}