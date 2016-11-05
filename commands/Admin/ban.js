exports.help = "ban <mentions> :: Ban all mentioned people";
exports.exec = (client, message, msgArray, callback) => {
  if (!message.guild) return;
  if (message.member.highestRole.name.toLowerCase().includes('admin')) {
    if (message.mentions.users.size == 0) return;
    message.reply("why do you want to ban these users?\nType " + client.prefix + "cancel or say nothing for 30 seconds to cancel").then(msg => {
      message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000, errors: ['time']}).then(confirm => {
        msg.delete();
        if (confirm.first().content == client.prefix + "cancel") {
          message.channel.sendMessage('Ban cancelled');
        } else {
          message.mentions.users.forEach(user => {
            if (message.guild.members.get(user.id).bannable) {
              message.guild.members.get(user.id).ban().then(() => {
                user.sendMessage("You have been banned from " + message.guild + ".\n" +
                  "**By:** " + message.author + "\n" + 
                  "**Reason:** " + confirm.first().content + "\n\n" +
                  "If you want to appeal the action, please PM the mod.");
                if (message.guild.channels.exists("name", "mod-log")) { 
                  message.guild.channels.find("name", "mod-log").sendMessage(message.author + " has banned " + user + ". Reason: " + confirm.first().content);
                } else {
                  message.guild.createChannel("mod-log", "text").then(channel => { channel.sendMessage(message.author + " has banned " + user + ". Reason: " + confirm.first().content); });
                }
              });
            }
          });
        }
      }).catch(() => {
        message.sendMessage("30 seconds has passed, ban cancelled");
      })
    });
  } else message.reply("only admins can use this command");
}