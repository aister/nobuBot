var translate = require('google-translate-api');
exports.help = "translate <sentence> :: Translate the sentenace to English";
exports.exec = (bot, message, msgArray, callback) => {
  translate(msgArray.slice(1).join(' '), {to: 'en'}).then(res => {
    embed = {
      title: "Google Translation",
      description: '```\n' + res.text + "```"
    }
    message.channel.send('', {embed});
  }).catch(err => {
      console.error(err);
  });
}