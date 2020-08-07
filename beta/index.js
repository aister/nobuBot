const { ShardingManager } = require('discord.js');
const token = require('./config.json').token || process.env.token;

const manager = new ShardingManager('./main/client.js', { token });
manager.spawn().catch(console.log);
manager.on('launch', shard => console.log('\x1b[36m%s\x1b[0m', `Launched shard ${shard.id}`));