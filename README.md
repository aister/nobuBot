Node-modules are not included.

To install, clone the repo and run `npm install`. Then create the config.json with following keys:

```
ownerID: the ID of the bot owner, bot owner will be able to run commands in /commands/!Admin
prefix: the prefix of the bot
ytToken: the token for youtube API
naniID: the ID of anilist client
naniSECRET: the secret of anilist client
selfbot: [true / false] Is your bot a selfbot?
username: your account username (required if selfbot = true)
password: your account password (required if selfbot = true)
botToken: the token of your bot (required if selfbot = false)
```

if you don't like or want to disable a certain features, include an array of the features you want to block, like this:

```js
var config = require('./config.json');
var emoji = require('./emoji.json');
require('./src')(config, emoji, ['!DevOnly', 'Search/image']);
```

This would disable all the commands in `!DevOnly` folders, as well as `image` commands in `Search` folder

The help command is automatically generated using the command's exports.help. However, commands in folders that start with ! will be ignored.

If you need to run several bots, just point the config.json and emoji.json to the right file.