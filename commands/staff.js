const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You dont have permission to do that.");

    var user = message.guild.member(message.mentions.users.first());
    if(!user) return message.reply("No user found.");

    var role = message.guild.roles.cache.find(r => r.name === "Admin");
    if(!role) return message.reply("Role not found.");

    var faultEmbed = new discord.MessageEmbed()
        .setTitle("**You made an oopsie**")
        .setColor("#ff0000")
        .setDescription("This user is already Admin.");

    var embed = new discord.MessageEmbed()
        .setTitle("**Role Change**")
        .setColor("#00ff00")
        .addField("Role change", `${user.user.username} has gotten the ${role} role.`);

    if(user.roles.cache.find(r => r.name === role.name)){
        return message.reply(faultEmbed);
    }

    user.roles.add(role.id) && message.channel.send(embed);
}

module.exports.help = {
    name: "staff",
    description: "Give a person Admin.",
    category: "Moderation",
    aliases: ["admin"]
}