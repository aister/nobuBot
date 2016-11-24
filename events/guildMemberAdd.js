exports.exec = (client) => {
  return (member) => {
    if (!client.config.selfbot) member.guild.defaultChannel.sendMessage('Welcome ' + member + ' to ' + member.guild + '! Enjoy your stay!');
  }
}