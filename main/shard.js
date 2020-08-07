const Discord = require('discord.js');
const client = new Discord.Client();
const config = JSON.parse(process.argv[2]);
client.on('ready', () => {
  console.log(`${client.shard.id} logged in`);
}
client.on('guildCreate', () => {
  client.shard.send('guildCreate');
});
client.on('guildDelete', () => {
  client.shard.send('guildDelete');
});
client.on('message', message => {
  if (message.author.bot || !message.guild || !message.content.startsWith(config.prefix)) return;
  if (config.selfbot && message.author.id != client.user.id && message.author.id != m.config.ownerID) return;

  clinet.shard.send(`MESSAGE:${message.channel.id}|${message.id}`);
});
client.login(m.config.token).catch(console.log);
process.on('message', message => {
  if (message.startsWith('SEND:')) {
    message = message.slice(5).split('|');
    client.channels.get(message[0]).send(message.slice(1).join('|'));
  }
})