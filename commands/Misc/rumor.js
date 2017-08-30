const Collection = require('discord.js').Collection;
const Rumors = [
  "Psshh, I saw [1] holding hands with [2] while walking down the street last night!!",
  "Psshh, I saw [1] hugging [2] in the amusement park yesterday!!"
];
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
    message.channel.send(Rumors[bot.commands.rnd.func(Rumors.length - 1)].replace('[1]', uke.displayName).replace('[2]', seme.displayName));
  }).catch(console.log);
}
