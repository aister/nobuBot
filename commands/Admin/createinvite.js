exports.help = "createinvite <channel mention> :: Create an invite code to the mentioned channel, valid for 24 hours";
exports.exec = (client, message, msgArray, callback) => {
  if (!message.guild) return;
  if (message.member.highestRole.name.toLowerCase().includes('admin')) {
    if (message.mentions.channels.size > 0) {
      message.mentions.channels.first().createInvite().then(invite => {
        message.channel.sendMessage("<http://discord.gg/" + invite + ">");
      });
    }
  } else message.reply("only admins can use this command");
}