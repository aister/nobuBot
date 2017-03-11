exports.help = "vc-waifu :: Marry a random maiden in Valkyrie Crusade";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  let gm = message.guild.members;
  let uke = message.guild.members.random();
  gm.delete(uke.id);
  uke = uke.displayName;
  let seme = message.guild.members.random().displayName;
  message.channel.sendMessage(uke + " x " + seme + " OTP!!");
}