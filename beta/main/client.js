const Discord = require('discord.js');
const Database = require('./db');
const Constants = require('./const.js');
let config = require('../config.json');


config = { 
  prefix: config.prefix || "$",
  selfbot: config.selfbot || false,
  ownerID: config.ownerID || "184369428002111488",
  token: config.token || process.env.token,
  dbURL: config.dbURL || process.env.dbURL,
  ownerName: config.ownerName || "Aister"
}

const main = {
  client: new Discord.Client(),
  config,
  db: new Database(config.dbURL),
  util: require('./util')
}

main.util.load().then(data => {
  console.log('\x1b[33m%s\x1b[0m', `Shard ${main.client.shard.id} is logging in.`);
  main.commands = data.commands;
  main.cache = {
    servant: data.servant,
    ce: data.ce
  }
  
  main.client.on('ready', () => {
    console.log('\x1b[32m%s\x1b[0m', `Shard ${main.client.shard.id} logged in successfully. Holding ${main.client.guilds.size} guilds`);
  });

  main.client.on('message', message => {
    if (message.author.bot || !message.guild) return;
    if (main.config.selfbot && message.author.id != main.client.user.id && message.author.id != main.config.ownerID) return;
    main.db.get(`config_${message.guild.id}`).then(dbConfig => {
      let prefix = main.config.prefix;
      if (dbConfig) {
        dbConfig = JSON.parse(dbConfig);
        if (dbConfig.prefix) prefix = dbConfig.prefix;
        else if (dbConfig.prefix === false) prefix = false;
      }
      let textPrefix = message.guild.me.displayName;
      if (prefix) textPrefix = new RegExp(`^${prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/gi, '\\$&')}|<@\!?${main.client.user.id}>|@${textPrefix}`);
      else {
        textPrefix = new RegExp(`<@\!?${main.client.user.id}>|@${textPrefix}`);
        prefix = `@${main.client.user.username}`;
      }
      if (!message.content.match(textPrefix)) return;

      let args = message.content.replace(textPrefix, '').trim().split(' ');

      let customCommand;
      if (dbConfig && dbConfig.commands) customCommand = new Map([...Constants.emoji, ...dbConfig.commands]);
      else customCommand = Constants.emoji;
      let command = main.commands.get(args[0].toLowerCase());
      if (command) command.run(message, main, args.slice(1), prefix);
      else if (customCommand.has(args[0])) message.channel.send(customCommand.get(args[0]));
    });
  });
  main.client.login(main.config.token).catch(console.log);
})