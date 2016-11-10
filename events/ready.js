var client;
exports.init = (init) => {
  client = init;
}
exports.exec = () => {
  console.log("Nobu!");
  if (client.config.logChannel && (channel = client.bot.channels.get(client.config.logChannel))) channel.sendMessage("Bot is running. " + process.env.HEROKU_RELEASE_VERSION || "");
}