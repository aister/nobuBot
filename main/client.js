const Discord = require('discord.js');
const Util = require('./util');
const Config = require('./config');
const Database = require('./db');
const Constants = require('./const.js');
const Dashboard = require('../dashboard/server.js');
const http = require('http');
module.exports = class NobuBot {
  constructor(option) {
    this.client = new Discord.Client();
    this.config = new Config(option);
    this.db = new Database(this.config.dbURL);
    this.util = new Util(this);
    this.util.load().then(data => {
      this.commands = data.commands;
      this.events = data.events;
      let loginTime = Date.now();
      this.client.on('ready', () => {
        this.dashboard = new Dashboard(this);
        console.log(`Logged in! Time taken: ${Date.now() - loginTime}ms`);
      });
      this.client.on('disconnect', () => {
        loginTime = Date.now();
      });
      this.client.on('guildCreate', () => {
        if (this.dashboard) this.dashboard.update({ type: "guildChange", data: this.client.guilds.size });
        this.client.channels.get('265147163321958400').send(`${this.client.user.username} has been added to another guild! Total guild count: ${this.client.guilds.size}`);
      });
      this.client.on('guildDelete', () => {
        if (this.dashboard) this.dashboard.update({ type: "guildChange", data: this.client.guilds.size });
        this.client.channels.get('265147163321958400').send(`${this.client.user.username} has been removed from a guild! Total guild count: ${this.client.guilds.size}`);
      });
      this.client.on('guildMemberAdd', m => {
        if (!this.config.selfbot) {
          this.db.get(`config_${m.guild.id}`).then(config => {
            if (config) {
              config = JSON.parse(config).welcome;
              if (config) {
                config = config.replace(/\[member]/g, m).replace(/\[guild]/g, m.guild).split(':');
                member.guild.channels.get(config[0]).send(config.slice(1).join(':'));
              }
            }
          })
        }
      });
      this.client.on('message', message => {
        if (message.author.bot || !message.guild) return;
        if (this.config.selfbot && message.author.id != this.client.user.id && message.author.id != this.config.ownerID) return;
        this.db.get(`config_${message.guild.id}`).then(config => {
          let prefix = this.config.prefix;
          if (config) {
            config = JSON.parse(config);
            if (config.prefix) prefix = config.prefix;
            else if (config.prefix === false) prefix = false;
          }
          let textPrefix = message.guild.me.displayName;
          if (prefix) textPrefix = new RegExp(`^${prefix.replace(/[-[\]{}()*+?.,\\^$|#\s]/gi, '\\$&')}|<@\!?${this.client.user.id}>|@${textPrefix}`);
          else {
            textPrefix = new RegExp(`<@\!?${this.client.user.id}>|@${textPrefix}`);
            prefix = `@${this.client.user.username}`;
          }
          if (!message.content.match(textPrefix)) return;

          let content = message.content.replace(textPrefix, '').trim();
          let cleanContent = message.cleanContent.replace(textPrefix, '').trim();
          let args = content.split(' ');

          let customCommand;
          if (config && config.commands) customCommand = new Map([...Constants.emoji, ...config.commands]);
          else customCommand = Constants.emoji;
          let command = this.commands.get(args[0].toLowerCase());
          if (command) {
            if (command.cleanContent) {
              args = cleanContent;
              if (!command.caseSensitive) args = args.toLowerCase();
              args = args.split(' ');
            } else if (!command.caseSensitive) {
              args = content.toLowerCase().split(' ');
            }
            command.run(message, args.slice(1), prefix);
            command.timeUsed++;
            this.dashboard.update({ type: "commandUsage" })
            console.log(`${command.name} command has been triggered`);

          } else if (customCommand.has(args[0])) message.channel.send(customCommand.get(args[0]));
        });
      });
      this.client.login(this.config.token).catch(console.log);
    }).catch(console.log);
    setInterval(function() {
      http.get("http://nobubot.herokuapp.com");
    }, 300000);    
  }
}