exports.help = "server :: Get server info";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  var invite = "Not created";
  message.guild.fetchInvites().then(invites => {
    invites = invites.filter(i => i.channel.id == message.guild.defaultChannel.id);
    if (invites.size > 0) {
      invite = "<http://discord.gg/" + invites.first().code + ">";
    }
    message.channel.sendMessage("" + 
      "**__INFO FOR SERVER:__**\n\n" +
      "**Name:** " + message.guild.name + " (ID: " + message.guild.id + ")\n" +
      "**Created At:** " + message.guild.createdAt.toUTCString() + "\n" +
      "**Server Creator:** " + message.guild.owner.user.username + " (ID: " + message.guild.owner.id + ")\n" +
      "**Custom Emoji:** " + message.guild.emojis.size + "\n" +
      "**Member Count:** " + message.guild.memberCount + "\n" +
      "**Icon URL:** <" + message.guild.iconURL + ">\n" +
      "**Default Channel Invite Link:** " + invite +
    "");
  });
}