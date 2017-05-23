exports.help = "createinvite <channel mention> :: Create a 24-hour invite code for the mentioned channel";
exports.exec = (client, message, msgArray, callback) => {
  if (!message.guild) return;
  if (message.member.hasPermission("CREATE_INSTANT_INVITE")) {
    if (message.mentions.channels.size > 0) {
      message.mentions.channels.first().createInvite().then(invite => {
        message.channel.send("<http://discord.gg/" + invite + ">");
      });
    }
  } else message.reply("you don't have the permission to create invites");
}