exports.help = "kick <mentions>: Kick all mentioned people";
exports.exec = (bot, message, msgArray, callback) => {
	if (message.member.highestRole.name.toLowerCase().includes('admin')) {
		message.mentions.users.forEach(user => {
			if (message.guild.members.get(user.id).kickable) {
				message.guild.members.get(user.id).kick().then(() => {
					if (message.guild.channels.exists("name", "mod-log")) { 
						message.guild.channels.find("name", "mod-log").sendMessage(message.author + " has kicked " + user);
					} else {
						message.guild.createChannel("mod-log", "text").then(channel => { channel.sendMessage(message.author + " has kicked " + user); });
					}
				});
			}
		});
	} else message.reply("only admins can use this command");
}