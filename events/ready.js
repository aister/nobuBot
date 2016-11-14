exports.exec = (client) => {
  return () => {
    console.log("Nobu!");
    if (client.config.logChannel && (channel = client.bot.channels.get(client.config.logChannel))) channel.sendMessage("Bot is running. " + process.env.HEROKU_RELEASE_VERSION || "");
  };
}