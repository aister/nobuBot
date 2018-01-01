const Redis = require('redis');
module.exports = class Database {
  constructor(dbURL) {
    this.cache = {};
    this.client = Redis.createClient(dbURL);
  }
  get(key) {
    return new Promise((resolve, reject) => {
      if (key in this.cache) {
        resolve(this.cache[key]);
      } else {
        this.client.get(key, (err, result) => {
          this.cache[key] = result;
          resolve(result);
        });
      }
    });
  }
  set(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, () => {
        this.cache[key] = value;
        resolve(value);
      });
    });
  }
}