exports.exec = (client) => {
  return (guild) => {
    if (client.config.logChannel && (channel = client.bot.channels.get(client.config.logChannel))) channel.sendMessage("Bot has been removed from server " + guild + " (ID: " + guild.id + ")");
  }
}