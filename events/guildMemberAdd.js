exports.exec = (client) => {
  return (member) => {
    if (!client.config.selfbot) {
      member.guild.defaultChannel.sendMessage('Welcome ' + member + ' to ' + member.guild + '! Enjoy your stay!');
      if (member.guild.id == "274433246299684864") {
        member.guild.channels.get("286680607260672000").fetchMessage("290206770293374986").then(m => {
          member.sendMessage("Welcome " + member + " to " + member.guild.name + "\n\n" + m.content);
        });
      }
    }
  }
}