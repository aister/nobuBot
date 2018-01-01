const snek = require('snekfetch');
const Command = require('../../main/command');
const Constants = require('../../main/const');

module.exports = class FGOQuizCommand extends Command {
  constructor(main) {
    super(main, {
      name: "fgo-quiz",
      category: "Fate Grand Order",
      help: "Get a quiz of a random Servant in Fate Grand Order, you have 5 minutes!"
    });
    this.quizStatus = {};
  }
  run(message, args, prefix) {
    if (this.quizStatus[message.channel.id]) {
      message.channel.send("Another quiz is currently taking place, please wait until it's done to start a new one");
      return;
    }
    snek.get(`${Constants.db}fgo_main.json`).then(r => {
      r = JSON.parse(r.text);
      let servantList = [];
      let result = {};
      for (let item in r) {
        servantList.push(r[item]);
      }
      if (Math.random() <= 0.5) {
        r = this.main.util.ARand(servantList);
        console.log(r.name);
        result = {
          title: "Which servant has this Noble Phantasm?",
          description: `\u200b\n${r.NP.split('\n').slice(0, 2).join('\n').replace(/\([^\)]+\) /g, '')}\n\nYou have 5 minutes to answer (case insensitive)`
        }
      } else {
        do {
          r = this.main.util.ARand(servantList);
        } while (r.desc == "None");
        console.log(r.name);
        result = {
          title: "Which servant is this?",
          description: `\u200b\n${r.desc.replace(new RegExp(r.name, 'g'), '[REMOVED]')}You have 5 minutes to answer (case insensitive)`
        }
      }
      this.quizStatus[message.channel.id] = true;
      message.channel.send("", { embed: result }).then(() => {
        message.channel.awaitMessages(m => r.name.toLowerCase() == m.content.toLowerCase(), {
          max: 1,
          time: 300000, 
          errors: ['time']
        }).then(m => {
          message.channel.send(`Congratulation! ${m.first().author} has got the correct answer! The answer is ${r.name} (ID: ${r.id})`);
          this.quizStatus[message.channel.id] = 0;
        }).catch(() => {
          message.channel.send(`5 minutes has passed, and no one has the answer. The correct answer is ${r.name} (ID: ${r.id})`);
          this.quizStatus[message.channel.id] = 0;
        });
      })
    });
  }
}