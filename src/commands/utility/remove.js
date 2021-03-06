const { Command } = require(`discord-akairo`);
const { MessageEmbed } = require(`discord.js`);
const { basename } = require(`path`);

class This extends Command {
	constructor() {
		super(basename(__filename).split(`.`)[0], {
			aliases: [basename(__filename).split(`.`)[0], `undo`],
			channel: `guild`,
			clientPermissions: [`MANAGE_ROLES`]
		});
	}

	async exec(message) {
		const role = message.member.roles.find(`name`, `USER-${message.member.id}`);

		if (!role) {
			message.channel.send(new MessageEmbed()
				.setTitle(`❌ **ERROR**`)
				.setDescription(`You dont have one!`)
				.setColor(0xFF0000)
				.setTimestamp()
			);
		}
		if (role.position > message.guild.me.highestRole.position) {
			message.channel.send(new MessageEmbed()
				.setTitle(`❌ **ERROR**`)
				.setDescription(
					`Invalid permissions\n` +
					`Cannot delete role \`\`\`\n${role.name}\n\`\`\``
				)
				.setColor(0xFF0000)
				.setTimestamp()
			);
			return;
		}

		role.delete().then(role => {
			message.channel.send(new MessageEmbed()
				.setTitle(`✅ **Removed ${role.hexColor.toUpperCase().replace(`#`, ``)}**`)
				.setColor(role.color)
				.setTimestamp()
			);
		}).catch(error => {
			message.channel.send(new MessageEmbed()
				.setTitle(`❌ **ERROR**`)
				.setDescription(`\`\`\`\n${error}\n\`\`\``)
				.setColor(0xFF0000)
				.setTimestamp()
			);
		});
	}
}

module.exports = This;
