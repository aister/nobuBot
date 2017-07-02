exports.help = "emoji <emoji name> :: print out the emoji. Omit <emoji name> to show the list of all emoji";
var emojis = {
  "lol": "http://i.imgur.com/NnuU2km.gif",
  "huhu": "http://i.imgur.com/Vpsng9m.png",
  "rip": "http://i.imgur.com/CXFDRZg.png",
  "noob": "http://i.imgur.com/v7r7fwG.gif",
  "jam": "http://i.imgur.com/ZXlW6fi.png",
  "yorokobe": "http://i.imgur.com/CGj0vTt.png",
  "lewd": "http://i.imgur.com/XH34as1.jpg",
  "lenny": "( ͡° ͜ʖ ͡°)",
  "tableflip": "(╯°□°）╯︵ ┻━┻",
  "unflip": "┬─┬﻿ ノ( ゜-゜ノ)",
  "shrug": "¯\\_(ツ)_/¯",
  "police": "http://i.imgur.com/W6MRLUR.gif"
}
emojiList = [];
for (item in emojis) { emojiList.push(item); }
exports.exec = (client, message, msgArray, callback) => {
  msgArray = msgArray.slice(1).join(' ');
  if (msgArray.length && (msgArray in emojis)) {
    if (emojis[msgArray].startsWith('http')) message.channel.send("", {file: {attachment: emojis[msgArray]}});
    else message.channel.send(emojis[msgArray]);
  } else {
    message.channel.send('', {embed: {
      title: "List of all emojis",
      description: "\u200b\n" + emojiList.join(' | ')
    }});
  }
}
