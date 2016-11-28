exports.help = "pervert :: Add yourself to the pervert list\n\nPerverts will be able to see the nsfw channels, if there is one";
exports.exec = (client, message, msgArray, callback) => {
  if (channel = message.guild.channels.find('name', 'nsfw')) channel.overwritePermissions(message.member, { 'READ_MESSAGES': true });
  message.channel.sendMessage("KYAAA!! " + message.member + " is a Pervert!!!");
}