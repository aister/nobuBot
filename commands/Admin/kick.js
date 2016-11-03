exports.help = "kick <mentions> :: Kick all mentioned people";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  if (message.member.highestRole.name.toLowerCase().includes('admin')) {
    message.reply("why do you want to kick these users?\nType " + client.prefix + "cancel or say nothing for 30 seconds to cancel").then(msg => {
      message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000, errors: ['time']}).then(confirm => {
        msg.delete();
        if (confirm.first().content == client.prefix + "cancel") {
          message.channel.sendMessage('Kick cancelled');
        } else {    
          message.mentions.users.forEach(user => {
            if (message.guild.members.get(user.id).kickable) {
              message.guild.members.get(user.id).kick().then(() => {
                user.sendMessage("You have been kicked from " + message.guild + ".\n" +
                  "**By:** " + message.author + "\n" + 
                  "**Reason:** " + confirm.first().content + "\n\n" +
                  "If you want to appeal the action, please PM the mod.");
                if (message.guild.channels.exists("name", "mod-log")) { 
                  message.guild.channels.find("name", "mod-log").sendMessage(message.author + " has kicked " + user);
                } else {
                  message.guild.createChannel("mod-log", "text").then(channel => { channel.sendMessage(message.author + " has kicked " + user); });
                }
              });
            }
          });
        }
      }).catch(() => {
        message.sendMessage("30 seconds has passed, kick cancelled");
      })
    });
  } else message.reply("only admins can use this command");
}