exports.exec = (client) => {
  return () => {
    taken = Date.now() - client.initTime;
    console.log("Nobu! Took " + taken + "ms to log in");
    client.initTime = taken + client.initTime;
    if (client.config.logChannel && (channel = client.bot.channels.get(client.config.logChannel))) channel.sendMessage("Bot is running. " + process.env.HEROKU_RELEASE_VERSION || "");
  };
}