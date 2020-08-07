const Command = require('../../main/command');
const snek = require('snekfetch');
const Canvas = require('canvas');
const Constants = require('../../main/const');

module.exports = new Command({
  info: {
    name: "gacha",
    category: "Fate Grand Order",
    help: "Do a simulated FGO Gacha",
    args: [
      {
        name: "yolo",
        desc: "Optional. Include this for a solo roll. If not included, a 10-roll with a 15-minute cooldown will be carried out"
      }
    ]
  },
  cooldown: {},
  resetCooldown(id) {
    this.cooldown[id] = 0;
  },
  getCard(data, rate) {
    let dice = Math.random() * 100;
    let item = "";
    if (dice <= rate["s5"])      item = 'S/'  + this.main.util.ARand(data.servants["5"]); 
    else if (dice <= rate["s4"]) item = 'S/'  + this.main.util.ARand(data.servants["4"]);
    else if (dice <= rate["s3"]) item = 'S/'  + this.main.util.ARand(data.servants["3"]);
    else if (dice <= rate["c5"]) item = 'CE/' + this.main.util.ARand(data.ce["5"]);
    else if (dice <= rate["c4"]) item = 'CE/' + this.main.util.ARand(data.ce["4"]);
    else if (dice <= rate["c3"]) item = 'CE/' + this.main.util.ARand(data.ce["3"]);
    return item;
  } 
  roll1 (ctx, data, pos, rate) {
    return new Promise((resolve, reject) => {
      rate = rate || Constants.rate.gacha.Rest;
      let card = new Canvas.Image();
      let item = this.getCard(data, rate);
      snek.get(`${Constants.db}images/${item}.png`).then(r => {
        card.onerror = reject;
        card.onload = () => {
          ctx.drawImage(card, ...pos);
          if (item.length == 5) item += " ";
          resolve(item);
        }
        card.src = r.body;
      });
    });
  }
  roll10 (ctx, data) {
    let results = Array(10).fill('');
    results = results.map((item, index) => {
      if (index < 5) index = [index * 129, 0];
      else index = [(index - 5) * 129, 222];
      if (index == 0) return this.roll1(ctx, data, index, Constants.rate.gacha.GSR);
      if (index == 1) return this.roll1(ctx, data, index, Constants.rate.gacha.GS);
      return this.roll1(ctx, data, index);
    });
    return Promise.all(results);
  }
  run(message, args, prefix) {

    let canvas = "";
    let ctx = "";
    snek.get(`${Constants.db}gatcha.json`).then(r => {
      r = JSON.parse(r.text);
      if (args[0] == "yolo") {
        const canvas = new Canvas(129, 222);
        const ctx = canvas.getContext('2d');
        this.roll1(ctx, r, [0, 0]).then((result) => {
          message.channel.send(`The results are in, you get (in card ID):\`\`\`\n${result}\`\`\``, {file: {attachment: canvas.toBuffer(), name: "result.png"}});
        });
      } else {
        let time = this.cooldown[message.author.id] - message.createdTimestamp + 900000;
        if (time > 0 && message.author.id != this.main.config.ownerID) {
          message.channel.send(`You can only use this command once every 15 minutes. You can use it again in ${Math.floor(time / 60000)} minutes ${Math.ceil(time / 1000) % 60} seconds`);
        } else {
          this.cooldown[message.author.id] = message.createdTimestamp;
          const canvas = new Canvas(645, 444);
          const ctx = canvas.getContext('2d');
          this.roll10(ctx, r).then((results) => {
            results = results.slice(0, 5).join(' | ') + "\n" + results.slice(5).join(' | ');
            message.channel.send(`The results are in, here are the cards you get (in card ID):\`\`\`\n${results}\`\`\``, {file: {attachment: canvas.toBuffer(), name: "result.png"}});
          });
        }
      }
    });
  }
}