var translate = require('google-translate-api');
exports.help = "translate <sentence> :: Translate the sentenace to English";
exports.exec = (bot, message, msgArray, callback) => {
  translate(msgArray.slice(1).join(' '), {to: 'en'}).then(res => {
    message.channel.sendMessage("```\n" + msgArray.slice(1).join(' ') + "```:arrow_down: Translated into :arrow_down:\n```\n" + res.text + '```');
  }).catch(err => {
      console.error(err);
  });
}