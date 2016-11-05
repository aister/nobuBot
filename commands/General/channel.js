exports.help = "channel :: Check current channel info";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
    console.log('server');
    var invite = "Not created";
    message.guild.fetchInvites().then(invites => {
      console.log('yo');
      invites = invites.filter(i => i.channel.id == message.channel.id);
      if (invites.size > 0) {
        invite = "<http://discord.gg/" + invites.first().code + ">";
      }
      console.log(invite);
      message.channel.sendMessage("" + 
        "**__INFO FOR CHANNEL:__**\n\n" +
        "**Name:** " + message.channel.name + " (ID: " + message.channel.id + ")\n" +
        "**In Server:** " + message.guild.name + " (ID: " + message.guild.id + ")\n" +
        "**Created At:** " + message.channel.createdAt.toUTCString() + "\n" +
        "**Member Count:** " + message.channel.members.size + "\n" +
        "**Channel Invite Link:** " + invite +
      "");
    });
}