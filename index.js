var config = require('./config.json');
var emoji = require('./emoji.json');
var client = {
  config,
  emoji
}
require('./src').exec(client);