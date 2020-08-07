const GoogleTranslate = require('google-translate-api');
const Command = require('../../main/command');

module.exports = class TranslateCommand extends Command {
  constructor(main) {
    super(main, {
      name: "translate",
      category: "General",
      help: "Translate text to English using Google Translate",
      args: [
        {
          name: "Text",
          desc: "The text to translate"
        }
      ],
      caseSensitive: true
    })
  }
  run(message, args, prefix) {
    args = args.join(' ');
    let embed = {
      title: "Google Translation",
      fields: [
        {
          name: "Input",
          value: `\`\`\`\n${args}\`\`\``
        },
        {
          name: "Translated to English",
          value: ""
        }
      ],
      description: '\u200b\n'
    }
    if (args) {
      GoogleTranslate(args, {to: 'en'}).then(res => {
        embed.fields[1].value = `\`\`\`\n${res.text}\`\`\``;
        message.channel.send('', {embed});
      }).catch(err => {
        embed.fields[1].name = "Error while translating";
        embed.fields[1].value = `\`\`\`\nerr\`\`\``;
        message.channel.send('', {embed});
      });
    } else {
      embed.fields[1].name = "Error while translating";
      embed.fields[1].value = `\`\`\`\nNo argument is provided\`\`\``;
      message.channel.send('', {embed});
    }
  }
}