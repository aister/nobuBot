const util = require('util');
const Command = require('../../main/command');
const Constants = require('../../main/const');
module.exports = class EvalCommand extends Command {
  constructor(main) {
    super(main, {
      name: "eval",
      devOnly: true,
      caseSensitive: true
    });
  }
  run(message, args, prefix) {
    if (message.author.id == this.main.config.ownerID) {
      let client = this.main.client;
      args = args.join(' ');
      let embed = {
        title: "Eval",
        description: "\u200b\n",
        fields: [
          {
            name: "Input",
            value: `\`\`\`js\n${args}\`\`\``
          }, 
          {
            name: "Output",
            value: args
          }
        ]
      }
      if (args) {
        let removeToken = (str) => {
          if (typeof str == "string") str = str.replace(new RegExp(this.main.config.token.replace(/\./g, "\\."), 'g'), 'Removed');
          return str;
        }
        try {
          let evaled = eval(args);
          if (typeof evaled == "object")
            embed.fields[1].value = `\`\`\`js\n${removeToken(util.inspect(evaled, {depth: 0}))}\n\`\`\``;
          else
            embed.fields[1].value = `\`\`\`js\n${removeToken(evaled)}\n\`\`\``;
        } catch(err) {
          embed.fields[1].name = "Error",
          embed.fields[1].value = `\`\`\`js\n${err}\n\`\`\``;
        }
      } else {
        embed.fields[1].name = "Error",
        embed.fields[1].value = `\`\`\`js\n${err}\n\`\`\``;
      }
      message.channel.send('', {embed});
    }
  }
}
