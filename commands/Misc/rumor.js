const Collection = require('discord.js').Collection;
exports.help = "rumor :: spread rumors about two random people in the guild\n\n(It's actually two random people who has said something in the last 100 messages but shhhhhh)";
exports.exec = (bot, message, msgArray, callback) => {
  if (!message.guild) return;
  message.channel.fetchMessages({limit: 100}).then(messages => {
    let seme = new Collection();
    messages.forEach(m => {
      if (m.member) { seme.set(m.author.id, m.member); }
    });
    let uke = seme.random();
    seme.delete(uke.id);
    if (seme.size) seme = seme.random();
    else seme = uke;
    message.channel.sendMessage("Psshh, I saw " + uke.displayName + " holding hands with " + seme.displayName + " while walking down the street last night!!");
  }).catch(console.log);
}