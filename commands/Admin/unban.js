exports.help = "unban <mentions> :: Unban all mentioned people";
exports.exec = (client, message, msgArray, callback) => {
  if (!message.guild) return;
  if (message.member.highestRole.name.toLowerCase().includes('admin')) {
    message.reply("why do you want to unban these users?\nType " + client.prefix + "cancel or say nothing for 30 seconds to cancel").then(msg => {
      message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000, errors: ['time']}).then(confirm => {
        msg.delete();
        if (confirm.first().content == client.prefix + "cancel") {
          message.channel.sendMessage('Unban cancelled');
        } else {
          banList = message.guild.fetchBans();
          message.mentions.users.forEach(user => {
            if (banList.exists(user.id)) {
              message.guild.unban(user.id).then(() => {
                if (message.guild.channels.exists("name", "mod-log")) { 
                  message.guild.channels.find("name", "mod-log").sendMessage(message.author + " has unbanned " + user + ". Reason: " + confirm.first().content);
                } else {
                  message.guild.createChannel("mod-log", "text").then(channel => { channel.sendMessage(message.author + " has unbanned " + user + ". Reason: " + confirm.first().content); });
                }
              });
            }
          });
        }
      }).catch(() => {
        message.sendMessage("30 seconds has passed, unban cancelled");
      })
    });
  } else message.reply("only admins can use this command");
}