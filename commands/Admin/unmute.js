exports.help = "unmute <mentions>: Unmute all mentioned people";
exports.exec = (bot, message, msgArray, callback) => {
	if (message.member.highestRole.name.toLowerCase().includes('admin')) {
		message.mentions.users.forEach(user => {
			if (message.guild.members.get(user.id).roles.exists('name', 'Muted')) {
				message.guild.members.get(user.id).removeRole(message.guild.members.get(user.id).roles.find('name', 'Muted')).then(() => {
					message.channel.sendMessage("Unmuted " + user);
					if (message.guild.channels.exists("name", "mod-log")) { 
						message.guild.channels.find("name", "mod-log").sendMessage(message.author + " has unmuted " + user);
					} else {
						message.guild.createChannel("mod-log", "text").then(channel => { channel.sendMessage(message.author + " has unmuted " + user); });
					}
				});
			} else message.channel.sendMessage('This person is not muted');
		});
	} else message.reply("only admins can use this command");
}