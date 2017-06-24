const SAGuild = "289739300986290176";
const SARole = "325116016432775169";
exports.help = "signup :: Add (or remove) yourself to the Notification Squad, who will get notified whenever a new patch note is posted";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  if (message.guild.id != SAGuild) {
    message.channel.send("This command can only be used in SimAirport Official Discord Guild");
  } else {
    if (message.member.roles.has(SARole)) {
      message.member.removeRole(SARole).then(() => {
        message.channel.send("Successfully removed " + message.member + " from the Notification Squad. Use the command again whenever you change your mind.");     
      });
    } else {
      message.member.addRole(SARole).then(() => {
        message.channel.send("Successfully added " + message.member + " to the Notification Squad. Use the command again if you ever wanna opt out.")
      })
    }
  }
}