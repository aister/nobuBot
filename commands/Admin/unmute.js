exports.help = "unmute <mentions> :: Unmute all mentioned people";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  if (message.member.highestRole.name.toLowerCase().includes('admin') || message.author.id == message.guild.ownerID) {
    if (message.mentions.users.size == 0) return;
    message.reply("why do you want to unmute these users?\nType " + client.prefix + "cancel or say nothing for 30 seconds to cancel").then(msg => {
      message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000, errors: ['time']}).then(confirm => {
        msg.delete();
        if (confirm.first().content == client.prefix + "cancel") {
          message.channel.sendMessage('Ban cancelled');
        } else {        
          message.mentions.users.forEach(user => {
            if (message.guild.members.get(user.id).roles.exists('name', 'Muted')) {
              message.guild.members.get(user.id).removeRole(message.guild.members.get(user.id).roles.find('name', 'Muted')).then(() => {
                message.channel.sendMessage("Unmuted " + user);
                if (message.guild.channels.exists("name", "mod-log")) { 
                  message.guild.channels.find("name", "mod-log").sendMessage(message.author + " has unmuted " + user);
                } else {
                  message.guild.createChannel("mod-log", "text").then(channel => { channel.sendMessage(message.author + " has unmuted " + user); });
                }
              });
            } else message.channel.sendMessage('This person is not muted');
          });
        }
      }).catch(() => {
        message.sendMessage("30 seconds has passed, unmute cancelled");
      })
    });
  } else message.reply("only admins can use this command");
}