const Discord = require('discord.js');
const Util = require('./util');
const Config = require('./config');
const Database = require('./db');
const Constants = require('./const.js');
const Dashboard = require('../dashboard/server.js');
const http = require('http');

const ShardingManager = Discord.ShardingManager;
module.exports = class NobuBot {
  constructor(option) { 
    this.client = new Discord.Client();
    this.config = new Config(option);
    this.db = new Database(this.config.dbURL);
    this.util = new Util(this);
    this.util.load().then(data => {
      this.commands = data.commands;
      this.events = data.events;
      const manager = new ShardingManager('./main/shard.js', { token: this.config.token, shardArgs: [ this.config.token ] });
      manager.spawn();
      manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));
      manager.on('message', message => {
        if (message.startsWith('MESSAGE:')) {
          message = message.slice(8).split('|');
          message = this.client.channels.get(message[0]).messages.get(message[1]);
          let args = message.content.split(' ');

          let command = this.commands.get(args[0].toLowerCase());
          if (!command.caseSensitive) {
            args = message.content.toLowerCase().split(' ');
          }
          command.run(message, args.slice(1), this.config.prefix);
          command.timeUsed++;
          this.dashboard.update({ type: "commandUsage" })

          } else if (Constants.emoji.has(args[0])) message.channel.send(Constants.emoji.get(args[0]));
        }
      })
    });
  }
}