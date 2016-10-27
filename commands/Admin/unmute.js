exports.help = "unmute <mentions>: Unmute all mentioned people";
exports.exec = (bot, message, msgArray, callback) => {
	if (message.member.highestRole.name.toLowerCase().includes('admin')) {
		message.mentions.users.forEach(user => {
			if (message.guild.members.get(user.id).roles.exists('name', 'Muted')) {
				message.guild.members.get(user.id).removeRole(message.guild.members.get(user.id).roles.find('name', 'Muted')).then(() => {
					message.channel.sendMessage("Unmuted " + user);
				});
			} else message.channel.sendMessage('This person is not muted');
		});
	} else message.reply("only admins can use this command");
}