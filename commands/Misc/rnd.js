exports.help = "roll <min> <max> :: Get a random number within <min> and <max>";
exports.func = (max, min) => {
  if (!max) max = 1;
  if (!min) min = 0;
  if (max > min) return Math.round((Math.random() * (max - min)) + min);
  else return false;
}
exports.exec = (bot, message, msgArray, callback) => {
  message.channel.send(this.func(msgArray[2], msgArray[1])).then(callback);
}