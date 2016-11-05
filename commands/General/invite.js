exports.help = "invite <optional: channel mention> :: Get invite link to the channel";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  var invite = "Not created";
  channelID = message.guild.defaultChannel.id;
  if (message.mentions.channels.size > 0) channelID = message.mentions.channels.first().id;
  message.guild.fetchInvites().then(invites => {
    invites = invites.filter(i => i.channel.id == channelID);
    if (invites.size > 0) message.channel.sendMessage("<http://discord.gg/" + invites.first().code + ">");
    else message.channel.sendMessage("No invite found for this channel");
  });
}