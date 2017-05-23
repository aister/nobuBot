exports.exec = (client) => {
  return () => {
    taken = Date.now() - client.initTime;
    console.log("Nobu! Took " + taken + "ms to log in");
    client.initTime = taken + client.initTime;
    if (!client.config.selfbot) client.bot.user.setGame("with " + client.prefix + "help command");
    if (client.config.logChannel && (channel = client.bot.channels.get(client.config.logChannel))) channel.send("Bot is running. " + process.env.HEROKU_RELEASE_VERSION || "");
  };
}