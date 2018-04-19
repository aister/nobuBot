module.exports = class Config {
  constructor(option) {
    option = option || {};
    this.prefix = option.prefix || "g.";
    this.selfbot = option.selfbot || false;
    this.ownerID = option.ownerID || "156166803683409920";
    this.token = option.token || process.env.token;
    this.dbURL = option.dbURL || process.env.REDIS_URL;
  }
}