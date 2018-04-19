# Gorgon Bot

A FGO heavily themed Discord Bot Framework based on [discord.js](https://github.com/discordjs/discord.js) and [aister's nobuBot](https://github.com/aister/nobuBot)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [GTK+](http://www.npackd.org/p/org.gtk.GTKPlusBundle64/2.22.1) - Extract at C:\GTK

* [Python 2.7.14](https://www.python.org/downloads/) or [windows-build-tools](https://www.npmjs.com/package/windows-build-tools)

### Installing

Package install

```
npm install
```

This bot uses a [Redis](https://redis.io/) db so either you set up one locally or online and then reference it on `config.js`

``` js
module.exports = class Config {
  constructor(option) {
    option = option || {};
    this.prefix = option.prefix || "g.";
    this.selfbot = option.selfbot || false;
    this.ownerID = option.ownerID || "yourDiscordUserIdNumber";
    this.token = option.token || process.env.token;
    this.dbURL = option.dbURL || process.env.REDIS_URL;
  }
};
```

## Deployment

I use [Heroku](https://www.heroku.com/) since it's cheap and works fine with any repo provider. Heroku also provisions the Redis DB.

## Built With

* [Discord.JS](https://github.com/discordjs/discord.js) - The framework used
* [NobuBot](https://github.com/aister/nobuBot) - Starting point 
* [Heroku](https://www.heroku.com/home) - Hosting and Provisioning

## Authors

* **Aister** - *Forked from* - [aister](https://github.com/aister)
* **Diego** - *Adding functionality* - [Jubokko](https://github.com/Jubokko)

## Contributors

* **Joel** - *Initial Support* - [joelmut](https://github.com/joelmut)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to the guys of discord.js and aister for such amazing framework
