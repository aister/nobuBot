exports.help = "clean <number> :: Clear xx messages";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  if (message.member.highestRole.name.toLowerCase().includes('admin')) {
    if (msgArray.length == 1) return;
    if (!isNaN(msgArray[1])) {
      (function deleteMessages(number) {
        if (number > 100) {
          message.channel.bulkDelete(100).then(() => {
            setTimeout(function() { deleteMessages(number - 100); }, 1000);
          });
        } else {
          message.channel.bulkDelete(number).then(callback);
        }
      })(msgArray[1]);
    }
  } else message.reply("only admins can use this command");
}