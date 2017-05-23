var Canvas = require('canvas');
var request = require('request');
exports.help = "gacha <optional arguments> :: Do a simulated FGO Gacha\n\n" + 
  "== Arguments\n" +
  "yolo :: include this for solo roll. If not included, a 10-roll will be carried out\n" +
  "event + event ID :: event exclusive roll. If not included, the default story pool will be drawed. Example: event1\n" +
  "eventList :: see the list of events. Will not roll.\n\n" + 
  "== Roll rate\nServant :: 1% SSR | 3% SR | 40% R\nCE      :: 4% SSR | 12% SR | 40% R\n\n" + 
  "Note: Pick up rate and guaranteed cards are not considered";
fgo_cooldown = {};
function func (data) {
  let dice = Math.random();
  let item = "";
  if (dice <= 0.01)      item = 'S/'  + arrayRand(data.servants["5"]); 
  else if (dice <= 0.04) item = 'S/'  + arrayRand(data.servants["4"]);
  else if (dice <= 0.44) item = 'S/'  + arrayRand(data.servants["3"]);
  else if (dice <= 0.48) item = 'CE/' + arrayRand(data.ce["5"]);
  else if (dice <= 0.6)  item = 'CE/' + arrayRand(data.ce["4"]);
  else                   item = 'CE/' + arrayRand(data.ce["3"]);
  return item;
} 
exports.func = func;
function roll1 (ctx, data, pos) {
  return new Promise((resolve, reject) => {
    let card = new Canvas.Image();
    let item = func(data);
    request({
      url: db_path + 'images/' + item + '.png',
      encoding: null
    }, function (err, res, body) {
      card.onerror = reject;
      card.onload = () => {
        ctx.drawImage(card, ...pos);
        if (item.length == 5) item += " ";
        resolve(item);
      }
      card.src = body;
    });
  });
}
function roll10 (ctx, data) {
  results = Array(10).fill('');
  results = results.map((item, index) => {
    if (index < 5) index = [index * 129, 0];
    else index = [(index - 5) * 129, 222];
    return roll1(ctx, data, index);
  });
  return Promise.all(results);
}
let db_path = 'https://raw.githubusercontent.com/aister/nobuDB/master/';
function replyResult (text, prefix) {
  return "The results are in, here are the cards you get (in card ID):```\n" + 
  text + "```\nIf you see a card that are out of place, please report it to Aister via `" + 
  prefix + "feedback` command\n\nPlease note that guaranteed 4\* as well as guaranteed at least 3\* servant for 10-roll isn't included in this gacha simulator"
};
exports.exec = (bot, message, msgArray, callback) => {
  let canvas = "";
  let ctx = "";
  if (message.content.toLowerCase().includes("eventlist")) {
    request({
      url: db_path + "gacha_event.json",
      json: true
    }, function (err, res, gEvent) {
      gEvent = gEvent.map((event, i) => {
        return "**__" + event.name + " (ID: " + (i + 1) + ")__**\n" + event.desc;
      });
      message.channel.send(gEvent.join('\n\n')).catch(() => {});
    });
  } else {
    request({
      url: db_path + "gatcha.json",
      json: true
    }, function (err, res, body) {
      if (msgArray.includes("yolo")) {
        canvas = new Canvas(129, 222);
        ctx = canvas.getContext('2d');
        if (event = message.content.match(/event\d+/g)) {
          request({
            url: db_path + "gacha_event.json",
            json: true
          }, function (err, res, gEvent) {
            event = event[0].slice(5);
            if (gEvent[event]) {
              for (i = 0; i <= 5; i++) {
                if (gEvent[event].servants && gEvent[event].servants[i]) body.servants[i] = body.servants[i].concat(gEvent[event].servants[i]);
                if (gEvent[event].ce && gEvent[event].ce[i]) body.ce[i] = body.ce[i].concat(gEvent[event].ce[i]);
              }
            }
            roll1(ctx, body, [0, 0]).then((result) => {
              message.channel.send(replyResult(results, bot.prefix), {file: {attachment: canvas.toBuffer(), name: "result.png"}});
            });
          })
        } else {
          roll1(ctx, body, [0, 0]).then((result) => {
            message.channel.send(replyResult(results, bot.prefix), {file: {attachment: canvas.toBuffer(), name: "result.png"}});
          });
        }
      } else {
        let time = 0;
        if (!fgo_cooldown[message.author.id]) fgo_cooldown[message.author.id] = message.createdTimestamp;
        else time = message.createdTimestamp - fgo_cooldown[message.author.id] - 900000;
        if (time < 0 && message.author.id != bot.config.ownerID) {
          message.channel.send("You can only use this command once every 15 minutes. You can use it again in " + Math.floor( - time / 60000) + " minutes " + (Math.ceil( - time / 1000) % 60) + " seconds");
        } else {
          fgo_cooldown[message.author.id] = message.createdTimestamp;
          canvas = new Canvas(645, 444);
          ctx = canvas.getContext('2d');
          if (event = message.content.match(/event\d+/g)) {
            request({
              url: db_path + "gacha_event.json",
              json: true
            }, function (err, res, gEvent) {
              event = parseInt(event[0].slice(5)) - 1;
              if (gEvent[event]) {
                for (i = 0; i <= 5; i++) {
                  if (gEvent[event].servants && gEvent[event].servants[i]) body.servants[i] = body.servants[i].concat(gEvent[event].servants[i]);
                  if (gEvent[event].ce && gEvent[event].ce[i]) body.ce[i] = body.ce[i].concat(gEvent[event].ce[i]);
                }
              }
              roll10(ctx, body).then((results) => {
                results = results.slice(0, 5).join(' | ') + "\n" + results.slice(5).join(' | ');
                message.channel.send(replyResult(results, bot.prefix), {file: {attachment: canvas.toBuffer(), name: "result.png"}});
              });
            });
          } else {
            roll10(ctx, body).then((results) => {
              results = results.slice(0, 5).join(' | ') + "\n" + results.slice(5).join(' | ');
              message.channel.send(replyResult(results, bot.prefix), {file: {attachment: canvas.toBuffer(), name: "result.png"}});
            });
          }
        }
      }
    });
  }
}