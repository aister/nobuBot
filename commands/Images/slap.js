exports.help = "slap <mention> :: Slap the mentioned user";
exports.exec = (bot, message, msgArray, callback) => {
  function url (text) { return "http://moesocial.com/slap.php?text=" + encodeURI(text); }
  if (message.mentions.users.size > 0) {
    mentions = message.mentions.users.first();
    if (mentions.id == "184369428002111488") {
      embed = { image: { url: url(mentions.username)}}
      if (message.guild) embed = { image: { url: url(message.member.displayName)}}
      message.channel.sendMessage('', { embed });
    } else if (message.guild) {
      message.guild.fetchMember(mentions).then(m => {
        embed = { image: { url: url(m.displayName)}}
        message.channel.sendMessage('', { embed });
      });
    } else {
      embed = { image: { url: url(mentions.username)}}
      message.channel.sendMessage('', { embed });
    }
  } else {
    embed = { image: { url: url(msgArray.slice(1).join(' '))}}
    message.channel.sendMessage('', { embed });
  }
}