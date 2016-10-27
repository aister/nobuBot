node-modules are not included.

to install, clone the repo and run `npm install`. Then create the config.json with following keys:

ownerID (required): the ID of the bot owner, bot owner will be able to run commands in /commands/Admin
prefix (required): the prefix of the bot
botToken: the token of your bot, if unprovided, it will retrieve from environment variable TOKEN2
ytToken: the token for youtube API, if unprovided, it will retrieve from environment variable YTTOKEN2
naniID: the ID of anilist client, if unprovided, it will retrieve from environment variable NANIID
naniSECRET: the secret of anilist client, if unprovided, it will retrieve from environment variable NANISECRET

if you don't like or want to disable a certain features, just delete the feature's js file out from commands folder