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
      topic = "None";
      if (message.channel.topic) topic = message.channel.topic;
      embed = {
        title: "Channel Info For: " + message.channel.name + " (ID: " + message.channel.id + ")",
        fields: [
          {
            name: "Server",
            value: message.guild.name,
            inline: true
          },
          {
            name: "Member Count",
            value: message.channel.members.size,
            inline: true
          },
          {
            name: "Invite Link",
            value: invite,
            inline: true
          },
          {
            name: "Created At",
            value: message.channel.createdAt.toUTCString()
          }
        ],
        description: "Topic: " + topic + "\n\u200b"
      }
      message.channel.sendMessage('', { embed }).catch(console.log);
    });
}