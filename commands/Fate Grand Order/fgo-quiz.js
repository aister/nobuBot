var request = require('request');
exports.help = "fgo-quiz :: get a quiz of a random Servant in Fate Grand Order";
fgo_quiz = {};
Array.prototype.rand = function() {
  return this[Math.floor(Math.random()*this.length)];
}
exports.exec = (bot, message, msgArray, callback) => {
  request({ 
    url: "https://raw.githubusercontent.com/aister/nobuDB/master/fgo_main.json", 
    json: true
  }, function(err, res, body) {
    let servantList = [];
    for (item in body) {
      servantList.push(body[item]);
    }
    servantList = servantList.rand();
    console.log(servantList);
    message.channel.sendMessage("", {
      embed: {
        title: "Which servant is this?",
        description: "\u200b\n" + servantList.desc + "\n\nYou have 5 minutes to answer (case insensitive)"
      }
    }).then(() => {
      message.channel.awaitMessages(m => servantList.name.toLowerCase() == m.content.toLowerCase(), {
        max: 1,
        time: 300000, 
        errors: ['time']
      }).then(m => {
        message.channel.sendMessage('Congratulation! ' + m.first().author + ' has got the correct answer! The answer is ' + servantList.name + ' (ID: ' + servantList.id + ')');
      }).catch(() => {
        message.channel.sendMessage('5 minutes has passed, and no one has the answer. The correct answer is ' + servantList.name + ' (ID: ' + servantList.id + ')');
      });
    })
  });
}