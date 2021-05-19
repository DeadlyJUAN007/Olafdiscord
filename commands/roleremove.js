const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You dont have permission to do that.");

    var noRoleUser = message.guild.member(message.mentions.users.first());
    if(!noRoleUser) return message.reply("No user found.");

    var role = message.guild.roles.cache.find(r => r.name === "Member");
    if(!role) return message.reply("Role not found.");

    for (let index = 0; index < noRoleUser._roles.length; index++) {
        const role = noRoleUser._roles[index];
        
        noRoleUser.roles.remove(role);
    }

    var embed = new discord.MessageEmbed()
    .setTitle("Roles have been reset to Member.")
    .setColor("#ff0000");

    noRoleUser.roles.add(role);

    return message.channel.send(embed);

}

module.exports.help = {
    name: "rolesremove",
    description: "remove every other role from a person.",
    category: "Moderation",
    aliases: []
}