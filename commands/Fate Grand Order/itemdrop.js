exports.help = "itemdrop <item ID or name> :: Get the list of all possible drop location for a certain item. Omit <item ID or name> to get list of all items\n\nThe list will be sent via DMs to avoid wall of texts";
exports.exec = (client, message, msgArray, callback) => {
  client.commands.item.exec(client, message, msgArray, function(item) {
    embed = {
      title: item.name + " - ID: " + msgArray,
      description: '\u200b',
      fields: item.location,
      thumbnail: { url: item.img }
    };
    message.author.send('', {embed}).then(() => {
      message.channel.send("The drop list has been sent to you via DM");
    }).catch(() => {
      message.channel.send("The drop list couldn't be sent for some reason, please check your DM settings");
    });
  });
}
