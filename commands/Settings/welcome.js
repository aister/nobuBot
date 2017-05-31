exports.help = "welcome <message> :: set welcome message for new members (only for users with Manage Server permission)\n\nUse [member] and [guild] (the square brackets are included) as placeholder for new member's name and guild's name\nUse [disable] (square brackets included) to disable welcoming message";
exports.exec = (client, message, msgArray, callback) => {
  if (message.member.hasPermission('MANAGE_GUILD')) {
    client.getDB('config_' + message.guild.id).then(() => {
      result = JSON.parse(client.dbCache['config_' + message.guild.id]) || {};
      content = msgArray.slice(1).join(' ');
      if (content.includes('[disable]')) {
        result.welcome = false;
        message.channel.send("Welcome message has been disabled successfully!");
      } else {
        result.welcome = content;
        message.channel.send("Welcome message has been changed successfully!")
      }
      result = JSON.stringify(result);
      client.db.set('config_' + message.guild.id, result, function() {
        client.dbCache['config_' + message.guild.id] = result;
      });
    });
  } else {
    message.channel.send("You don't have MANAGE SERVER permission, you can't use this command");
  }
}
