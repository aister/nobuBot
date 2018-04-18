const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const snek = require('snekfetch');

module.exports = class Dashboard {
  constructor(main) {
    const PORT = process.env.PORT || 3000;

    const app = express();
    const server = app.use(express.static(path.join(__dirname, 'html')) )
      .listen(PORT, () => console.log(`Listening on ${ PORT }`));

    app.set('views', path.join(__dirname, 'html'));
    app.set('view engine', 'ejs');
    let commandUsage = 0;
    let command = {};
    let categories = [];
    let cat = {};
    for (command of main.commands) {
      if (command[1].timeUsed) {
        commandUsage += command[1].timeUsed;
      }
      if (!command[1].devOnly) {

        if (categories.length == 0 || command[1].category != categories[categories.length - 1][0]) {
          categories.push([ command[1].category, [] ]);
        }
        categories[categories.length - 1][1].push({
          name: command[0],
          desc: command[1].desc.replace(/\n/g, '<br>')
        });

        if (!cat[command[1].category]) cat[command[1].category] = [];
        cat[command[1].category].push({
          name: command[0],
          desc: command[1].desc.replace(/\n/g, '<br>')
        });
      }
    }

    let data = {
      guild: main.client.guilds.size,
      command: commandUsage,
    }

    app.get('/', (req, res) => {

      data.djs = require('discord.js').version;
      res.render('index', data);

    });

    app.get('/command', (req, res) => {

      data.categories = categories;
      res.render('category', data);

    })

    app.get('/command/:command', (req, res) => {
      if ((command = main.commands.get(req.params.command)) && !command.devOnly) {
        data.prefix = main.config.prefix;
        data.categories = cat[command.category];
        data.help = JSON.parse(JSON.stringify(command.help)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\\n/g, '<br>')
          .replace(/\*\*__([^\*]+)__\*\*/g, (match, text) => { return `<span class='args'>${text}</span>`; })
        );
      } else data.help = false;
      res.render('command', data);

    });

    app.get('/cfyc', (req, res) => {
      res.render('cfyc', data);
    });
    
    this.wss = new SocketServer({ server });
    this.wss.on('connection', (ws, req) => {
      ws.on('error', () => {});
      ws.on('message', data => {
        data = JSON.parse(data);
        if (data.type == "cfyc") {
          snek.get('http://www.cfyc.com.vn/en/schedule').then(body => {
            body = body.text.match(/https%3A%2F%2Fimages.cfyc.com.vn%2Fphn_image%2Fschedule%2F(Phu-Nhuan|Quan-3)-\d+\.jpg/g).map(i => {
              return `<img src="${decodeURIComponent(i)}">`;
            }).join("<br>");
            ws.send(JSON.stringify({type: "cfyc", img: body}));
          });
        }
      });
    });
  }
  update(data) {
    this.wss.clients.forEach(client => {
      client.send(JSON.stringify(data))
    })
  }
}
