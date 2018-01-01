const fs = require('fs');
const snek = require('snekfetch');
const Constants = require('./const');
module.exports = class Util {
  constructor(main) {
    this.main = main;
  }
  rand(min, max) {
    max = max || 1;
    min = min || 0;
    if (max < min) return false;
    return Math.round((Math.random() * (max - min)) + min);
  }
  ARand(array) {
    if (array.length == 1) return array[0];
    return array[this.rand(0, array.length - 1)];
  }
  vcProfile(user, data) {
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
  }
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
  }
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
  }
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
  }
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
  }
  load() {
    let commands = new Map();
    let events = new Map();
    let time = Date.now();
    let taken = 0;
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
            command = new (require(command))(this.main);

            //Check for conflicts
            if (commands.has(file.toLowerCase())) console.log(`Command ${command.name} in ${file} is conflicted! Thus it will not be included in the bot.`);
            else commands.set(file.slice(0, -3).toLowerCase(), command);

            //Check for conflicts in command's aliases
            if (command.alias.length) {
              command.alias.forEach(item => {
                if (commands.has(item.toLowerCase())) console.log(`Command alias ${item} (Alias of ${command.name} in ${file}) is conflicted! Thus it will not be included in the bot.`);
                else commands.set(item.toLowerCase(), command);
              });
            }

            taken = Date.now() - time;
            time = taken + time;
            console.log(`Command ${command.name} loaded. Took: ${taken}ms`);
          }
        });
      });
      resolve({commands, events});
    });
  }
}