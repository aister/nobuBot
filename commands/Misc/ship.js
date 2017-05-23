exports.help = "ship :: shipping two random people in the guild";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  let gm = message.guild.members;
  let uke = message.guild.members.random();
  gm.delete(uke.id);
  uke = uke.displayName;
  let seme = message.guild.members.random().displayName;
  message.channel.send(uke + " x " + seme + " OTP!!");
}