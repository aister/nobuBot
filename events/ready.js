exports.exec = (client) => {
  return () => {
    taken = Date.now() - client.initTime;
    console.log("Nobu! Took " + taken + "ms to log in");
    client.initTime = taken + client.initTime;
    if (!client.config.selfbot && !process.env.SELFBOT) client.bot.user.setPresence({ game: { name: "with " + client.prefix + "help command", type: 0 } });
    if (client.config.logChannel && (channel = client.bot.channels.get(client.config.logChannel))) channel.send("Bot is running. " + process.env.HEROKU_RELEASE_VERSION || "");
  };
}
