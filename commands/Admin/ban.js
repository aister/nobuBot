exports.help = "kick <mentions>: Kick all mentioned people";
exports.exec = (bot, message, msgArray, callback) => {
	if (message.member.highestRole.name.toLowerCase().includes('admin')) {
		message.mentions.users.forEach(user => {
			if (message.guild.members.get(user.id).bannable) {
				message.guild.members.get(user.id).ban();
			}
		});
	} else message.reply("only admins can use this command");
}