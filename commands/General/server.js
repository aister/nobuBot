exports.help = "server :: Get server info";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  var invite = "Not created";
  message.guild.fetchInvites().then(invites => {
    invites = invites.filter(i => i.channel.id == message.guild.defaultChannel.id);
    if (invites.size > 0) {
      invite = "<http://discord.gg/" + invites.first().code + ">";
    }
    embed = {
      title: "Server Info of: " + message.guild.name + " (ID: " + message.guild.id + ")",
      description: "\u200b",
      fields: [
        {
          name: "Owner",
          value: message.guild.owner.displayName,
          inline: true
        },
        {
          name: "Member Count",
          value: message.guild.members.size,
          inline: true
        },
        {
          name: "Default Channel Invite Link",
          value: invite,
          inline: true
        },
        {
          name: "Created At",
          value: message.guild.createdAt.toUTCString()
        }
      ],
      thumbnail: {
        url: message.guild.iconURL
      }
    }
    message.channel.sendMessage('', {embed}).catch(console.log);
  });
}