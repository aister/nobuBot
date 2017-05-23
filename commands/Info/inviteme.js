exports.help = "inviteme :: Get nobuBot to your server";
exports.exec = (bot, message, msgArray, callback) => {
  message.channel.send('To invite the bot, use this link: https://discordapp.com/oauth2/authorize?scope=bot&client_id=228126136192860160').then(callback);
}