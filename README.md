A Discord Bot Framework based on discord.js

Node-modules are not included.

To install, clone the repo or download and run `npm install`. Then create / edit the config.json with following keys:

```
ownerID: the ID of the bot owner, bot owner will be able to run commands in /commands/!Admin
prefix: the prefix of the bot
ytToken: the token for youtube API
selfbot: [true / false] Is your bot a selfbot?
botToken: login token
```

If you are running on selfbot, do these steps to get the login token
* Step 1: Login your discord in any modern browser
* Step 2: Open browser console (F12 on Window)
* Step 3: type in localStorage.token, hit enter (note: case-sensitive)
* Step 4: copy the whole bunch to the botToken value

Please keep your login tokens absolute secret