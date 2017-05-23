var request = require('request');
exports.help = "fgo-quiz :: get a quiz of a random Servant in Fate Grand Order";
fgo_quiz = {};
exports.exec = (bot, message, msgArray, callback) => {
  if (fgo_quiz[message.channel.id]) {
    message.channel.send("Another quiz is currently taking place, please wait until it's done to start a new one");
    return;
  }
  request({ 
    url: "https://raw.githubusercontent.com/aister/nobuDB/master/fgo_main.json", 
    json: true
  }, function(err, res, body) {
    let servantList = [];
    for (item in body) {
      servantList.push(body[item]);
    }
    body = Math.random();
    if (body <= 0.5) {
      body = servantList.rand();
      console.log(body.name);
      result = body.NP.split('\n').slice(0, 2).join('\n').replace(/\([^\)]+\) /g, '');
      result = {
        title: "Which servant has this Noble Phantasm?",
        description: "\u200b\n" + result + "\n\nYou have 5 minutes to answer (case insensitive)"
      }
    } else {
      body = { desc: "None" };
      while (body.desc == "None") {
        body = servantList.rand();
      }
      console.log(body.name);
      result = {
        title: "Which servant is this?",
        description: "\u200b\n" + body.desc.replace(new RegExp(body.name, 'g'), '[REMOVED]') + "\n\nYou have 5 minutes to answer (case insensitive)"
      }
    }
    fgo_quiz[message.channel.id] = 1;
    message.channel.send("", { embed: result }).then(() => {
      message.channel.awaitMessages(m => body.name.toLowerCase() == m.content.toLowerCase(), {
        max: 1,
        time: 300000, 
        errors: ['time']
      }).then(m => {
        message.channel.send('Congratulation! ' + m.first().author + ' has got the correct answer! The answer is ' + body.name + ' (ID: ' + body.id + ')');
        fgo_quiz[message.channel.id] = 0;
      }).catch(() => {
        message.channel.send('5 minutes has passed, and no one has the answer. The correct answer is ' + body.name + ' (ID: ' + body.id + ')');
        fgo_quiz[message.channel.id] = 0;
      });
    })
  });
}