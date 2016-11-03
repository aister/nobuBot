exports.help = "mute <mentions> :: Mute all mentioned people";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  if (message.member.highestRole.name.toLowerCase().includes('admin')) {
    message.reply("why do you want to mute these users?\nType " + client.prefix + "cancel or say nothing for 30 seconds to cancel").then(msg => {
      message.channel.awaitMessages(m => m.author.id == message.author.id, {max: 1, time: 30000, errors: ['time']}).then(confirm => {
        msg.delete();
        if (confirm.first().content == client.prefix + "cancel") {
          message.channel.sendMessage('Ban cancelled');
        } else {        
          if (!message.guild.roles.exists('name', 'Muted')) {
            message.guild.createRole( { name: "Muted", color: "#000001", hoist: true }).then(role => { 
              role.setPosition(message.guild.roles.size); 
              message.guild.channels.forEach(channel => {
                channel.overwritePermissions(role, { "SEND_MESSAGES": false }).catch(console.log);
              });
              message.mentions.users.forEach(user => {
                member = message.guild.members.get(user.id);
                if (!member.highestRole.name.toLowerCase().includes('admin')) {
                  if (!member.hasRole(role)) {
                    member.addRole(role).then(() => {
                      message.channel.sendMessage("Muted " + user);
                      if (message.guild.channels.exists("name", "mod-log")) { 
                        message.guild.channels.find("name", "mod-log").sendMessage(message.author + " has muted " + user);
                      } else {
                        message.guild.createChannel("mod-log", "text").then(channel => { channel.sendMessage(message.author + " has muted " + user); });
                      }
                    });
                  } else message.channel.sendMessage("This person has been muted");
                }
              });
            });
          } else {
            role = message.guild.roles.find('name', 'Muted');
            message.mentions.users.forEach(user => {
              member = message.guild.members.get(user.id);
              if (!member.highestRole.name.toLowerCase().includes('admin')) {
                if (!member.hasRole(role)) {
                  member.addRole(role).then(() => {
                    message.channel.sendMessage("Muted " + user);
                    if (message.guild.channels.exists("name", "mod-log")) { 
                      message.guild.channels.find("name", "mod-log").sendMessage(message.author + " has muted " + user);
                    } else {
                      message.guild.createChannel("mod-log", "text").then(channel => { channel.sendMessage(message.author + " has muted " + user); });
                    }
                  });
                } else message.channel.sendMessage("This person has been muted");
              }
            });
          }
        }
      }).catch(() => {
        message.sendMessage("30 seconds has passed, mute cancelled");
      })
    });
  } else message.reply("only admins can use this command");
}