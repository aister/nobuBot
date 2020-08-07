const fs = require('fs');
const Constants = require('./const');
const Canvas = require('canvas');
const snek = require('snekfetch');

module.exports = {
  rand(min, max) {
    max = max || 1;
    min = min || 0;
    if (max < min) return false;
    return Math.round((Math.random() * (max - min)) + min);
  },
  ARand(array) {
    if (array.length == 1) return array[0];
    return array[this.rand(0, array.length - 1)];
  },
  /*vcProfile(user, data) {
    let embed = this.fgoProfile(user, data);
    embed.title = `VC Profile for ${user.username}`;
    embed.fields.push({
      name: "Alliance",
      value: data.alliance || "Not Provided"
    },
    {
      name: "Role",
      value: data.role || "Not Provided"
    });
    return embed;
  },
  vcGacha() {
    return new Promise((resolve, reject) => { 
      let chance = Math.random() * 1000;
      let rate = Constants.rate.vc;
      if (chance <= rate[0]) chance = "LR";
      else if (chance <= rate[1]) chance = "UR";
      else if (chance <= rate[2]) chance = "SR";
      else if (chance <= rate[3]) chance = "R";
      else chance = "N";
      snek.get(`${Constants.db}vc.json`).then(r => {
        r = JSON.parse(r.text);
        let result = [];
        for (let id in r) {
          if (r[id].rarity == chance) result.push(r[id]);
        }
        resolve(this.ARand(result));
      });
    });
  },
  fgoProfile(user, data) {
    let embed = {
      title: "FGO Profile for " + user.username,
      fields: [
        {
          name: "IGN",
          value: data.name || "Not Provided"
        },
        {
          name: "Friend ID",
          value: data.id || "Not Provided"
        }
      ],
      description: "\u200b",
      thumbnail: { url: user.displayAvatarURL }
    }
    if (data.support) embed.image = { url: data.support }
    return embed;
  },
  fgoItem(args) {
    return new Promise((resolve, reject) => {
      let item = false;
      snek.get(`${Constants.db}item.json`).then(r => {
        r = JSON.parse(r.text);
        if (!(item = r[args.toUpperCase()])) {
          for (let index in r) {
            let i = r[index];
            if (!item && i.name.toLowerCase().includes(args)) {
              item = i;
              item.id = index;
            }
          }
        } else {
          item.id = args.toUpperCase();
        }
        resolve(item);
      });
    });
  },
  fgoGacha() {
    return new Promise((resolve, reject) => { 
      let chance = Math.random() * 100;
      let rate = Constants.rate.fgo;
      if (chance <= rate[0]) chance = "5";
      else if (chance <= rate[1]) chance = "4";
      else if (chance <= rate[2]) chance = "3";
      else if (chance <= rate[3]) chance = "2";
      else chance = "1";
      snek.get(`${Constants.db}fgo_main.json`).then(r => {
        r = JSON.parse(r.text);
        let result = [];
        for (let id in r) {
          if (r[id].rarity == chance) result.push(r[id]);
        }
        resolve(this.ARand(result));
      });
    });
  },
  dust(avatar) {
    return new Promise((resolve, reject) => {
      snek.get(avatar).then(r => {
        const canvas = new Canvas(150, 150);
        const ctx = canvas.getContext('2d');
        const img_bg = new Canvas.Image();
        img_bg.onload = function () {
          ctx.drawImage(img_bg, 0, 0, 150, 150);
          let imgData = ctx.getImageData(30, 0, 120, 150);
          let data = imgData.data;
          for (let i = 0; i < data.length; i += 4) {
            let rnd = (120 - Math.floor(i / 4) % 120) / 120;
            if (Math.random() > rnd) data[i + 3] = 0;
          }
          ctx.putImageData(imgData, 30, 0);
          resolve(canvas.toBuffer());
        }
        img_bg.src = r.body;
      });
    });
  },*/
  load() {
    let commands = new Map();
    const commandDir = `./commands/`;
    return new Promise((resolve, reject) => {
      //Iterate Command Directories and Files
      fs.readdirSync(commandDir).forEach(folder => {
        let command = false;
        fs.readdirSync(`${commandDir}${folder}/`).forEach(file => {
          let help = [];
          if (file.match(/\.js$/) !== null && file !== 'index.js') {

            //Require commands
            command = `.${commandDir}${folder}/${file}`;
            delete require.cache[require.resolve(command)];
            command = require(command);

            //Check for conflicts
            if (commands.has(file.toLowerCase())) console.log(`Command ${command.info.name} in ${file} is conflicted! Thus it will not be included in the bot.`);
            else commands.set(file.slice(0, -3).toLowerCase(), command);
          }
        });
      });

      Promise.all([
        snek.get('https://fate-go.cirnopedia.org/servant_all.php'),
        snek.get('https://fate-go.cirnopedia.org/craft_essence.php')
      ]).then(r => {
        const servant = r[0].body.slice(r[0].body.indexOf('<table'), r[0].body.indexOf('</table>')).split('<tr>').slice(3).map(item => {
          if (item.indexOf('Event') == -1 && item.indexOf('Enemy Servant') == -1) return {
            rarity: item.slice(item.indexOf('rare') + 4, item.indexOf('rare') + 5),
            id: item.slice(5, item.indexOf('class') - 2),
            classIcon: item.slice(item.indexOf("('") + 2, item.indexOf("')")),
            // exclude if Servant is Event freebie or Enemy servant
            excluded: item.indexOf('Event') >= 0 ? "event" : item.indexOf('Enemy Servant') ? "enemy" : false
          }
        }).filter(i => i);

        const ce = r[1].body.slice(r[1].body.indexOf('<h2>Craft Essences'), r[1].body.indexOf('class="footerwrap')).split('<tr>').slice(3).map(item => {
          if (item.slice(8, 11) == "reg" && item.indexOf('<event') == -1) return {
            rarity: item.slice(item.indexOf('rare') + 4, item.indexOf('rare') + 5),
            id: item.slice(5, item.indexOf('class') - 2),
            classIcon: item.slice(item.indexOf("('") + 2, item.indexOf("')"))
          }
        }).filter(i => i);
      
        resolve({ commands, servant, ce });
      });

    });
  }
}