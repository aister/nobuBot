exports.help = "" +
  "story <story name> :: Start a story game\n\n" + 
  "Omit <story name> to list all the stories in the database";
var story = require('../../story.json');
exports.exec = (client, message, msgArray, callback) => {
  if (msgArray[1] && story[msgArray.slice(1).join(' ')]) {
    (function sendStory(userStory, stage) {
      if (stage == "start") {
        data = "Welcome to " + userStory.name + "\n\n" +
          "During the game, you will be given options that might or might not change the course of the story. The options will be provided in these [boxes]\n\n" + 
          "When you've decided which option you want to take. Please enter `" + client.prefix + " + the number of the choice` to select. Good luck!\n\n" + 
          "[1. Continue]";
        destination = ["default"];
        display = ["1"];
      } else {
        data = userStory.story[stage];
        destination = [];
        display = [];
        data = data.replace(/<([^>]+)>([^\]]+)\]/g, function(a, dest, text) {
          destination.push(dest);
          display.push(destination.length + "");
          return '[' + destination.length + '. ' + text + ']';
        });
      }
      if (display.length > 0) {
        text = new RegExp('^' + client.prefix + '(' + display.join('|') + ')$', "i");
        message.channel.sendMessage(data).then(() => {
          message.channel.awaitMessages(m => m.author.id == message.author.id && (m.content.match(text) || m.content == client.prefix + 'stop'), {max: 1}).then(msg => {
            if (msg.first().content == client.prefix + 'stop') message.channel.sendMessage("the game has been stopped");
            else sendStory(userStory, destination[display.indexOf(msg.first().content.slice(client.prefix.length))]);
          });
        });
      } else {
        message.channel.sendMessage(data + '\n\nThis is the end of the game, thank you for playing');
      }
    })(story[msgArray.slice(1).join(' ')], "start");
  } else {
    data = [];
    for (var storyName in story) {
      data.push("- " + storyName);
    }
    message.channel.sendMessage("Current stories that are in the database:\n\n" + data.join('\n'));
  }
}