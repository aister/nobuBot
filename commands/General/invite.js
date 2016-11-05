exports.help = "invite <optional: channel mention> :: Get invite link to the channel";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  var invite = "Not created";
  channelID = message.guild.defaultChannel.id;
  if (message.mentions.channels.size > 0) channelID = message.mentions.channels.first().id;
  message.guild.fetchInvites().then(invites => {
    invites = invites.filter(i => i.channel.id == channelID);
    if (invites.size > 0) message.channel.sendMessage("<http://discord.gg/" + invites.first().code + ">");
    else message.channel.sendMessage("No invite found for this channel. Do you want to create an invite link?\nSay `" + bot.prefix + "yes` to create one").then(msg => {
      message.channel.awaitMessages(m => m.author.id == message.author.id && m.content == bot.prefix + "yes", {max: 1, time: 30000, errors: ['time']}).then(confirm => {
        confirm.first().delete();
        msg.delete();
        if (message.member.hasPermission("CREATE_INSTANT_INVITE")) {
          message.channel.createInvite().
        }
      });
    });
  });
}