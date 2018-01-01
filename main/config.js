module.exports = class Config {
  constructor(option) {
    option = option || {};
    this.prefix = option.prefix || "$";
    this.selfbot = option.selfbot || false;
    this.ownerID = option.ownerID || "184369428002111488";
    this.token = option.token || process.env.token;
    this.dbURL = option.dbURL || process.env.dbURL;
  }
}