exports.help = "nsfw :: Initiate NSFW functions";
function createChannel(message, callback) {
  if (!message.guild.channels.exists('name', 'nsfw')) {
    message.guild.createChannel('nsfw', 'text').then(callback);
  } else {
    callback(message.guild.channels.find('name', 'nsfw'));
  }
}
exports.exec = (client, message, msgArray, callback) => {
  if (message.member.highestRole.name.toLowerCase().includes('admin') || message.author.id == message.guild.ownerID) {
    createChannel(message, (channel) => {
      channel.overwritePermissions(message.guild.roles.get(message.guild.id), { 'READ_MESSAGES': false });
      channel.overwritePermissions(message.member.highestRole, { 'READ_MESSAGES': true});
      message.channel.sendMessage('Initiation complete!');
      callback();
    });
  }
}
