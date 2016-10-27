exports.help = "mute <mentions>: Mute all mentioned people";
exports.exec = (bot, message, msgArray, callback) => {
	if (message.member.highestRole.name.toLowerCase().includes('admin')) {
		if (!message.guild.roles.exists('name', 'Muted')) {
			message.guild.createRole( { name: "Muted", color: "#000001", hoist: true }).then(role => { 
				role.setPosition(message.guild.roles.size); 
				message.guild.channels.forEach(channel => {
					channel.overwritePermissions(role, { "SEND_MESSAGES": false }).catch(console.log);
				});
				message.mentions.users.forEach(user => {
					member = message.guild.members.get(user.id);
					if (!member.highestRole.name.toLowerCase().includes('admin')) {
						if (!member.hasRole(role)) {
							member.addRole(role).then(() => {
								message.channel.sendMessage("Muted " + user);
							});
						} else message.channel.sendMessage("This person has been muted");
					}
				});
			});
		} else {
			role = message.guild.roles.find('name', 'Muted');
			message.mentions.users.forEach(user => {
				member = message.guild.members.get(user.id);
				if (!member.highestRole.name.toLowerCase().includes('admin')) {
					if (!member.hasRole(role)) {
						member.addRole(role).then(() => {
							message.channel.sendMessage("Muted " + user);
						});
					} else message.channel.sendMessage("This person has been muted");
				}
			});
		}
	} else message.reply("only admins can use this command");
}