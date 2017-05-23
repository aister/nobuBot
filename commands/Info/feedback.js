exports.help = "feedback <content> :: Send us a feedback, it can be compliment, bug report, or feature request and suggestions";
exports.exec = (bot, message, msgArray, callback) => {
  embed = {
    title: "Feedback received!",
    description: msgArray.slice(1).join(' '),
    footer: {
      text: "Sent by " + message.author.username + " (" + message.author.id + ") from channel " + message.channel.id
    }
  }
  bot.bot.channels.get('265147311615639553').send('', {embed}).catch(console.log)
}